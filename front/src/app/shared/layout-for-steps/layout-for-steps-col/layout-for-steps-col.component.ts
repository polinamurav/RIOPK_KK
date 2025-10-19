import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-layout-for-steps-col',
  templateUrl: './layout-for-steps-col.component.html',
  styleUrls: ['./layout-for-steps-col.component.scss']
})
export class LayoutForStepsColComponent {
  @Input() subHeaderNumb: number = 0;
  @Input() subHeaderText: string = '';
}
