import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ScrollSpyService } from './scroll-spy.service';
import { ScrollSpyInfo } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class TocService {
  activeItemIndex = new ReplaySubject<number | null>(1);
  private scrollSpyInfo: ScrollSpyInfo | null = null;

  constructor(private scrollSpyService: ScrollSpyService) {}

  genToc(docElement: Element) {
    this.resetScrollSpyInfo();

    const headings = this.findTocHeadings(docElement);

    this.scrollSpyInfo = this.scrollSpyService.spyOn(headings);
    this.scrollSpyInfo.active.subscribe(item => this.activeItemIndex.next(item && item.index));
  }

  public resetScrollSpyInfo() {
    if (this.scrollSpyInfo) {
      this.scrollSpyInfo.unspy();
      this.scrollSpyInfo = null;
    }

    this.activeItemIndex.next(null);
  }

  private findTocHeadings(docElement: Element): HTMLDivElement[] {
    // 'div.header-info' - is top elem of a block for scrolling:
    const headings = querySelectorAll<HTMLDivElement>(docElement, 'div.header-info');

    return headings;
  }
}

// Helpers
function querySelectorAll<K extends keyof HTMLElementTagNameMap>(
  parent: Element,
  selector: K
): HTMLElementTagNameMap[K][];
function querySelectorAll<K extends keyof SVGElementTagNameMap>(
  parent: Element,
  selector: K
): SVGElementTagNameMap[K][];
function querySelectorAll<E extends Element = Element>(parent: Element, selector: string): E[];
function querySelectorAll(parent: Element, selector: string) {
  // Wrap the `NodeList` as a regular `Array` to have access to array methods.
  // NOTE: IE11 does not even support some methods of `NodeList`, such as
  //       [NodeList#forEach()](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach).
  return Array.from(parent.querySelectorAll(selector));
}
