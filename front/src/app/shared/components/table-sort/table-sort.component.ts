import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { ELocalNames, StaticDirectory, TableContent, TableData, TableDataHeader, TableHeader } from '@app/_models';
import { MatSort, Sort } from '@angular/material/sort';
import { Observable, Subject } from 'rxjs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import { untilDestroyed } from '@app/core';
import { ELanguage } from '@app/constants/language';
import * as _ from 'lodash';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { InfinityScrollTableService } from '@app/shared/components/table/infinity-scroll-table.service';

enum HeaderClass {
  'status' = 'header-title-center',
  'deactivation' = 'header-title-center',
  'active' = 'header-title-center',
  'iconButton' = 'header-title-center',
  'deleted' = 'header-title-center',
  'staticIconButton' = 'header-title-center'
}

export enum BooleanFilterType {
  YES = 'Buttons.Yes',
  NO = 'Buttons.No'
}

@Component({
  selector: 'mat-app-table-sort',
  templateUrl: './table-sort.component.html',
  styleUrls: ['./table-sort.component.scss'],
  providers: [InfinityScrollTableService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableSortComponent<T> implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  creditType = {
    '001': 'Долг',
    '002': 'Кредитная линия',
    '003': 'Кредитная карта',
    '004': 'Гарантии и поручительства',
    '005': 'Овердрафт',
    '006': 'Кредиты списанные на внебаланс',
    '007': 'Лизинг',
    '008': 'Факторинг'
  };

  // количество записей на странице
  @Input() itemLimit: number = 20;
  // всего записей
  @Input() totalCount: number = 0;

  // show pagination
  @Input() showPagination: boolean = true;
  // массив записей
  @Input() dataSource: T[] = [];

  @Input() tableData: TableData<T>;

  // начилие сортировки
  @Input() isSorting: boolean = true;
  // отображать ли футер
  @Input() footerIsHide: boolean = false;
  // можно ли выбирать элемент
  @Input() isSelectsItem: boolean = false;
  // Ширина контента таблицы стрингой + единицы измерения
  // TODO: does not work
  @Input() tableBlockWidth: string = '';
  // Выделяется ли выбранный элемент
  @Input() isSelectedRowHighlight: boolean = false;
  // Выделяется ли элемент по наведению
  @Input() isHoveredRowHighlight: boolean = true;
  // наличие инпута в таблице (для изменения элементов) и кнопки сохранение
  @Input() isEditableItem: boolean = false;
  // сабджект для выбора страницы в пагинации (через changePage.next(1), где 1 это номер страницы)
  @Input() changePage: Subject<number>;
  // массив объектов типа TableHeader
  @Input() objColNameProps: TableHeader[] = [];
  // справочник для селекта
  @Input() selectData: StaticDirectory[] = [];

  // будет ли отображаться тагл для выгрузки данных таблицы
  @Input() isToggle: boolean = false;

  // должна ли колонка с данными типа 'toggle' быть задизэйблина:
  @Input() isToggleColmShouldBeDisabled: boolean = false;

  // должна ли колонка с данными типа 'button' быть задизэйблина:
  @Input() isButtonColmShouldBeDisabled: boolean = false;

  // кликабельность эл-та типа 'staticIconButton':
  @Input() isStaticIconButtonInactive: boolean = false;

  @Input() isReadonly: boolean = true;
  @Input() isShowChangeUserIcon: boolean = false;
  @Input() isVerticalScroll: boolean = false;

  // обьект фильтров для колонов
  @Input() filters: any;

  // эмитится выбранная, в пагинации, страница
  @Output() selectedPage: EventEmitter<number> = new EventEmitter<number>();
  // эмитится объект сортировки
  @Output() sortingData: EventEmitter<Sort> = new EventEmitter<Sort>();
  // эммитится выбранная строка
  @Output() selectedItem: EventEmitter<T> = new EventEmitter<T>();
  // эммитится строка при нажатии на кнопку
  @Output() buttonEvent: EventEmitter<T> = new EventEmitter<T>();
  // эммитится при нажатии на ссылку
  @Output() linkEvent: EventEmitter<T> = new EventEmitter<T>();
  // эммитится при выборе опции селекта
  @Output() selectEvent: EventEmitter<T> = new EventEmitter<T>();
  // эммитится при событии onBlur у инпута
  @Output() inputBlurEvent: EventEmitter<T> = new EventEmitter<T>();
  // эммитится строка при и название колонки нажатии на иконку
  @Output() userReassignEvent: EventEmitter<{ row: T; col: string }> = new EventEmitter<{ row: T; col: string }>();
  // эммитится строка при нажатии на кнопку Отказать (Администратор)
  @Output() declineAdminEvent: EventEmitter<T> = new EventEmitter<T>();
  @Output() toggleSwitchEvent: EventEmitter<T> = new EventEmitter<T>();
  @Output() toggleFilterEvent: EventEmitter<T> = new EventEmitter<T>();
  // эммитится строка и поле  при нажатии на иконку
  @Output() iconButtonEvent: EventEmitter<{ rowValue: TableContent<T>; type: string }> = new EventEmitter<{
    rowValue: TableContent<T>;
    type: string;
  }>();
  // эммитится массив строк с изменёнными значениями
  @Output() saveItems: EventEmitter<TableContent<T>[]> = new EventEmitter<TableContent<T>[]>();

  @ViewChild(MatSort) sort: MatSort;

  sortedData: TableContent<T>[];

  columWidth: number = 0;
  displayedColumns: string[] = [];
  totalColumns: string[] = [];
  changePageFromComponent: Observable<number>;

  selectedRow: TableContent<T>;

  headerClass = HeaderClass;
  ELocalNames = ELocalNames;

  valueToggle: boolean = false;

  currentLanguage: string = ELanguage.Am;

  filterObject: any = {};

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private cd: ChangeDetectorRef,
    private infinityScrollTableService: InfinityScrollTableService,
    private translateService: TranslateService
  ) {}

  get dataSource$() {
    return this.infinityScrollTableService.dataSource$;
  }

  ngOnInit(): void {
    this.currentLanguage = this.translateService.currentLang;
    this.createLanguageSubscription();
    this.infinityScrollTableService.init(this.cd);

    if (!!this.changePage) {
      this.changePageFromComponent = this.changePage.asObservable();
    }

    if (this.isSelectedRowHighlight && this.tableData.tableContentList.length) {
      this.selectedRow = this.tableData.tableContentList[0];
    }
    this.cd.detectChanges();
  }

  ngOnChanges() {
    if (this.tableData && this.tableData.tableDataHeader.length) {
      this.displayedColumns = this.tableData.tableDataHeader.map(item => item.code);
      this.totalColumns = this.tableData.tableDataHeader
        .map(item => (item.isTotal ? item.code : null))
        .filter(el => el);
      // this.sortedData = this.tableData.tableContentList.slice();

      this.infinityScrollTableService.data = this.tableData.tableContentList;

      this.cd.reattach();
    }
    this.calcWidth();
    this.cd.detectChanges();
  }

  ngAfterViewInit(): void {
    // if (this.tableData) {
    //   this.sortedData = this.tableData.tableContentList.slice();
    // }
    this.setFilterObject();

    if (this.isSorting) {
      this.sort.sortChange.pipe(untilDestroyed(this)).subscribe((sortEvent: Sort) => {
        const sortBy = this.tableData.tableDataHeader.find(colHeader => colHeader.code === sortEvent.active).sortBy;
        this.sortingData.emit({ ...sortEvent, active: sortBy });
      });
    }
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {}

  scrollStart(e: any) {
    this.infinityScrollTableService.scrollStart(e);
  }

  psYReachEnd(e: any) {
    this.infinityScrollTableService.scrollReachEnd(e);
  }

  paginate(value: number): void {
    this.selectedPage.emit(value);
  }

  savedItems() {
    this.saveItems.emit(this.tableData.tableContentList);
  }

  buttonClick(row: T) {
    this.buttonEvent.emit(row);
  }

  linkClick(row: T) {
    this.linkEvent.emit(row);
  }

  userReassign(row: T, col: string) {
    this.userReassignEvent.emit({ row, col });
  }

  declineAdminClick(row: T) {
    this.declineAdminEvent.emit(row);
  }

  toggleSwitch(row: T) {
    this.toggleSwitchEvent.emit(row);
  }

  emitIconButtonEvent(rowValue: TableContent<T>, type: string) {
    this.iconButtonEvent.emit({ rowValue, type });
  }

  selectChange(row: T) {
    this.selectEvent.emit(row);
  }

  inputBlur(row: T) {
    this.inputBlurEvent.emit(row);
  }

  selectRow(row: TableContent<T>, i: number): void {
    if (this.isSelectsItem) {
      this.selectedItem.emit(row.rowValue);

      if (this.isSelectedRowHighlight) {
        this.selectedRow = row;
      }
    }
  }

  isTouched() {
    if (this.valueToggle) {
      this.valueToggle = false;
      this.savedItems();
    }
  }

  trackByFn(index: number) {
    return index;
  }

  sortData(sort: Sort) {
    if (this.isSorting) {
      this.infinityScrollTableService.sortData({
        direction: sort.direction,
        active: `tableCell.${sort.active}`
      });
    }
  }

  getTotalFor(column: TableDataHeader): number {
    if (column) {
      const exist = this.totalColumns.some(el => el === column.code);
      const list = this.tableData.tableContentList;
      if (list.length && exist) {
        const listNumbers = list.map(el => el.rowValue[column.path]);
        return listNumbers.reduce((partialSum, a) => +partialSum + +a, 0);
      }
    }
    return null;
  }

  getMenuFor(column: TableDataHeader) {
    let filterMenu: any[];
    if (this.tableData.filters) {
      if (column.filter.isBoolean) {
        if (column.filter.booleanValues) {
          const booleanValues = column.filter.booleanValues;
          filterMenu = [
            this.translateService.instant(booleanValues.yes),
            this.translateService.instant(booleanValues.no)
          ];
        } else {
          filterMenu = [
            this.translateService.instant(BooleanFilterType.YES),
            this.translateService.instant(BooleanFilterType.NO)
          ];
        }
      } else {
        if (column.filter.filterProperty) {
          filterMenu = this.tableData.filters[column.filter.filterProperty];
        } else {
          filterMenu = this.tableData.filters[column.path];
        }
      }
      return filterMenu ? filterMenu.filter(el => !!el) : [];
    }
    return null;
  }

  toggleFilter(column: TableDataHeader, val: string) {
    const filteredProp = !!column.filter.filterProperty ? column.filter.filterProperty : column.path;

    this.filterObject[filteredProp] = val && column.filter.isBoolean ? this.getBooleanFilterValue(column, val) : val;

    this.toggleFilterEvent.emit({
      ...this.filterObject,
      [filteredProp]: val && column.filter.isBoolean ? this.getBooleanFilterValue(column, val) : val
    });
  }

  private getBooleanFilterValue = (column: TableDataHeader, val: string): boolean => {
    const booleanValues = column.filter.booleanValues;

    if (booleanValues) {
      return val === this.translateService.instant(booleanValues.yes);
    }

    return val === this.translateService.instant(BooleanFilterType.YES);
  };

  private createLanguageSubscription() {
    this.translateService.onLangChange.pipe(untilDestroyed(this)).subscribe((lang: LangChangeEvent) => {
      this.currentLanguage = lang.lang;
    });
  }

  private calcWidth(): void {
    if (!!this.displayedColumns.length) {
      this.columWidth = 100 / this.displayedColumns.length;
    }
  }

  private setFilterObject = (): void => {
    if (this.tableData) {
      this.tableData.tableDataHeader.forEach(header => {
        if (header.filter) {
          const filteredProp = !!header.filter.filterProperty ? header.filter.filterProperty : header.path;
          this.filterObject[filteredProp] = null;
        }
      });
    }
    this.cd.detectChanges();
  };
}
