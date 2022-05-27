import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ELocalNames, EditableTableHeader, StaticDirectory, ValueType } from '@app/_models';

import { ELanguage } from '@app/constants/language';
import { CredentialsService } from '@app/services/authentication';

@Component({
  selector: 'nv-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrls: ['./editable-table.component.scss']
})
export class EditableTableComponent<T> implements OnInit, OnChanges {
  @Input() canAddRows: boolean = true;
  @Input() canEditRows: boolean = true;
  @Input() canDeleteRows: boolean = false;
  @Input() requiredMessage: string = 'ErrorMessage.Required';
  @Input() tableHeaders: EditableTableHeader[] = [];
  @Input() tableRows: T[] = [];
  @Input() selectData: StaticDirectory[] = [];
  @Input() isDeleteObjLink: boolean = false;
  @Input() buttonName: string = 'Buttons.Add';
  @Input() buttonsLeftPosition: string = '50%';
  @Input() language: string;
  @Input() pageForSelect: number;
  @Input() toggleDependentChecked: boolean;

  @Output() savedRow: EventEmitter<T> = new EventEmitter<T>();
  @Output() removedRow: EventEmitter<T> = new EventEmitter<T>();
  @Output() editedRow: EventEmitter<T> = new EventEmitter<T>();
  @Output() getNextPartEvent: EventEmitter<number> = new EventEmitter();
  @Output() getSortPartEvent: EventEmitter<string> = new EventEmitter();

  isBtnDeleteAvailable: boolean = false;
  isEditing: T = null;
  submitted: boolean = false;
  childLanguage: string;
  patternMessage = 'ErrorMessage.IncorrectData';
  maxLengthMessage = 'ErrorMessage.MaxLengthMessage';
  ELocalNames = ELocalNames;
  ELanguage = ELanguage;
  ValueType = ValueType;

  private changeResetObject: T = null;
  private isEdit: boolean = true;

  constructor(private credentialsService: CredentialsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.language && changes.language.currentValue) {
      this.childLanguage = changes.language.currentValue;
    }
    if (changes.selectData && changes.selectData.currentValue) {
      this.selectData = { ...changes.selectData.currentValue };
    }
  }

  ngOnInit() {
    this.filterTableHeadersByRoles();
    this.childLanguage = this.language || ELocalNames.NameGe;
    // TODO '!!this.tableRows' for not null check (verification stage for view if verific stage was not reached still):
    if (this.isDeleteObjLink && !!this.tableRows) {
      this.tableRows = this.tableRows.filter(temporalRow => temporalRow);
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
    });

    const row: T = { ...newCells };

    this.isEditing = row;
    this.tableRows.push(row);
  }

  editRow(selectedRow: T, cellCode: string = null): void {
    if (!this.isEditing && this.isEdit) {
      this.submitted = false;
      this.isEditing = selectedRow;
      this.changeResetObject = { ...selectedRow };
      this.isBtnDeleteAvailable = this.canDeleteRows;

      if (cellCode) {
        this.changeResetObject[cellCode] = !selectedRow[cellCode];
      }
    }
  }

  cancelEdition(selectedRow: T): void {
    this.submitted = false;

    if (!!this.changeResetObject) {
      Object.assign(selectedRow, this.changeResetObject);
    } else {
      this.tableRows = this.tableRows.filter(err => err !== selectedRow);
    }

    this.changeResetObject = null;
    this.isEditing = null;
    this.isEdit = true;
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

  saveRow(selectedRow: T): void {
    this.submitted = true;

    for (const head of this.tableHeaders) {
      if (
        (head.isRequired && (selectedRow[head.code] === null || selectedRow[head.code] === '')) ||
        (head.type === 'phoneNumber' && selectedRow[head.code].length !== 12) ||
        (head.pattern && selectedRow[head.code].length && !head.pattern.test(selectedRow[head.code])) ||
        (head.maxLength && selectedRow[head.code] && selectedRow[head.code].length > head.maxLength)
      ) {
        return;
      }
    }

    this.submitted = false;
    this.isEditing = null;
    this.changeResetObject = null;

    !this.isEdit ? this.savedRow.emit(selectedRow) : this.editedRow.emit(selectedRow);
    this.isEdit = true;
  }

  deleteRow(selectedRow: T): void {
    this.submitted = false;
    this.isEditing = null;
    this.changeResetObject = null;

    this.tableRows = this.tableRows.filter(temporalRow => temporalRow !== selectedRow);

    this.removedRow.emit(selectedRow);
    this.isEdit = true;
  }

  nextPartEvent(page: number): void {
    this.getNextPartEvent.emit(page);
  }

  sortPartEvent(searchValue: string): void {
    this.getSortPartEvent.emit(searchValue);
  }

  private filterTableHeadersByRoles(): void {
    this.tableHeaders = this.tableHeaders.filter((cell: EditableTableHeader) => {
      if (cell.visibleForRolesList) {
        return this.credentialsService.checkRoles(cell.visibleForRolesList);
      }

      return true;
    });
  }
}
