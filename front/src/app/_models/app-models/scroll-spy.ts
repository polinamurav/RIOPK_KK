import { Observable, ReplaySubject } from 'rxjs';

export interface ScrollItem {
  element: Element;
  index: number;
}

export interface ScrollSpyInfo {
  active: Observable<ScrollItem | null>;
  unspy: () => void;
}

/*
 * Represents a "scroll-spied" element. Contains info and methods for determining whether this
 * element is the active one (i.e. whether it has been scrolled passed), based on the window's
 * scroll position.
 *
 * @prop {Element} element - The element whose position relative to the viewport is tracked.
 * @prop {number}  index   - The index of the element in the original list of element (group).
 * @prop {number}  top     - The `scrollTop` value at which this element becomes active.
 */
export class ScrollSpiedElement implements ScrollItem {
  top = 0;

  /*
   * @constructor
   * @param {Element} element - The element whose position relative to the viewport is tracked.
   * @param {number}  index   - The index of the element in the original list of element (group).
   */
  constructor(public readonly element: Element, public readonly index: number) {}

  /*
   * @method
   * Caclulate the `top` value, i.e. the value of the `scrollTop` property at which this element
   * becomes active. The current implementation assumes that window is the scroll-container.
   *
   * @param {number} scrollTop - How much is window currently scrolled (vertically).
   * @param {number} topOffset - The distance from the top at which the element becomes active.
   */
  calculateTop(scrollTop: number, topOffset: number) {
    this.top = scrollTop + this.element.getBoundingClientRect().top - topOffset;
  }
}

/*
 * Represents a group of "scroll-spied" elements. Contains info and methods for efficiently
 * determining which element should be considered "active", i.e. which element has been scrolled
 * passed the top of the viewport.
 *
 * @prop {Observable<ScrollItem | null>} activeScrollItem - An observable that emits ScrollItem
 *     elements (containing the HTML element and its original index) identifying the latest "active"
 *     element from a list of elements.
 */
export class ScrollSpiedElementGroup {
  activeScrollItem: ReplaySubject<ScrollItem | null> = new ReplaySubject(1);
  private spiedElements: ScrollSpiedElement[];

  /*
   * @constructor
   * @param {Element[]} elements - A list of elements whose position relative to the viewport will
   *     be tracked, in order to determine which one is "active" at any given moment.
   */
  constructor(elements: Element[]) {
    this.spiedElements = elements.map((elem, i) => new ScrollSpiedElement(elem, i));
  }

  /*
   * @method
   * Caclulate the `top` value of each ScrollSpiedElement of this group (based on te current
   * `scrollTop` and `topOffset` values), so that the active element can be later determined just by
   * comparing its `top` property with the then current `scrollTop`.
   *
   * @param {number} scrollTop - How much is window currently scrolled (vertically).
   * @param {number} topOffset - The distance from the top at which the element becomes active.
   */
  calibrate(scrollTop: number, topOffset: number) {
    this.spiedElements.forEach(spiedElem => spiedElem.calculateTop(scrollTop, topOffset));
    this.spiedElements.sort((a, b) => b.top - a.top); // Sort in descending `top` order.
  }

  /*
   * @method
   * Determine which element is the currently active one, i.e. the lower-most element that is
   * scrolled passed the top of the viewport (taking offsets into account) and emit it on
   * `activeScrollItem`.
   * If no element can be considered active, `null` is emitted instead.
   * If window is scrolled all the way to the bottom, then the lower-most element is considered
   * active even if it not scrolled passed the top of the viewport.
   *
   * @param {number} scrollTop    - How much is window currently scrolled (vertically).
   * @param {number} maxScrollTop - The maximum possible `scrollTop` (based on the viewport size).
   */
  onScroll(scrollTop: number, maxScrollTop: number) {
    let activeItem: ScrollItem | undefined;

    if (scrollTop + 1 >= maxScrollTop) {
      activeItem = this.spiedElements[0];
    } else {
      this.spiedElements.some(spiedElem => {
        if (spiedElem.top <= scrollTop) {
          activeItem = spiedElem;
          return true;
        }
        return false;
      });
    }

    this.activeScrollItem.next(activeItem || null);
  }
}
