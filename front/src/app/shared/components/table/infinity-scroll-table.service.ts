import { ChangeDetectorRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Sort } from '@angular/material/sort';
import * as _ from 'lodash';

const PAGESIZE = 30;

@Injectable()
export class InfinityScrollTableService {
  private readonly _visibleData: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private _data: any[];
  private _pagedList: any[];
  private _scrollStart: boolean;
  private _dataLength: number;
  private _pageNumber = 0;
  private _cd: ChangeDetectorRef;

  constructor() {}

  get data(): any[] {
    return this._data.slice();
  }

  set data(data: any[]) {
    this._data = data;
    this._dataLength = data.length;
    this._pageNumber = 0;
    this._pagedList = this.setPageList(data);
    this._visibleData.next(this._pagedList[this._pageNumber]);
  }

  get dataSource$() {
    return this._visibleData.asObservable();
  }

  get visibleData() {
    return this._visibleData.getValue();
  }

  init(cd: ChangeDetectorRef) {
    this._cd = cd;
  }

  scrollStart(e: any) {
    this._scrollStart = true;
  }

  scrollReachEnd(e: any) {
    if (this._scrollStart && !!this.visibleData) {
      if (this._pageNumber <= this._pagedList.length) {
        this._pageNumber += 1;
        if (this._pagedList[this._pageNumber]) {
          const list = this.visibleData.concat(this._pagedList[this._pageNumber]);
          this._visibleData.next([...list]);
        }
      }
      this._cd.detectChanges();
    }
  }

  sortData(sort: Sort) {
    const data = this._data.slice();
    this._pageNumber = 0;
    if (!sort.active || sort.direction === '') {
      this._visibleData.next(this._pagedList[this._pageNumber]);
      return;
    }
    const sortedList = _.orderBy(data, [sort.active], sort.direction);
    this._pagedList = this.setPageList(sortedList);
    this._visibleData.next(this._pagedList[this._pageNumber]);
  }

  private setPageList = (list: any[]) => {
    const pages = Math.floor(list.length / PAGESIZE);
    const pagedList = [];
    let startIndex = 0;
    for (let i = 0; i <= pages; i++) {
      pagedList[i] = list.slice(startIndex, startIndex + PAGESIZE);
      startIndex += PAGESIZE;
    }
    return pagedList;
  };
}
