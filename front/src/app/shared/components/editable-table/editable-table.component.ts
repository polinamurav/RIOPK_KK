import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { ELocalNames, EditableTableHeader, ValueType, StaticDirectory } from '@app/_models';

import { ELanguage } from '@app/constants/language';
import { CredentialsService } from '@app/services/authentication';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface OnBlurEventOutputConfig {
  code: string;
  value: any;
}

import * as _ from 'lodash';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { InfinityScrollTableService } from '@app/shared/components/table/infinity-scroll-table.service';

@Component({
  selector: 'nv-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.scss'],
  providers: [InfinityScrollTableService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditableTableComponent<T> implements OnInit, OnChanges {
  @Input() canAddRows: boolean = true;
  @Input() canEditRows: boolean = true;
  @Input() canDeleteRows: boolean = false;
  @Input() enableSearchBtn: boolean;
  @Input() requiredMessage: string = 'ErrorMessage.Required';
  @Input() tableHeaders: EditableTableHeader[] = [];
  @Input() tableRows: T[] = [];
  @Input() selectData: StaticDirectory[] = [];
  @Input() isDeleteObjLink: boolean = false;
  @Input() buttonName: string = 'Buttons.Add';
  @Input() buttonsLeftPosition: string = '50%';
  @Input() language: string;
  @Input() maxHeight: string;
  @Input() fixedHeader: boolean;
  @Input() pageForSelect: number;
  @Input() toggleDependentChecked: boolean;
  @Input() updateEditableRow$ = new BehaviorSubject<T>(null);
  @Input() setDisabledCells$ = new BehaviorSubject<string[]>(null);

  @Output() savedRow: EventEmitter<T> = new EventEmitter<T>();
  @Output() searchBtnEvent: EventEmitter<T> = new EventEmitter<T>();
  @Output() cellBlurEvent: EventEmitter<OnBlurEventOutputConfig> = new EventEmitter<OnBlurEventOutputConfig>();
  @Output() removedRow: EventEmitter<T> = new EventEmitter<T>();
  @Output() editedRow: EventEmitter<T> = new EventEmitter<T>();
  @Output() getNextPartEvent: EventEmitter<number> = new EventEmitter();
  @Output() getSortPartEvent: EventEmitter<string> = new EventEmitter();
  @Output() emitFilteredList: EventEmitter<T[]> = new EventEmitter();

  isBtnDeleteAvailable: boolean = false;
  errorLoadIcon: boolean = false;
  isEditing: T | any = null;
  submitted: boolean = false;
  childLanguage: string;
  patternMessage = 'ErrorMessage.IncorrectData';
  maxLengthMessage = 'ErrorMessage.MaxLengthMessage';
  ELocalNames = ELocalNames;
  ELanguage = ELanguage;
  ValueType = ValueType;

  filteredTableRows: T[] = [];

  temporaryDisabled: string[] = [];

  showFilterFor: Record<string, boolean> = {};
  filterOptions: Record<string, any> = {};
  showSortFor: Record<string, boolean> = {};
  filterObject: Record<string, string> = {};

  totalColumns: EditableTableHeader[] = [];

  private changeResetObject: T = null;
  private isEdit: boolean = true;

  constructor(
    private translateService: TranslateService,
    private cd: ChangeDetectorRef,
    private infinityScrollTableService: InfinityScrollTableService,
    private credentialsService: CredentialsService
  ) {}

  get isTotal(): boolean {
    return !!this.totalColumns.length;
  }

  get dataSource$() {
    return this.infinityScrollTableService.dataSource$;
  }

  scrollStart(e: any) {
    this.infinityScrollTableService.scrollStart(e);
  }

  psYReachEnd(e: any) {
    this.infinityScrollTableService.scrollReachEnd(e);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.filteredTableRows = [...this.tableRows];

    this.emitFilteredList.emit(this.tableRows);
    if (changes.language && changes.language.currentValue) {
      this.childLanguage = changes.language.currentValue;
      this.prepareFiltersAndSort();
    }

    if (changes.tableRows && changes.tableRows.currentValue) {
      this.isEditing = null;
      this.infinityScrollTableService.data = this.tableRows;
    }

    if (changes.selectData && changes.selectData.currentValue) {
      this.selectData = { ...changes.selectData.currentValue };
      this.prepareFiltersAndSort();
    }
    this.setTotal();
    this.cd.detectChanges();
  }

  ngOnInit() {
    this.infinityScrollTableService.init(this.cd);
    this.filterTableHeadersByRoles();
    this.childLanguage = this.language || ELocalNames.NameAm;
    // TODO '!!this.tableRows' for not null check (verification stage for view if verific stage was not reached still):
    if (this.isDeleteObjLink && !!this.tableRows) {
      this.tableRows = this.tableRows.filter(temporalRow => temporalRow);
      this.infinityScrollTableService.data = this.tableRows;
    }
    this.subscribeOnUpdate();
  }

  cellDisabled(cell: EditableTableHeader, isEditRow: boolean): boolean {
    if (isEditRow) {
      return cell.enableIfEdit ? false : cell.isDisabled;
    } else {
      return cell.isDisabled;
    }
  }

  addRow(): void {
    const newCells: T = {} as T;
    this.isBtnDeleteAvailable = false;
    this.isEdit = false;

    this.tableHeaders.forEach((value: EditableTableHeader) => {
      newCells[value.code] = value.type === 'toggle' || value.type === 'toggleDependent' ? false : '';
      if (typeof value.defaultNewValue !== 'undefined') {
        newCells[value.code] = value.defaultNewValue;
      }
      if (!!value.defaultValueInSelection) {
        newCells[value.code] = value.defaultValueInSelection;
      }
    });

    const row: T = { ...newCells };

    const isAvailableIdsForOptions = this.tableHeaders.find(el => !!el.availableIdsForOptions);

    if (!!isAvailableIdsForOptions) {
      row[isAvailableIdsForOptions.availableIdsForOptionsProperty] = isAvailableIdsForOptions.availableIdsForOptions(
        this.tableRows[0]
      );
    }

    this.isEditing = row;
    this.tableRows.push(row);
    this.infinityScrollTableService.data = this.tableRows;
    this.emitFilteredList.emit(this.tableRows);
    this.temporaryDisabled = [];
    this.cd.detectChanges();
  }

  editRow(selectedRow: T | any, cellCode: string = null): void {
    if (selectedRow && (selectedRow.incomeSource === 'EXTERNAL' || selectedRow.incomeSource === 'MANUAL')) {
      this.canDeleteRows = false;
    }

    this.setClearFieldId(selectedRow);

    if (!this.isEditing && this.isEdit) {
      this.submitted = false;
      this.changeResetObject = { ...selectedRow };
      this.isBtnDeleteAvailable = this.canDeleteRows;
      this.isEditing = selectedRow;
      if (cellCode) {
        this.changeResetObject[cellCode] = !selectedRow[cellCode];
      }
      this.setMissingProps();
      this.temporaryDisabled = [];
    }
    this.cd.detectChanges();
  }

  onBlur(selectedRow: T, cell: EditableTableHeader) {
    if (cell.emitOnBlur) {
      this.cellBlurEvent.emit({ code: cell.code, value: selectedRow[cell.code] });
    }
    if (cell.clearIfNotValidOnBlur) {
      if (!this.runCellValidations(selectedRow, cell)) {
        selectedRow[cell.code] = null;
      }
    }
  }

  cancelEdition(selectedRow: T): void {
    this.submitted = false;

    if (!!this.changeResetObject) {
      Object.assign(selectedRow, this.changeResetObject);
    } else {
      this.tableRows = this.tableRows.filter(err => err !== selectedRow);
      this.infinityScrollTableService.data = this.tableRows;
      this.emitFilteredList.emit(this.tableRows);
    }
    this.changeResetObject = null;
    this.isEditing = null;
    this.isEdit = true;
    this.temporaryDisabled = [];
    this.cd.detectChanges();
  }

  checkValidationFirstRow(): boolean {
    this.submitted = true;
    const selectedRow = this.tableRows[0];
    for (const head of this.tableHeaders) {
      if (
        (head.isRequired && (selectedRow[head.code] === null || selectedRow[head.code] === '')) ||
        (head.type === 'phoneNumber' && selectedRow[head.code].length !== 12) ||
        (head.pattern && selectedRow[head.code].length && !head.pattern.test(selectedRow[head.code])) ||
        (head.maxLength && selectedRow[head.code] && selectedRow[head.code].length > head.maxLength)
      ) {
        return false;
      }
    }
    this.submitted = false;
    return true;
  }

  openSearchModal(selectedRow: T) {
    this.searchBtnEvent.emit(selectedRow);
  }

  saveRow(selectedRow: T): void {
    event.stopPropagation();
    this.submitted = true;

    if (!this.runValidations(selectedRow)) {
      return;
    }

    this.submitted = false;
    this.isEditing = null;
    this.changeResetObject = null;
    !this.isEdit ? this.savedRow.emit(selectedRow) : this.editedRow.emit(selectedRow);
    this.isEdit = true;
    this.temporaryDisabled = [];
    this.cd.detectChanges();
  }

  deleteRow(selectedRow: T): void {
    this.submitted = false;
    this.isEditing = null;
    this.changeResetObject = null;

    this.tableRows = this.tableRows.filter(temporalRow => temporalRow !== selectedRow);

    this.removedRow.emit(selectedRow);
    this.isEdit = true;

    this.infinityScrollTableService.data = this.tableRows;
    this.emitFilteredList.emit(this.tableRows);
    this.cd.detectChanges();
  }

  nextPartEvent(page: number): void {
    this.getNextPartEvent.emit(page);
  }

  sortPartEvent(searchValue: string): void {
    this.getSortPartEvent.emit(searchValue);
  }

  isTemporaryDisabled(code: string): boolean {
    return this.temporaryDisabled.includes(code);
  }

  setDisableIf(cell: EditableTableHeader, selectedRow: T | any): boolean {
    if (cell.setDisableIf) {
      return cell.setDisableIf(selectedRow);
    }
    return false;
  }

  setRequiredField(cell: EditableTableHeader, selectedRow: T | any): boolean {
    if (cell.setRequiredField) {
      return cell.setRequiredField(selectedRow) && this.isEditing;
    }
    return false;
  }

  toggleFilter(cell: EditableTableHeader, event: any) {
    this.filterObject[cell.code] = event;
    this.runFilterData();
  }

  getDirectionForSort(cell: EditableTableHeader): string {
    if (!cell.sortDirections) {
      return '/assets/img/sort-svgrepo-com.svg';
    }
    return cell.sortDirections === 'asc' ? '/assets/img/sort-down.svg' : '/assets/img/sort-up.svg';
  }

  sortTableCol(col: EditableTableHeader) {
    col.sortDirections = col.sortDirections === 'asc' ? 'desc' : 'asc';
    // this.filteredTableRows = _.orderBy(this.filteredTableRows, [col.code], [col.sortDirections]);

    this.infinityScrollTableService.sortData({
      direction: col.sortDirections,
      active: col.code
    });
  }

  onPasteOnlyNumbers(e: ClipboardEvent) {
    const value = e.clipboardData.getData('text');
    if (!Number(value)) {
      e.preventDefault();
    }
  }

  getTotalFor(column: EditableTableHeader): number {
    if (this.totalColumns.length) {
      if (column.isTotal && this.filteredTableRows.length) {
        if (this.tableRows.length) {
          const listNumbers = this.filteredTableRows.map(el => el[column.code]);
          return listNumbers.reduce((partialSum, a) => +partialSum + +a, 0);
        }
      }
    }
    return null;
  }

  // private setTempOptions = (selectedRow: T, cellCode: string = null): void => {
  //   const header = this.tableHeaders.find(el => el.code === cellCode);
  //   const availableIds = header.availableIdsForOptions ? header.availableIdsForOptions(selectedRow) : null;
  //   const filtered = this.filterOptionsByIds(this.selectData[header.selectDataName], availableIds);
  //   header.tempOptions = filtered || this.selectData[header.selectDataName];
  // }
  //
  // private filterOptionsByIds = (arrDir: Array<any>, ids: number[]): any[] => {
  //   return !!arrDir && !!ids?  arrDir.filter(el => ids.includes(el.id)) : [];
  // }

  private subscribeOnUpdate(): void {
    combineLatest([this.updateEditableRow$, this.setDisabledCells$])
      .pipe(
        tap(([item, disabledCodes]) => {
          this.updateRow(item);
          this.setDisabledCellFor(disabledCodes);
        })
      )
      .subscribe();
  }

  private filterTableHeadersByRoles(): void {
    this.tableHeaders = this.tableHeaders.filter((cell: EditableTableHeader) => {
      if (cell.visibleForRolesList) {
        return this.credentialsService.checkRoles(cell.visibleForRolesList);
      }

      return true;
    });
  }

  private updateRow = (item: T): void => {
    if (item) {
      Object.assign(this.isEditing, item);
      this.cd.markForCheck();
    }
  };

  private setDisabledCellFor = (codes: string[]): void => {
    if (codes) {
      if (this.isEditing) {
        this.temporaryDisabled = codes;
      }
    }
  };

  private setMissingProps = (): void => {
    this.tableHeaders.forEach((header: EditableTableHeader) => {
      const prop = header.code;
      if (!this.isEditing.hasOwnProperty(prop)) {
        this.isEditing[prop] = null;
      }
    });
  };

  private setClearFieldId(selectedRow: T) {
    this.tableHeaders.forEach(head => {
      if (head.clearIf) {
        if (head.clearIf(selectedRow)) {
          selectedRow[head.code] = null;
        }
      }
    });
  }

  private runValidations = (selectedRow: T): boolean => {
    let isValid = true;

    for (const head of this.tableHeaders) {
      if (!((!!head.setDisableIf && head.setDisableIf(selectedRow)) || head.isDisabled)) {
        if (isValid) {
          isValid = this.runCellValidations(selectedRow, head);
        }
      }
    }
    return isValid;
  };

  private runCellValidations = (selectedRow: T, cell: EditableTableHeader): boolean => {
    const head = cell;
    return !(
      (head.isRequired && (selectedRow[head.code] === null || selectedRow[head.code] === '')) ||
      (head.type === 'phoneNumber' && selectedRow[head.code].length !== 12) ||
      (this.setRequiredField(head, selectedRow) && !selectedRow[head.code]) ||
      (!!head.inputValidator && !(head.inputValidator(selectedRow[head.code]) as any).valid) ||
      (!!head.innerValidation &&
        !head.innerValidation.every(
          validatorFn => (validatorFn(selectedRow, head.code, selectedRow[head.code]) as any).valid
        )) ||
      (head.pattern &&
        selectedRow[head.code] &&
        selectedRow[head.code].length &&
        !head.pattern.test(selectedRow[head.code])) ||
      (head.maxLength && selectedRow[head.code] && selectedRow[head.code].length > head.maxLength)
    );
  };

  private runFilterData = (): void => {
    let filtered = [...this.tableRows];
    for (const key in this.filterObject) {
      if ((this.filterObject as object).hasOwnProperty(key as string)) {
        const value = this.filterObject[key];
        if (value !== null) {
          if (typeof value === 'boolean') {
            filtered = filtered.filter(elem => !!elem[key] === !!value);
          } else {
            filtered = filtered.filter(elem => elem[key] === value);
          }
        }
      }
    }
    // this.filteredTableRows = filtered;
    console.log(filtered);
    this.infinityScrollTableService.data = filtered;
    this.emitFilteredList.emit(filtered);
  };

  private prepareFiltersAndSort = (): void => {
    this.tableHeaders.forEach(header => {
      if (header.setFilterIf) {
        this.showFilterFor[header.code] = header.setFilterIf(header);
        if (!header.isBooleanFilter) {
          const menu = this.tableRows.map(el => el[header.code]).filter(el => !!el);
          this.filterOptions[header.code] = Array.from(new Set(menu));
        } else {
        }
      }
      if (header.setSortIf) {
        this.showSortFor[header.code] = header.setSortIf(header);
      }
    });
  };

  private setTotal = (): void => {
    this.totalColumns = this.tableHeaders.filter(head => head.isTotal);
  };
}
