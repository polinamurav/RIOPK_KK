import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, switchMap, takeUntil } from 'rxjs/operators';
import { environment } from '@env/environment';
import { I18nService } from '@app/core';
import { Fingerprint2Service } from '@app/services/fingerprint2.service';
import { of, Subject } from 'rxjs';
import { IAppState } from '@app/store/state/app.state';
import { select, Store } from '@ngrx/store';
import { selectIsLoading, formIsValid } from '@app/store/selectors/auth.selector';
import { FormValidation, Login } from '@app/store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm: FormGroup;
  isLoading$ = this._store.pipe(select(selectIsLoading));
  isFormValid$ = this._store.pipe(select(formIsValid));
  isInvalid: boolean = false;

  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private fingerprint2Service: Fingerprint2Service,
    private _store: Store<IAppState>
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.isFormValid$.pipe(takeUntil(this.destroy)).subscribe(v => {
      this.isInvalid = v;
    });

    this.loginForm.valueChanges.pipe(takeUntil(this.destroy)).subscribe(() => {
      if (this.isInvalid) {
        this._store.dispatch(FormValidation({ data: { isInvalid: false } }));
      }
    });
  }

  login(e: Event) {
    if (this.loginForm.invalid) {
      return;
    }

    e.preventDefault();
    this.fingerprint2Service
      .getHash()
      .pipe(
        switchMap(fingerPrint => {
          this._store.dispatch(Login({ data: { loginForm: this.loginForm.value, fingerPrint } }));
          return of(false);
        }),
        finalize(() => {
          this.loginForm.markAsPristine();
        })
      )
      .subscribe();
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  ngOnDestroy() {}

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
