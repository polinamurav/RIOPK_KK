import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appFormSubTitle]'
})
export class FormSubTitleDirective implements OnInit {
  private controlName: string;
  private formSubTitles: { [key: string]: string } = {};

  @Input() set appFormSubTitle(data: [string, { [key: string]: string }]) {
    this.controlName = data[0];
    this.formSubTitles = { ...data[1] };
  }

  constructor(private template: TemplateRef<any>, private view: ViewContainerRef) {}

  get element() {
    return this.template.elementRef.nativeElement;
  }

  ngOnInit() {
    this.setTitle();
  }

  private setTitle() {
    if (this.isTitleExist(this.formSubTitles, this.controlName)) {
      this.view.createEmbeddedView(this.template);
    }
  }

  private isTitleExist(options: { [key: string]: string }, name: string): boolean {
    return options.hasOwnProperty(name);
  }
}
