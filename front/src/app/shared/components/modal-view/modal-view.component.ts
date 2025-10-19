import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.component.html',
  styleUrls: ['./modal-view.component.scss']
})
export class ModalViewComponent implements OnInit {
  @Input() title: string;
  @Input() loading: boolean;
  @Input() showClose: boolean = true;
  @Input() showClass: string;

  constructor() {}

  ngOnInit() {}
}
