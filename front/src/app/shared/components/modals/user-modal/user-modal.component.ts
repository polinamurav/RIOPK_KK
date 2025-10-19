import {ChangeDetectorRef, Component, EventEmitter, Inject, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {
  DirBranch,
  Directory,
  EInputType,
  IUserModalConfig,
  RoleDto,
  SystemDirectory,
  UserDto, UserPosDto,
  ValueType
} from '@app/_models';
import {DirBranchControllerService, DirDepartmentControllerService} from '@app/api';
import {UserControllerService} from '@app/api/user-controller.service';
import {DirPartner} from '@app/_models/api-models/dir-partner';
import {TranslateService} from '@ngx-translate/core';
import {ELanguage} from '@app/constants/language';
import {DirCompetenceLevel} from '@app/_models/api-models/dir-competence-level';
import {DirLevelsPmService} from '@app/api/dir-levels-pm.service';
import {map, tap} from 'rxjs/operators';
import {validateByPattern} from '@app/validators/validation-by-pattern';
import {InputErrorKeys} from '@app/constants/validators-errors';
import {
  DirTradingCompanyPointDto
} from "@app/pages/administration/administration-page/trading-company-points/model/dir-trading-company-point-dto";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-user-modal-content',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss', '../close-modal-btn.scss']
})
export class UserModalComponent implements OnInit, OnDestroy {
  clientForm: FormGroup;

  emitData: EventEmitter<UserDto> = new EventEmitter();

  disabledFields: boolean = true;

  showEditButtons: boolean = false;

  isDisableActivateDeactivateButton: boolean = false;

  // Для модального окна добавления пользователей. С этой настройкой передается showAdminModal = true
  showSendButton: boolean = false;

  activateDeactivateUserCallback: any;

  isActivateDeactivateBtn: boolean = true;

  showAdminModal: boolean = false;

  title: string = '';

