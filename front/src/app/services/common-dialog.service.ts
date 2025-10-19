import { Injectable } from '@angular/core';
import {
  AdministrationBaseModalComponent,
  AdministrationBaseModalData
} from '@app/shared/components/modals/administration-base-modal/administration-base-modal.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

export interface BaseModalConfig {
  width?: string;
  height?: string;
  panelClass?: string;
}

const INIT_MODAL_CONFIG = {
  width: '50%',
  height: '70%',
  panelClass: 'custom-panel-cls'
};

@Injectable({
  providedIn: 'root'
})
export class CommonDialogService {
  private destroy$ = new Subject();

  constructor(private dialog: MatDialog) {}

  showDialog(
    data: AdministrationBaseModalData<any, any>,
    callback: (data: any) => void,
    modalConfig?: BaseModalConfig
  ) {
    modalConfig = {
      ...INIT_MODAL_CONFIG,
      ...modalConfig
    };

    const dialogRef = this.dialog.open(AdministrationBaseModalComponent, {
      ...modalConfig,
      data
    });
    dialogRef.componentInstance.emitData.pipe(takeUntil(this.destroy$)).subscribe(callback);
  }
}
