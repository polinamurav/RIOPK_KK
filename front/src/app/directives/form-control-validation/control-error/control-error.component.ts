import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-control-error',
  template: `
    <p class="help is-danger error-color" [class.hide]="_hide">{{ _text | translate }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./control-error.component.scss']
})
export class ControlErrorComponent implements OnInit {
  _text: any;
  _hide = true;

  @Input() set text(value: any) {
    if (value !== this._text) {
      this._text = value;
      this._hide = !value;
      // this.cdr.detectChanges();
      if (!(this.cdr as any).destroyed) {
        this.cdr.detectChanges();
      }
    }
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {}
}