  ELanguage = ELanguage;
  clientData: UserDto;
  currentUserData: UserDto;
  clientControls: { [key: string]: AbstractControl } | null = null;
  language: string = this.translateService.currentLang;
  ROLES: RoleDto[] = [];
  branches: DirBranch[] = [];
  competenceLevels: DirCompetenceLevel[] = [];
  partners: DirPartner[] = [];
  points: DirTradingCompanyPointDto[] = [];
  points$: Observable<DirTradingCompanyPointDto[]> = new BehaviorSubject<DirTradingCompanyPointDto[]>([]);
  departments: Directory[] = [];

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<UserModalComponent>,
    // TODO: исправить any
    @Inject(MAT_DIALOG_DATA) public data: IUserModalConfig,
    private branchService: DirBranchControllerService,
    private departmentService: DirDepartmentControllerService,
    private userService: UserControllerService,
    private dirLevelsPmService: DirLevelsPmService,
    private cd: ChangeDetectorRef,
    private translateService: TranslateService
  ) {
    if (!!this.data) {
      this.currentUserData = this.data.currentUserData;
      this.activateDeactivateUserCallback = this.data.activateDeactivateUser;
      this.isActivateDeactivateBtn = this.data.isActiveUser;
      this.showAdminModal = this.data.showAdminModal;
      this.showSendButton = this.data.showSendButton;
      this.title = this.data.title;

      if (this.data.partners) {
        this.partners = [{id: null, name: 'Очистить поле'}, ...this.data.partners];
      }

      if (this.data.points$) {
        this.points$ = this.data.points$.pipe(
          map(p => {
            return this.pointsNamesRemap(p)
          }),
          tap(points => {
            this.points = points;
          }));
      }

      if (!!this.data.clientData) {
        this.clientData = this.data.clientData;
      }

      if (!!this.data.userRoles) {
        this.ROLES = [...this.data.userRoles];
      }
    }

    if (!!this.showSendButton) {
      this.disabledFields = false;
    }
  }

  ngOnInit(): void {
    const controlRoleValue: number = this.getUserRole();

    const points = !!this.clientData ? this.pointsNamesRemap(this.clientData.points) : [];

    this.clientForm = this.fb.group({
      clientInfo: this.fb.group({
        username: [
          {value: !!this.clientData ? this.clientData.username : '', disabled: this.disabledFields},
          Validators.required
        ],
        lastName: [
          {value: !!this.clientData ? this.clientData.lastName : '', disabled: this.disabledFields},
          Validators.required
        ],
        firstName: [
          {value: !!this.clientData ? this.clientData.firstName : '', disabled: this.disabledFields},
          Validators.required
        ],
        patronymic: [{value: !!this.clientData ? this.clientData.patronymic : '', disabled: this.disabledFields}],
        usernameAbs: [{value: !!this.clientData ? this.clientData.usernameAbs : '', disabled: this.disabledFields}],
        email: [
          {value: !!this.clientData ? this.clientData.email : '', disabled: this.disabledFields},
          [
            Validators.required,
            validateByPattern(
              '^[a-zA-Z0-9_+-]([.a-zA-Z0-9_+-]*[a-zA-Z0-9_+-])?@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$',
              InputErrorKeys.EmailIncorrect
            )
          ]
        ],
        branchCode: [
          {
            value: !!this.clientData ? this.clientData.branchCode : '',
            disabled: this.disabledFields
          },
          Validators.required
        ],
        dirDepartment: [
          {
            value: !!this.clientData && !!this.clientData.dirDepartment ? this.clientData.dirDepartment.id : '',
            disabled: this.disabledFields
          }
        ],
        bossUser: [
          {
            value: !!this.clientData && !!this.clientData.bossUsername ? this.clientData.bossUsername : '',
            disabled: this.disabledFields
          }
        ],
        dirPartner: [
          {
            value: !!this.clientData && !!this.clientData.dirPartner ? this.clientData.dirPartner.id : '',
            disabled: this.disabledFields
          }
        ],
        created: [!!this.clientData ? new Date(this.clientData.created) : new Date()],
        changedByUsername: [this.currentUserData.username],
        updated: [new Date()],
        code: [!!this.clientData ? this.clientData.code : ''],
        deactivatedByUsername: [!!this.clientData ? this.clientData.deactivatedByUsername : null],
        deactivated: [!!this.clientData ? this.clientData.deactivated : null],
        active: [!!this.clientData ? this.clientData.active : true],
        id: [!!this.clientData ? this.clientData.id : null],
        authorities: this.fb.array(!!this.clientData ? [...this.clientData.authorities] : []),
        competenceLevels: this.fb.array(!!this.clientData ? [...this.clientData.competenceLevels] : []),
        points: this.fb.array(points)
      }),
      rolesControl: [controlRoleValue],
      competenceLevelsControl: [],
      pointsControl: [],
    });
    this.clientControls = (this.clientForm.controls.clientInfo as FormGroup).controls;

    this.branchService
      .getList()
      .pipe(tap(this.setBranch))
      .subscribe();
    this.dirLevelsPmService.getList().subscribe(this.setCompetenceLevels);
    this.departmentService.getList().subscribe(departments => (this.departments = departments));

    this.clientForm
      .get('clientInfo')
      .get('authorities')
      .valueChanges.pipe(tap(this.setValidatorCompetence))
      .subscribe();

  }

  get showTradingPoints() {
    const availableRoles = ['TT1_POS', 'TT2_POS'];
    const roles = this.clientForm.get('clientInfo').get('authorities').value as Array<RoleDto>;
    return roles.some(el => availableRoles.includes(el.authority));
  }

  get showCompetenceLevels() {
    const availableRoles = ['DECISION_MAKER', 'RM'];
    const roles = this.clientForm.get('clientInfo').get('authorities').value as Array<RoleDto>;
    return roles.some(el => availableRoles.includes(el.authority));
  }

  ngOnDestroy() {
  }

  cancel(){
    this.dialogRef.close();
  }

  selectionChange(id: number) {
    const roles: RoleDto[] = this.clientForm.get('clientInfo').get('authorities').value;
    const role = this.ROLES.find(item => id === item.id);
    if (id !== 0 && !!role && !roles.some(item => item.id === id)) {
      (this.clientForm.get('clientInfo').get('authorities') as FormArray).push(this.fb.control(role));
    }
  }

  competenceChange(id: number) {
    const levels: DirCompetenceLevel[] = this.clientForm.get('clientInfo').get('competenceLevels').value;
    const level = this.competenceLevels.find(item => id === item.id);
    if (id !== 0 && !!level && !levels.some(item => item.id === id)) {
      (this.clientForm.get('clientInfo').get('competenceLevels') as FormArray).push(this.fb.control(level));
    }
  }


  removeLevel(level: SystemDirectory) {
    const index = this.clientForm
      .get('clientInfo')
      .get('competenceLevels')
      .value.indexOf(level);
    (this.clientForm.get('clientInfo').get('competenceLevels') as FormArray).removeAt(index);
    const values = this.clientForm.get('clientInfo').get('competenceLevels').value as Array<any>;
    if (!values.length) {
      this.clientForm.get('competenceLevelsControl').reset();
    }
  }

  removeRole(role: SystemDirectory) {
    const index = this.clientForm
      .get('clientInfo')
      .get('authorities')
      .value.indexOf(role);

    (this.clientForm.get('clientInfo').get('authorities') as FormArray).removeAt(index);
    this.clearCompetenceLevels();

    if(!this.showTradingPoints) {
      (this.clientForm.get('clientInfo').get('points') as FormArray).clear();
    }

  }


  pointsChange(id: number) {
    const points = this.clientForm.get('clientInfo').get('points').value;

    const roles: RoleDto[] = this.clientForm.get('clientInfo').get('authorities').value;

    if (!this.pointsChangeValidator()) {
      return;
    }

    const point = this.points.find(item => id === item.id);
    if (id !== 0 && !!point && !points.some(item => item.id === id)) {
      (this.clientForm.get('clientInfo').get('points') as FormArray).push(this.fb.control(point));
    }
  }


  removePoints(level: SystemDirectory) {
    const index = this.clientForm
      .get('clientInfo')
      .get('points')
      .value.indexOf(level);
    (this.clientForm.get('clientInfo').get('points') as FormArray).removeAt(index);
    const values = this.clientForm.get('clientInfo').get('points').value as Array<any>;
    if (!values.length) {
      this.clientForm.get('pointsControl').reset();
    }
  }

  saveData() {
    if (!this.clientForm.valid) {
      return;
    }
    this.emitClientInfo();

    this.cancelButtonClick(false);
  }

  editButtonClick() {
    this.showEditButtons = true;
    this.disabledFields = false;
    this.disableFields();
  }

  cancelButtonClick(cancelChanges: boolean) {
    this.showEditButtons = false;
    if (this.disabledFields) {
      return;
    }

    this.disabledFields = true;
    this.disableFields();
    if (cancelChanges) {
      this.setInitialFormValues();
    }
  }

  activateDeactivateButtonClick(status: string) {
    this.isDisableActivateDeactivateButton = true;
    this.activateDeactivateUserCallback(status, (isActive: boolean) => {
      setTimeout(() => {
        this.isActivateDeactivateBtn = isActive;
        this.isDisableActivateDeactivateButton = false;
      }, 1000);
    });
  }

  sendButtonClick() {
    if (!this.clientForm.valid) {
      return;
    }
    this.emitClientInfo();

    this.clientForm.reset();
    this.dialogRef.close();
  }


  private pointsChangeValidator = () => {

    const points = this.clientForm.get('clientInfo').get('points').value;

    const roles: RoleDto[] = this.clientForm.get('clientInfo').get('authorities').value;

    return points.length >= 1 && roles.some(e => e.authority === 'TT1_POS') || !points.length;

  }

  private emitClientInfo() {
    const data = {
      ...this.clientForm.get('clientInfo').value,
      fio: `${this.clientForm.get('clientInfo').get('lastName').value} ${
        this.clientForm.get('clientInfo').get('firstName').value
      } ${
        this.clientForm.get('clientInfo').get('patronymic').value
          ? this.clientForm.get('clientInfo').get('patronymic').value
          : ''
      }`,
      dirPartner: this.getVal(this.clientForm.get('clientInfo').get('dirPartner').value),
      dirDepartment: this.getVal(this.clientForm.get('clientInfo').get('dirDepartment').value),
      bossUser: this.getVal(this.clientForm.get('clientInfo').get('bossUser').value),
      branchCode: this.getBranchCode()
    };

    data.fio = data.fio.replace(/^\s+|\s+$/g, '');

    this.emitData.emit(data as any);
  }


  private clearCompetenceLevels = (): void => {
    const roles = (this.clientForm.get('clientInfo').get('authorities') as FormArray).value as Array<RoleDto>;
    const rmRole = roles.find(el => el.authority === 'RM');
    if (!rmRole) {
      (this.clientForm.get('clientInfo').get('competenceLevels') as FormArray).clear();
    }
  };


  private getVal = (val: any): any => {
    return !!val ? {id: val} : null;
  };

  private getBranchCode = (): string => {
    const id = this.clientForm.get('clientInfo').get('branchCode').value;
    const branch = this.branches.find(el => el.id === id);
    return branch.code;
  };

  private setBranch = (branches: DirBranch[]): void => {
    this.branches = branches;
    const branch = branches.find(el => el.code === this.clientData.branchCode);
    this.clientForm
      .get('clientInfo')
      .get('branchCode')
      .setValue(branch ? branch.id : null);
  };

  private getUserRole() {
    if (this.clientData && this.clientData.authorities && this.clientData.authorities.length) {
      const role = this.ROLES.find(val => val.id === this.clientData.authorities[0].id);
      console.log('role' , role)
      return role ? role.id : 0;
    }
    return 0;
  }

  private setInitialFormValues() {
    this.setCompetenceLevels(this.clientData.competenceLevels);

    for (const control in this.clientControls) {
      if (control) {
        if (control === 'authorities') {
          (this.clientControls[control] as FormArray).clear();
          this.clientData.authorities.forEach(role => {
            (this.clientControls[control] as FormArray).push(this.fb.control(role));
          });
        } else if (control === 'competenceLevels') {
          (this.clientControls[control] as FormArray).clear();
          this.clientData.competenceLevels.forEach(level => {
            (this.clientControls[control] as FormArray).push(this.fb.control(level));
          });
          this.setCompetenceLevels(this.clientData.competenceLevels);
        } else {
          this.clientControls[control].setValue(this.clientData[control]);
        }
        if (control === 'dirDepartment') {
          this.clientControls[control].setValue(this.clientData[control] ? this.clientData[control].id : null);
        }
        if (control === 'branchCode') {
          const branchesId = this.branches.find(codeId => codeId.code === this.clientData[control]);
          this.clientControls[control].setValue(branchesId.id);
        }
      }
    }
  }

  private setCompetenceLevels = (data: DirCompetenceLevel[]): void => {
    this.competenceLevels = data;
    if (this.clientData && this.clientData.competenceLevels && this.clientData.competenceLevels.length) {
      const value = this.competenceLevels.find(val => val.id === this.clientData.competenceLevels[0].id).id;
      this.clientForm.get('competenceLevelsControl').setValue(value);
    }
  };

  private setValidatorCompetence = (): void => {
    if (this.showCompetenceLevels) {
      this.clientForm.get('competenceLevelsControl').setValidators([Validators.required]);
      this.clientForm.get('competenceLevelsControl').updateValueAndValidity();
    } else {
      this.clientForm.get('competenceLevelsControl').clearValidators();
      this.clientForm.get('competenceLevelsControl').updateValueAndValidity();
      this.clientForm.get('competenceLevelsControl').reset();
      if (this.clientForm.get('competenceLevels')) {
        this.clientForm.removeControl('competenceLevels');
      }
    }
  };

  private disableFields() {
    if (!this.disabledFields) {
      this.clientForm.get('clientInfo').enable();
    } else {
      this.clientForm.get('clientInfo').disable();
    }
  }

  private pointsNamesRemap = (points: DirTradingCompanyPointDto[]): DirTradingCompanyPointDto[] => {
    return points && points.length ? points.map(pt => ({
      ...pt,
      nameAm: `${pt.code} ` + pt.nameAm + ` ${pt.address}`,
      nameRu: `${pt.code} ` +  pt.nameRu + ` ${pt.address}`,
    })) : [];
  }

  protected readonly ValueType = ValueType;
  protected readonly EInputType = EInputType;
}
