import {
  AfterViewInit,
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
import { ELocalNames, StaticDirectory, TableContent, TableData, TableHeader } from '@app/_models';
import { MatSort, Sort } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import { untilDestroyed } from '@app/core';
import { ELanguage } from '@app/constants/language';

enum HeaderClass {
  'status' = 'header-title-center',
  'deactivation' = 'header-title-center',
  'active' = 'header-title-center',
  'iconButton' = 'header-title-center',
  'deleted' = 'header-title-center',
  'staticIconButton' = 'header-title-center'
}

@Component({
  selector: 'mat-app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> implements OnInit, OnChanges, AfterViewInit, OnDestroy {
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
  @Input() itemLimit: number = 10;
  // всего записей
  @Input() totalCount: number = 0;
  // массив записей
  @Input() dataSource: T[] = [];

  @Input() tableData: TableData<T>;

  // начилие сортировки
  @Input() isSotring: boolean = true;
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
  // эммитится строка и поле  при нажатии на иконку
  @Output() iconButtonEvent: EventEmitter<{ rowValue: TableContent<T>; type: string }> = new EventEmitter<{
    rowValue: TableContent<T>;
    type: string;
  }>();
  // эммитится массив строк с изменёнными значениями
  @Output() saveItems: EventEmitter<TableContent<T>[]> = new EventEmitter<TableContent<T>[]>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  columWidth: number = 0;
  displayedColumns: string[] = [];
  changePageFromComponent: Observable<number>;

  selectedRow: TableContent<T>;

  headerClass = HeaderClass;
  ELocalNames = ELocalNames;

  valueToggle: boolean = false;

  currentLanguage: string = ELanguage.Ge;

  constructor(private cd: ChangeDetectorRef, private translateService: TranslateService) {}

  ngOnInit(): void {
    this.currentLanguage = this.translateService.currentLang;
    this.createLanguageSubscription();

    if (!!this.changePage) {
      this.changePageFromComponent = this.changePage.asObservable();
    }

    if (this.isSelectedRowHighlight && this.tableData.tableContentList.length) {
      this.selectedRow = this.tableData.tableContentList[0];
    }
  }

  ngOnChanges() {
    if (this.tableData && this.tableData.tableDataHeader.length) {
      this.displayedColumns = this.tableData.tableDataHeader.map(item => item.code);
      this.cd.reattach();
    }

    this.calcWidth();
  }

  ngAfterViewInit(): void {
    if (this.isSotring) {
      this.sort.sortChange.pipe(untilDestroyed(this)).subscribe((sortEvent: Sort) => {
        const sortBy = this.tableData.tableDataHeader.find(colHeader => colHeader.code === sortEvent.active).sortBy;
        this.sortingData.emit({ ...sortEvent, active: sortBy });
      });
    }
  }

  ngOnDestroy(): void {}

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
}
