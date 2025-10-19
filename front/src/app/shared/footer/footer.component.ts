import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NbThemeService } from '@nebular/theme';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { I18nService } from '@app/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'ngx-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  private destroy$: Subject<void> = new Subject<void>();
  public readonly materialTheme$: Observable<boolean>;
  themes = [
    {
      value: 'default',
      name: 'Light'
    },
    {
      value: 'dark',
      name: 'Dark'
    }
  ];

  currentTheme = 'default';

  constructor(
    private themeService: NbThemeService,
    private translateService: TranslateService,
    private titleService: Title
  ) {
    this.materialTheme$ = this.themeService.onThemeChange().pipe(
      map(theme => {
        const themeName: string = theme.name || '';
        return themeName.startsWith('material');
      })
    );
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.themeService
      .onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$)
      )
      .subscribe(themeName => {
        this.currentTheme = themeName;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get currentLanguage(): string {
    return this.translateService.currentLang;
  }

  get languages(): string[] {
    return this.translateService.langs;
  }

  setLanguage(language: string) {
    this.translateService.use(language);
    this.titleService.setTitle(this.translateService.instant('PageTitle'));
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }
}
