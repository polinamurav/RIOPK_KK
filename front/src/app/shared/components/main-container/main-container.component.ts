import { Component } from '@angular/core';
import { config } from '../../../assets/configurations/configurationFile.js';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent {
  version: string = config.version;
}
