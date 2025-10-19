import { Component } from '@angular/core';
import { config } from '../../../../assets/configurations/configurationFile.js';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import {VersionCheckerService} from "@app/core/version-checker.service";

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss']
})
export class LoginContainerComponent {
  // version: string = config.version;
  currentTheme = 'default';

  constructor(
    private translateService: TranslateService,
    private versionCheckerService: VersionCheckerService,
    private titleService: Title) {}

  get currentLanguage(): string {
    return this.translateService.currentLang;
  }

  get languages(): string[] {
    return this.translateService.langs;
  }

  get version(){
    return this.versionCheckerService.version;
  }

  setLanguage(language: string) {
    this.translateService.use(language);
  }
}
