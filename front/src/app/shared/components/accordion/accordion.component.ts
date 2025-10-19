import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit, AfterViewInit {
  @Input() panelDescription: string = '';
  @Input() panelTitle: string = 'Change password';
  @Output() openClosedPanel: EventEmitter<{ isOpenPanel: boolean; panel: MatExpansionPanel }> = new EventEmitter();

  panelOpenState: boolean = false;
  disableAnimation: boolean = true;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.disableAnimation = false;
    }, 0);
  }

  onOpenPanel(isOpenPanel: boolean, panel: MatExpansionPanel) {
    this.panelOpenState = isOpenPanel;
    this.openClosedPanel.emit({ isOpenPanel, panel });
  }
}
