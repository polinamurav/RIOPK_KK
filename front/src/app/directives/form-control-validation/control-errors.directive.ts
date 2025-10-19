import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Host,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  ViewContainerRef
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { ControlErrorComponent } from './control-error/control-error.component';
import { ControlErrorContainerDirective } from './control-error-container.directive';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { untilDestroyed } from '@app/core';
import { FormSubmitDirective } from './form-submit.directive';
import { FORM_ERRORS } from './form-errors';
import { TranslateService } from '@ngx-translate/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[formControl], [formControlName]'
})
export class ControlErrorsDirective implements OnInit, OnDestroy {
  ref: ComponentRef<ControlErrorComponent>;
  container: ViewContainerRef;
  submit$: Observable<boolean>;
  valueChange$: Subscription;
  translation$: Subscription;
  onLangChange$: Subscription;

  @Input() customErrors = {};

  constructor(
    private vcr: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private translateService: TranslateService,
    @Optional() controlErrorContainer: ControlErrorContainerDirective,
    @Inject(FORM_ERRORS) private errors: any,
    // @Inject(AZ_FORM_ERRORS) private AzErrors: any,

    @Optional() @Host() private form: FormSubmitDirective,
    private controlDir: NgControl
  ) {
    this.container = controlErrorContainer ? controlErrorContainer.vcr : vcr;
    this.submit$ = this.form ? this.form.submit$ : EMPTY;
  }

  ngOnInit(): void {
    this.submit$.pipe(untilDestroyed(this)).subscribe(isInValid => {
      if (isInValid) {
        this.valueChange$ = this.control.valueChanges.subscribe(_ => {
          this.checkControlError();
        });

        this.onLangChange$ = this.translateService.onLangChange.pipe(untilDestroyed(this)).subscribe(() => {
          this.checkControlError();
        });

        this.checkControlError();
      } else {
        if (this.valueChange$) {
          this.valueChange$.unsubscribe();
        }

        if (this.valueChange$) {
          this.onLangChange$.unsubscribe();
        }

        this.setError(null);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.valueChange$) {
      this.valueChange$.unsubscribe();
    }
    if (this.translation$) {
      this.translation$.unsubscribe();
    }

    if (this.onLangChange$) {
      this.onLangChange$.unsubscribe();
    }
  }

  get control() {
    return this.controlDir.control;
  }

  setError(text: string): void {
    if (!this.ref) {
      const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
      this.ref = this.container.createComponent(factory);
    }

    this.ref.instance.text = text;
  }

  private checkControlError(): void {
    const controlErrors = this.control.errors;
    if (controlErrors) {
      const firstKey = Object.keys(controlErrors)[0];
      const getError = this.errors[firstKey];
      const text = this.customErrors[firstKey] || getError(controlErrors[firstKey]).message;
      const params = getError(controlErrors[firstKey]).params;

      this.translation$ = this.translateService.get(text, params).subscribe((res: string) => {
        this.setError(res);
      });
    } else if (this.ref) {
      this.setError(null);
    }
  }
}
