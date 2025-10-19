import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-simply-modal-wrapper',
  templateUrl: './simply-modal-wrapper.component.html',
  styleUrls: ['./simply-modal-wrapper.component.scss']
})
export class SimplyModalWrapperComponent implements OnInit {
  @Input() actionButtonName: string = 'Да';
  @Input() cancelButtonName: string = 'Нет';
  @Input() withActionButton: boolean;

  constructor() {}

  ngOnInit() {}
}
