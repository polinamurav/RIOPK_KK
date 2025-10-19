type HeaderTypes =
  | 'string'
  | 'number'
  | 'wholeNumber'
  | 'deactivation'
  | 'status'
  | 'statusPreapprove'
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
  | 'ru' // колонка отображается при языке ru
  | 'am' // колонка отображается при языке am
  | 'en'; // колонка отображается при языке en

export interface TableHeader {
  code: string;
  value: string;
  type: HeaderTypes;
  // path to elem:
  sortBy?: string;
  filterCode?: string;
}

export type TableShowCondition<T> = (item: T) => boolean;

export type TableCellLink<T> = (item: T, event?: any) => void;

export type TableCellClass<T> = (item: T) => string;

interface TableCell<T> {
  [key: string]: string | number | Date | T;
}

export interface TableCellConfig<T> {
  class?: TableCellClass<T>;
  clickEvent?: TableCellLink<T>;
  visible?: TableShowCondition<T>;
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

  constructor(public tableDataHeader: TableDataHeader[] = [], dataList: T[] = [], public filters?: any) {
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
  private _filterConfig: TableDataFilterConfig;
  private _isTotal: boolean;
  private _cellConfig: TableCellConfig<any> = {
    visible: () => true
  };

  constructor(
    public path: string,
    public value: string,
    public type: HeaderTypes,
    public sortBy?: string,
    public optionsListName?: string,
    public optionPropertyName?: string
  ) {}

  get filter(): TableDataFilterConfig {
    return this._filterConfig;
  }

  get cellConfig() {
    return this._cellConfig;
  }

  get isTotal(): boolean {
    return this._isTotal;
  }

  setFilter(config: TableDataFilterConfig = {}) {
    this._filterConfig = config;
    return this;
  }

  setCellClick(config: TableCellConfig<any>) {
    this._cellConfig = {
      ...this._cellConfig,
      ...config
    };
    return this;
  }

  setTotal() {
    this._isTotal = true;
    return this;
  }
}

export interface TableDataFilterConfig {
  isBoolean?: boolean;
  booleanValues?: { yes: string; no: string };
  filterProperty?: string;
}
