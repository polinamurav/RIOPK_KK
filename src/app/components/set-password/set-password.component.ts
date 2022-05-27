import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { environment } from '@env/environment';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html'
})
export class SetPasswordComponent implements OnInit, OnDestroy {
  version: string | null = environment.version;
  error: string | undefined;
  setPasswordForm!: FormGroup;
  isLoading = false;
  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {}

  ngOnDestroy() {}

  savePassword() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate([this.route.snapshot.queryParams.redirect || 'login'], { replaceUrl: true });
    }, 1000);
  }

  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    const newPassword = group.get('newPassword').value;
    const newPasswordAgain = group.get('newPasswordAgain').value;

    return newPassword === newPasswordAgain ? null : { notSame: true };
  }

  private createForm() {
    this.setPasswordForm = this.formBuilder.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(4)]],
        newPasswordAgain: ['', [Validators.required, Validators.minLength(4)]],
        remember: true
      },
      { validators: this.checkPasswords }
    );
  }
}
