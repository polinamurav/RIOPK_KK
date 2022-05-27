import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from '@app/services/user.service';

@Directive({
  selector: '[appCheckPermission]'
})
export class CheckPermissionDirective implements OnInit {
  private _accessWord: string;

  @Input('appCheckPermission') set appCheckPermission(accessWord: string) {
    this._accessWord = accessWord;
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.checkPermissions();
  }

  private checkPermissions() {
    this.viewContainerRef.clear();
    if (this.userService.checkAccess(this._accessWord)) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
}
