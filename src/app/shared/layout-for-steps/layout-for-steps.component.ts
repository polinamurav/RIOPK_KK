import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-layout-for-steps',
  templateUrl: './layout-for-steps.component.html',
  styleUrls: ['./layout-for-steps.component.scss']
})
export class LayoutForStepsComponent {
  toggleBtnName: 'РАЗВЕРНУТЬ' | 'СВЕРНУТЬ' = 'СВЕРНУТЬ';
  isNeedRotateArr: boolean = false;

  @Input() headerNumb: number;
  @Input() headerText: number | string;
  @Input() isNotAccordion: boolean = false;
  @Input() isPanelDescHidden: boolean = false;

  onToggleBtnClick() {
    if (this.toggleBtnName === 'РАЗВЕРНУТЬ') {
      this.toggleBtnName = 'СВЕРНУТЬ';
      this.isNeedRotateArr = false;
    } else {
      this.toggleBtnName = 'РАЗВЕРНУТЬ';
      this.isNeedRotateArr = true;
    }
  }
}
