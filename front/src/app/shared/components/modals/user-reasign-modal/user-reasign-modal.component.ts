import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthState, TableDataHeader, TableData, ResignDto } from '@app/_models';
import { ApplicationControllerService } from '@app/api';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastService } from '@app/services/toast.service';

@Component({
  selector: 'app-user-reasign-modal',
  templateUrl: './user-reasign-modal.component.html',
  styleUrls: ['./user-reasign-modal.component.scss']
})
export class UserReasignModalComponent {
  objColNameProps: TableDataHeader[] = [
    new TableDataHeader('fio', 'ФИО', 'string', 'fio'),
    new TableDataHeader('userReassignment', 'ПЕРЕНАЗНАЧИТЬ', 'userReassignment', 'userReassignment')
  ];
  dataSource: TableData<AuthState> = new TableData(this.objColNameProps, []);
  applicationId: string | number;
  reassignRole: string;

  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dialogRef: MatDialogRef<UserReasignModalComponent>,
    private toastService: ToastService,
    private appService: ApplicationControllerService,
    @Inject(MAT_DIALOG_DATA)
    public data: { dependents: AuthState[]; applicationId: string | number; reassignRole: string }
  ) {
    if (!!data && !!data.dependents && !!data.dependents.length) {
      this.dataSource = new TableData(this.objColNameProps, data.dependents);
    }

    if (!!data && !!data.applicationId) {
      this.applicationId = data.applicationId;
    }

    if (!!data && !!data.reassignRole) {
      this.reassignRole = data.reassignRole;
    }
  }

  onReasignEvent(ev: { row: AuthState; col: string }) {
    this.appService
      .resign(this.applicationId, ev.row.id, this.reassignRole)
      .pipe(takeUntil(this.destroy))
      .subscribe((res: ResignDto) => {
        if (res.statusCode !== 0) {
          this.toastService.viewMsg(res.statusDesc, 'warning');
        } else {
          this.toastService.viewMsg('Заявка успешно переназначена', 'success');
          this.dialogRef.close('SUCCESS');
        }
      });
  }
}
