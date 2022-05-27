import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'ngx-pagination',
  template: `
    <nav *ngIf="getLast() != 1 && getLast() != 0" class="ng2-smart-pagination-nav">
      <ul class="ng2-smart-pagination pagination">
        <li class="ng2-smart-page-item page-item page-item-string " *ngIf="getPage() !== 1">
          <a class="ng2-smart-page-link page-link" (click)="getPage() == 1 ? false : paginate(1)" aria-label="First">
            <span aria-hidden="true"><<</span>
            <span class="sr-only">First</span>
          </a>
        </li>
        <li class="ng2-smart-page-item page-item page-item-string " *ngIf="getPage() !== 1">
          <a class="ng2-smart-page-link page-link" (click)="getPage() == 1 ? false : prev()" aria-label="Prev">
            <span aria-hidden="true"><</span>
            <span class="sr-only">Prev</span>
          </a>
        </li>
        <li
          class="ng2-smart-page-item page-item page-item-number"
          [ngClass]="{ active: getPage() == page }"
          *ngFor="let page of getPages()"
        >
          <span
            class="ng2-smart-page-link page-link"
            *ngIf="getPage() == page"
            [class.text-size-min]="page > 9999"
            [class.text-size-mid]="page > 999 && page <= 9999"
            >{{ page }} <span class="sr-only">(current)</span></span
          >
          <a
            class="ng2-smart-page-link page-link"
            [class.text-size-min]="page > 9999"
            [class.text-size-mid]="page > 999 && page <= 9999"
            (click)="paginate(page)"
            *ngIf="getPage() != page"
            >{{ page }}</a
          >
        </li>
        <li class="ng2-smart-page-item page-item page-item-string " *ngIf="getPage() !== getLast()">
          <a class="ng2-smart-page-link page-link" (click)="getPage() == getLast() ? false : next()" aria-label="Next">
            <span aria-hidden="true">></span>
            <span class="sr-only">Next</span>
          </a>
        </li>
        <li class="ng2-smart-page-item page-item page-item-string" *ngIf="getPage() !== getLast()">
          <a
            class="ng2-smart-page-link page-link"
            (click)="getPage() == getLast() ? false : paginate(getLast())"
            aria-label="Last"
          >
            <span aria-hidden="true">>></span>
            <span class="sr-only">Last</span>
          </a>
        </li>
      </ul>
    </nav>
  `,
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges, OnDestroy {
  @Input() totalCount: number;
  @Input() itemLimit: number = 10;
  @Input() changePageFromComponent: Observable<number>;
  @Output() loadCashboxes: EventEmitter<number> = new EventEmitter();

  private pages: number[];
  private page: number = 1;

  ngOnInit(): void {
    if (this.changePageFromComponent) {
      this.changePageFromComponent
        .pipe(untilDestroyed(this))
        .subscribe((data: number) => (!!data ? this.paginate(data) : this.paginate(this.getLast())));
    }
  }

  ngOnChanges(): void {
    this.initPages();
  }

  ngOnDestroy(): void {}

  getPages(): number[] {
    return this.pages;
  }

  next(): void {
    this.paginate(this.getPage() + 1);
  }

  prev(): void {
    this.paginate(this.getPage() - 1);
  }

  paginate(value: number): void {
    this.page = value;
    this.loadCashboxes.emit(value);
    this.initPages();
  }

  getPage(): number {
    return this.page;
  }

  getLast(): number {
    return Math.ceil(this.totalCount / this.itemLimit);
  }

  private initPages(): void {
    const pagesCount = this.getLast();

    if (pagesCount < this.page) {
      this.page = pagesCount ? pagesCount : 1;
    }

    let showPagesCount = 4;
    showPagesCount = pagesCount < showPagesCount ? pagesCount : showPagesCount;
    this.pages = [];

    let middleOne = Math.ceil(showPagesCount / 2);
    middleOne = this.page >= middleOne ? this.page : middleOne;

    let lastOne = middleOne + Math.floor(showPagesCount / 2);
    lastOne = lastOne >= pagesCount ? pagesCount : lastOne;

    const firstOne = lastOne - showPagesCount + 1;

    for (let i = firstOne; i <= lastOne; i++) {
      this.pages.push(i);
    }
  }
}
