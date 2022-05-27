import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  DashboardTasksResetFilterAction,
  DashboardTasksResetSearchAction,
  QueuesTasksResetFilterAction,
  QueuesTasksResetSearchAction
} from '@app/store/actions/tasks-filter.actions';
import { Logout, UpdateCurrentUser } from '@app/store/actions/auth.actions';
import { RoleDto, UserDto } from '@app/_models';
import { Store, select } from '@ngrx/store';
import { selectUserData, selectUserName } from '@app/store/selectors/auth.selector';

import { AuthenticationRestController } from '@app/api';
import { AuthenticationService } from '@app/services/authentication';
import { ClientModalComponent } from '@app/shared/modals/client-modal/client-modal.component';
import { DirPartner } from '@app/_models/api-models/dir-partner';
import { DirPartnerService } from '@app/api/massegment-api/dir-partner.service';
import { ELanguage } from '@app/constants/language';
import { IAppState } from '@app/store/state/app.state';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TABS_TITLES } from '@app/components/constants/tab-titles';
import { TranslateService } from '@ngx-translate/core';
import { UserControllerService } from '@app/api/user-controller.service';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  menuHidden = true;
  url: string;
  defaultUrl: string = '../../../assets/about.png';
  userName$ = this._store.pipe(select(selectUserName));
  selectUserData$ = this._store.pipe(select(selectUserData));

  userData: UserDto;
  userRoles: RoleDto[];
  isAdmin: boolean = false;
  isAnalyst: boolean = false;
  isUnder: boolean = false;
  isAuditor: boolean = false;
  isRiskBoss: boolean = false;
  isCallCenterBoss: boolean = false;

  isQueueVisible: boolean = false;
  isLanguageToggleVisible: boolean = false;
  ELanguage = ELanguage;
  TabTitles = TABS_TITLES;
  partners: DirPartner[];

  constructor(
    private _store: Store<IAppState>,
    private dialog: MatDialog,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userControllerService: UserControllerService,
    private authRestService: AuthenticationRestController,
    private dirPartnerService: DirPartnerService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.selectUserData$.pipe(untilDestroyed(this)).subscribe(userData => {
      this.userData = userData;
    });

    this.userControllerService.getUserRoles().subscribe(roles => {
      this.userRoles = roles;
    });

    this.dirPartnerService.getPartnersList().subscribe(partners => {
      this.partners = partners;
    });
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  logout() {
    // to revoke token and session:
    this.authRestService.revokeToken().subscribe(resp => {});

    this.authenticationService.logout();
    this._store.dispatch(Logout({}));

    this._store.dispatch(DashboardTasksResetFilterAction());
    this._store.dispatch(DashboardTasksResetSearchAction());
    this._store.dispatch(QueuesTasksResetFilterAction());
    this._store.dispatch(QueuesTasksResetSearchAction());

    this.router.navigate(['/login'], { replaceUrl: true });
  }

  openClientDialog() {
    const dialogRef = this.dialog.open(ClientModalComponent, {
      width: '600px',
      height: '60%',
      // required class set parent block position relative
      panelClass: 'custom-panel-cls',
      data: {
        partners: this.partners,
        userRoles: this.userRoles,
        currentUserData: this.userData,
        showAdminModal: false,
        clientData: this.userData
      }
    });

    dialogRef.componentInstance.emitData.pipe(untilDestroyed(this)).subscribe(data => {
      this._store.dispatch(UpdateCurrentUser({ data }));
    });
  }

  get currentLanguage(): string {
    return this.translateService.currentLang;
  }

  get languages(): string[] {
    return this.translateService.langs;
  }

  setLanguage(language: string) {
    this.translateService.use(language);
  }

  ngOnDestroy(): void {}
}
