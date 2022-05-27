import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, ReplaySubject, Subject } from 'rxjs';
import { auditTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ScrollSpiedElementGroup, ScrollSpyInfo } from '@app/_models';

const topMargin = 22;

@Injectable({ providedIn: 'root' })
export class ScrollSpyService {
  private spiedElementGroups: ScrollSpiedElementGroup[] = [];
  private onStopListening = new Subject();
  private resizeEvents = fromEvent(window, 'resize').pipe(
    auditTime(300),
    takeUntil(this.onStopListening)
  );
  private scrollEvents = fromEvent(window, 'scroll').pipe(
    auditTime(10),
    takeUntil(this.onStopListening)
  );
  private lastContentHeight: number;
  private lastMaxScrollTop: number;
  private _topOffset: number | null;
  private scrollTopSubject = new ReplaySubject<number | null>(0);

  constructor(@Inject(DOCUMENT) private doc: Document) {}

  /*
   * @method
   * Start tracking a group of elements and emitting active elements; i.e. elements that are
   * currently visible in the viewport. If there was no other group being spied, start listening for
   * `resize` and `scroll` events.
   *
   * @param {Element[]} elements - A list of elements to track.
   *
   * @return {ScrollSpyInfo} - An object containing the following properties:
   *     - `active`: An observable of distinct ScrollItems.
   *     - `unspy`: A method to stop tracking this group of elements.
   */
  spyOn(elements: Element[]): ScrollSpyInfo {
    if (!this.spiedElementGroups.length) {
      this.resizeEvents.subscribe(() => this.onResize());
      this.scrollEvents.subscribe(() => this.onScroll());
      this.onResize();
    }

    const scrollTop = this.getScrollTop();
    const topOffset = this.getTopOffset();

    const spiedGroup = new ScrollSpiedElementGroup(elements);

    spiedGroup.calibrate(scrollTop, topOffset);

    // было в Angular, но неправильно высчитывалось lastMaxScrollTop при первом ините
    // и из-за этого некорректно работало
    // если будут проблемы при ините, разобраться с этим
    // const maxScrollTop = this.lastMaxScrollTop;
    // spiedGroup.onScroll(scrollTop, maxScrollTop);

    this.spiedElementGroups.push(spiedGroup);

    return {
      active: spiedGroup.activeScrollItem.asObservable().pipe(distinctUntilChanged()),
      unspy: () => this.unspy(spiedGroup)
    };
  }

  get scrollTopValue() {
    return this.scrollTopSubject;
  }

  private getContentHeight() {
    return this.doc.documentElement.scrollHeight || Number.MAX_SAFE_INTEGER;
  }

  private getScrollTop() {
    return (window && window.pageYOffset) || 0;
  }

  private getTopOffset() {
    return this.topOffset + 50;
  }

  private getViewportHeight() {
    return this.doc.documentElement.clientHeight || 0;
  }

  private get topOffset() {
    if (!this._topOffset) {
      const toolbar = this.doc.querySelector('.navbar');
      this._topOffset = ((toolbar && toolbar.clientHeight) || 0) + topMargin;
    }
    return this._topOffset;
  }

  /*
   * @method
   * The size of the window has changed. Re-calculate all affected values,
   * so that active elements can be determined efficiently on scroll.
   */
  private onResize() {
    const contentHeight = this.getContentHeight();
    const viewportHeight = this.getViewportHeight();
    const scrollTop = this.getScrollTop();
    const topOffset = this.getTopOffset();

    this.lastContentHeight = contentHeight;
    this.lastMaxScrollTop = contentHeight - viewportHeight;

    this.spiedElementGroups.forEach(group => group.calibrate(scrollTop, topOffset));
  }

  /*
   * @method
   * Determine which element for each ScrollSpiedElementGroup is active. If the content height has
   * changed since last check, re-calculate all affected values first.
   */
  private onScroll() {
    if (this.lastContentHeight !== this.getContentHeight()) {
      // Something has caused the scroll height to change.
      // (E.g. image downloaded, accordion expanded/collapsed etc.)
      this.onResize();
    }

    const scrollTop = this.getScrollTop();
    const maxScrollTop = this.lastMaxScrollTop;

    this.scrollTopSubject.next(scrollTop);

    this.spiedElementGroups.forEach(group => group.onScroll(scrollTop, maxScrollTop));
  }

  /*
   * @method
   * Stop tracking this group of elements and emitting active elements. If there is no other group
   * being spied, stop listening for `resize` or `scroll` events.
   *
   * @param {ScrollSpiedElementGroup} spiedGroup - The group to stop tracking.
   */
  private unspy(spiedGroup: ScrollSpiedElementGroup) {
    spiedGroup.activeScrollItem.complete();
    this.spiedElementGroups = this.spiedElementGroups.filter(group => group !== spiedGroup);

    if (!this.spiedElementGroups.length) {
      this.onStopListening.next();
    }
  }
}
