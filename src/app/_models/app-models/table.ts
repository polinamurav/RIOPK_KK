type HeaderTypes =
  | 'string'
  | 'number'
  | 'wholeNumber'
  | 'deactivation'
  | 'status'
  | 'inputNumber'
  | 'doc'
  | 'button'
  | 'text'
  | 'textarea'
  | 'date'
  | 'iconButton'
  | 'select'
  | 'deleted'
  | 'deletedDoc'
  | 'creditType'
  | 'toggleDisabled'
  | 'toggle'
  | 'dateAndTime'
  | 'staticIconButton'
  | 'userReassignment'
  | 'refresh'
  | 'declineAdmin'
  | 'link'
  | 'ru' //колонка отображается при языке ru
  | 'ge' //колонка отображается при языке ge
  | 'en'; //колонка отображается при языке en

export interface TableHeader {
  code: string;
  value: string;
  type: HeaderTypes;
  // path to elem:
  sortBy?: string;
}

interface TableCell<T> {
  [key: string]: string | number | Date | T;
}

export class TableContent<T> {
  tableCell: TableCell<T> | T = {};

  constructor(public rowValue: T, tableDataHeader: TableDataHeader[]) {
    this.tableCell = { ...rowValue };

    tableDataHeader.forEach((value, index) => {
      let comlName: string;
      const path = value.path.split('.');

      if (path.length > 1) {
        comlName = index.toString();
      } else {
        comlName = path[0];
      }

      this.tableCell[comlName] = this.get(rowValue, path);
      value.code = comlName;
    });
  }

  private get(object: T, path: string[]) {
    const result = object === null ? undefined : this.baseGet(object, path);
    return result;
  }

  private baseGet(object: T, path: string[]) {
    let index = 0;
    const length = path.length;

    while (object !== null && index < length) {
      object = object[path[index++]];
    }
    return index && index === length ? object : undefined;
  }
}

export class TableData<T> {
  tableContentList: TableContent<T>[] = [];

  constructor(public tableDataHeader: TableDataHeader[] = [], dataList: T[] = []) {
    if (!!dataList.length) {
      dataList.forEach(data => {
        this.tableContentList.push(new TableContent<T>(data, tableDataHeader));
      });
    } else {
      const garbage = new TableContent<T>(null, tableDataHeader);
    }
  }
}

export class TableDataHeader implements TableHeader {
  code: string;
  constructor(
    public path: string,
    public value: string,
    public type: HeaderTypes,
    public sortBy?: string,
    public optionsListName?: string,
    public optionPropertyName?: string
  ) {}
}
