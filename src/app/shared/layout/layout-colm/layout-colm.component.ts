import { Component, Input, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-layout-colm',
  templateUrl: './layout-colm.component.html',
  styleUrls: ['./layout-colm.component.scss']
})
export class LayoutСolmComponent implements OnInit {
  @Input() size: 'small' | 'small-link' | 'medium' | 'medium-right' | 'big' | 'big-link' | 'dashoard' = 'big';

  @HostBinding('class') classes: string;

  ngOnInit(): void {
    this.classes = 'size-' + this.size;
  }
}
