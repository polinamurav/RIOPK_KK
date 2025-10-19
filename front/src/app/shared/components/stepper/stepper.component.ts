import { Component, Input, OnInit, Inject, AfterViewInit, OnDestroy } from '@angular/core';
import { ProgressBar, SystemDirectory } from '@app/_models';
import { DOCUMENT } from '@angular/common';
import { ELanguage } from '@app/constants/language';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { untilDestroyed } from '@app/core';
import { getLangNameCol } from '@app/services/util/getLangNameCol';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit, AfterViewInit, OnDestroy {
  transformedArray: ProgressBar[] = [];
  language: string = this.translateService.currentLang;
  ELanguage = ELanguage;

  @Input() barList: ProgressBar[] = [];
  @Input() currentStage: SystemDirectory;

  constructor(@Inject(DOCUMENT) private doc: Document, private translateService: TranslateService) {}

  ngOnInit() {
    this.createLanguageSubscription();
    if (!!this.barList.length) {
      this.transformStagesArr(this.barList);
    }
  }

  ngOnDestroy(): void {}

  ngAfterViewInit() {
    const scrollToCurElem = document.getElementById(this.currentStage.id.toString());
    if (!!scrollToCurElem) {
      scrollToCurElem.scrollIntoView({
        block: 'center'
      });
    }
  }

  private createLanguageSubscription() {
    this.translateService.onLangChange.pipe(untilDestroyed(this)).subscribe((lang: LangChangeEvent) => {
      this.language = lang.lang;
    });
  }

  private transformStagesArr(arr: ProgressBar[]) {
    const copyArr = [...arr];
    this.transformedArray = copyArr.map((el, ind) => {
      el.isCurrent = this.currentStage.id === el.stage.id;

      if (!!el.isPassed) {
        for (let i = 0; i <= ind; i++) {
          copyArr[i].isHorizontalLineBlue = true;
        }
      }

      return el;
    });
  }

  getLangNameCol(obj: any) {
    return getLangNameCol(this.language, obj);
  }
}
