import * as textMask from 'vanilla-text-mask/dist/vanillaTextMask.js';
import { Directive, ElementRef, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appTextMask]'
})
export class TextMaskDirective implements OnInit, OnDestroy {
  @HostBinding('class.fed-mask') compClass = true;
  @Input()
  fedMask: any = {
    mask: null,
    showMask: false,
    guide: true,
    keepCharPositions: true,
    placeholderChar: '_'
  };

  maskedInputController: any;
  constructor(private element: ElementRef) {}
  ngOnInit(): void {
    this.maskedInputController = textMask.maskInput({
      inputElement: this.element.nativeElement,
      ...this.fedMask
    });
  }
  ngOnDestroy() {
    this.maskedInputController.destroy();
  }
}
