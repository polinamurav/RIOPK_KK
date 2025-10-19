import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { TableDataHeader } from '@app/_models';
import { MatMenuTrigger } from '@angular/material/menu';
import { TranslateService } from '@ngx-translate/core';
import { ELanguageType } from '@app/constants/language';

export interface TableFilterMenuOption {
  label: string;
  value: any;
  name?: string;
  valueBoolean?: string;
}

const BOOLEAN_OPTIONS: TableFilterMenuOption[] = [
  { name: 'Buttons.Yes', label: 'Buttons.Yes', value: true },
  { name: 'Buttons.No', label: 'Buttons.No', value: false }
];

@Component({
  selector: 'app-table-drop-menu',
  templateUrl: './table-drop-menu.component.html',
  styleUrls: ['./table-drop-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableDropMenuComponent implements OnInit, OnChanges {
  @ViewChild(MatMenuTrigger, { static: false }) public menuTrigger: MatMenuTrigger;

  @Input() list: string[];
  @Input() selected: any;
  @Input() isBooleanFilter: boolean;
  @Input() column: TableDataHeader;
  @Output() toggleFilter = new EventEmitter();
  @Input() language: string;

  menuList: TableFilterMenuOption[] = [];

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.prepareMenu();
  }

  getTranslate(label: string) {
    return this.isBooleanFilter ? this.translateService.instant(label) : label;
  }

  private prepareMenu = (): void => {
    if (this.list) {
      this.menuList = [];
      if (!this.isBooleanFilter) {
        this.list.forEach(elem => {
          if (typeof elem === 'object') {
            const el = elem as any;
            this.menuList.push({
              label: el[ELanguageType[this.language]],
              value: el.id
            });
          } else {
            this.menuList.push({
              label: elem,
              value: elem
            });
          }
        });
      }
    }
    if (this.isBooleanFilter) {
      this.menuList = BOOLEAN_OPTIONS;
    }
  };
}
