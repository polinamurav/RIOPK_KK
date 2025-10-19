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
import { ApplicationDto, ELocalNames, StageType, StaticDirectory, TableContent, TableData, TableHeader } from '@app/_models';
import { MatSort, Sort } from '@angular/material/sort';
import { Observable, Subject } from 'rxjs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { untilDestroyed } from '@app/core';
import { ELanguage } from '@app/constants/language';
import { CdkVirtualScrollViewport, FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';
import { InfinityScrollTableService } from '@app/shared/components/table/infinity-scroll-table.service';
import { tap } from 'rxjs/operators';
import { CredentialsService } from '@app/services/authentication';

enum HeaderClass {
  'status' = 'header-title-center',
  'deactivation' = 'header-title-center',
  'active' = 'header-title-center',
  'iconButton' = 'header-title-center',
  'deleted' = 'header-title-center',
  'staticIconButton' = 'header-title-center'
}

const ROW_HEIGHT = 40;
/**
 * Virtual Scroll Strategy
 */
export class CustomVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
  constructor() {
    super(ROW_HEIGHT, 1000, 2000);
  }

  attach(viewport: CdkVirtualScrollViewport): void {
    this.onDataLengthChanged();
  }
}

@Component({
  selector: 'mat-app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [InfinityScrollTableService]
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
  @Input() itemLimit: number = 20;
  // всего записей
  @Input() totalCount: number = 0;

  @Input() tableHeight: string;

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

  @Input() selectedElement: T; // выбранный элемент
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
  @Output() linkEvent: EventEmitter<any> = new EventEmitter<any>();
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

  @ViewChild('pfScrollbar', { static: true }) pfScrollbar: PerfectScrollbarComponent;

  columWidth: number = 0;
  displayedColumns: string[] = [];
  changePageFromComponent: Observable<number>;

  selectedRow: TableContent<T>;

  headerClass = HeaderClass;
  ELocalNames = ELocalNames;

  valueToggle: boolean = false;

  currentLanguage: string = ELanguage.Am;

  constructor(
    private cd: ChangeDetectorRef,
    private translateService: TranslateService,
    private infinityScrollTableService: InfinityScrollTableService,
    private credentialsService: CredentialsService
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
  }

  ngOnChanges() {
    if (this.tableData && this.tableData.tableDataHeader.length) {
      this.displayedColumns = this.tableData.tableDataHeader.map(item => item.code);

      this.infinityScrollTableService.data = this.tableData.tableContentList;
      // this.setDataSource();

      this.cd.reattach();
    }
    this.calcWidth();
  }

  scrollStart(e: any) {
    this.infinityScrollTableService.scrollStart(e);
  }

  psYReachEnd(e: any) {
    this.infinityScrollTableService.scrollReachEnd(e);
  }

  ngAfterViewInit(): void {
    if (this.isSorting) {
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

  linkClick(row: T, code: string) {
    this.linkEvent.emit({
      row, code
    });
  }

  isReassignAvailable(row: T, columnCode: string): boolean {
    const isAllowedRoles = this.credentialsService.isRiskManagerBoss || this.credentialsService.isAdmin;
    if (!isAllowedRoles) return false;

    const rowAny = row as any;

    if (this.isShowChangeUserIcon) {
      return !!(rowAny && rowAny.id);
    }

    if (!rowAny || !rowAny.stageId) {
      return false;
    }

    const allowedStages = [
      StageType.MANUAL_CHECKS,
      StageType.MANUAL_CHECKS_RETURN,
      StageType.RM,
      StageType.RM_RETURN,
    ];

    return allowedStages.includes(rowAny.stageId);
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
