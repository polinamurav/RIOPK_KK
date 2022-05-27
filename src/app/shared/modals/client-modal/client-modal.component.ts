import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RoleDto, IUserModalConfig, UserDto, SystemDirectory, Directory, DirBranch } from '@app/_models';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DirBranchControllerService, DirDepartmentControllerService } from '@app/api';
import { UserControllerService } from '@app/api/user-controller.service';
import { DirPartner } from '@app/_models/api-models/dir-partner';
import { TranslateService } from '@ngx-translate/core';
import { ELanguage } from '@app/constants/language';

@Component({
  selector: 'app-client-modal-content',
  templateUrl: './client-modal.component.html',
  styleUrls: ['./client-modal.component.scss', '../close-modal-btn.scss']
})
export class ClientModalComponent implements OnInit, OnDestroy {
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
  partners: DirPartner[] = [];
  departments: Directory[] = [];
  usersBoss: UserDto[] = [];

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<ClientModalComponent>,
    // TODO: исправить any
    @Inject(MAT_DIALOG_DATA) public data: IUserModalConfig,
    private branchService: DirBranchControllerService,
    private departmentService: DirDepartmentControllerService,
    private userService: UserControllerService,
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
        this.partners = [{ id: null, name: 'Не выбрано' }, ...this.data.partners];
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
    const controlValue: number = this.getUserRole();
    this.clientForm = this.fb.group({
      clientInfo: this.fb.group({
        username: [
          { value: !!this.clientData ? this.clientData.username : '', disabled: this.disabledFields },
          Validators.required
        ],
        lastName: [
          { value: !!this.clientData ? this.clientData.lastName : '', disabled: this.disabledFields },
          Validators.required
        ],
        firstName: [
          { value: !!this.clientData ? this.clientData.firstName : '', disabled: this.disabledFields },
          Validators.required
        ],
        patronymic: [
          { value: !!this.clientData ? this.clientData.patronymic : '', disabled: this.disabledFields }
        ],
        usernameAbs: [{ value: !!this.clientData ? this.clientData.usernameAbs : '', disabled: this.disabledFields }],
        email: [
          { value: !!this.clientData ? this.clientData.email : '', disabled: this.disabledFields },
          Validators.required
        ],
        dirBranch: [
          {
            value: !!this.clientData && !!this.clientData.dirBranch ? this.clientData.dirBranch.id : '',
            disabled: this.disabledFields
          },
          Validators.required
        ],
        dirDepartment: [
          {
            value: !!this.clientData && !!this.clientData.dirDepartment ? this.clientData.dirDepartment.id : '',
            disabled: this.disabledFields
          },
          Validators.required
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
        authorities: this.fb.array(!!this.clientData ? [...this.clientData.authorities] : [])
      }),
      rolesControl: [controlValue]
    });
    this.clientControls = (this.clientForm.controls.clientInfo as FormGroup).controls;

    this.branchService.getList().subscribe(brances => (this.branches = brances));
    this.departmentService.getList().subscribe(departments => (this.departments = departments));
    this.userService.getUsersBoss().subscribe(boss => (this.usersBoss = boss));
  }

  ngOnDestroy() {}

  selectionChange(id: number) {
    const roles: RoleDto[] = this.clientForm.get('clientInfo').get('authorities').value;
    const role = this.ROLES.find(item => id === item.id);
    if (id !== 0 && !!role && !roles.some(item => item.id === id)) {
      (this.clientForm.get('clientInfo').get('authorities') as FormArray).push(this.fb.control(role));
    }
  }

  removeRole(role: SystemDirectory) {
    const index = this.clientForm
      .get('clientInfo')
      .get('authorities')
      .value.indexOf(role);

    (this.clientForm.get('clientInfo').get('authorities') as FormArray).removeAt(index);
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

  private emitClientInfo() {
    this.emitData.emit({
      ...this.clientForm.get('clientInfo').value,
      fio: `${this.clientForm.get('clientInfo').get('lastName').value} ${
        this.clientForm.get('clientInfo').get('firstName').value
      } ${this.clientForm.get('clientInfo').get('patronymic').value}`,
      dirBranch: { id: this.clientForm.get('clientInfo').get('dirBranch').value },
      dirPartner: { id: this.clientForm.get('clientInfo').get('dirPartner').value },
      dirDepartment: { id: this.clientForm.get('clientInfo').get('dirDepartment').value },
      bossUser: { id: this.clientForm.get('clientInfo').get('bossUser').value }
    });
  }

  private getUserRole() {
    if (this.clientData && this.clientData.authorities && this.clientData.authorities.length) {
      return this.ROLES.find(val => val.id === this.clientData.authorities[0].id).id;
    }
    return 0;
  }

  private setInitialFormValues() {
    for (const control in this.clientControls) {
      if (control) {
        if (control !== 'authorities') {
          this.clientControls[control].setValue(this.clientData[control]);
        } else {
          (this.clientControls[control] as FormArray).clear();
          this.clientData.authorities.forEach(role => {
            (this.clientControls[control] as FormArray).push(this.fb.control(role));
          });
        }
      }
    }
  }

  private disableFields() {
    if (!this.disabledFields) {
      this.clientForm.get('clientInfo').enable();
    } else {
      this.clientForm.get('clientInfo').disable();
    }
  }
}
