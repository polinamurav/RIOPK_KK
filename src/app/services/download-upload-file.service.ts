import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UploadModalComponent } from '@app/shared/modals/upload-modal/upload-modal.component';
import { ModalData } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class DownloadUploadFileService {
  constructor(private dialog: MatDialog) {}

  openDialog(data: ModalData) {
    return this.dialog.open(UploadModalComponent, {
      height: 'auto',
      width: '532px',
      data
    });
  }

  downloadFile(resp: Blob, fileName: string) {
    const a: HTMLAnchorElement = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = URL.createObjectURL(new Blob([resp]));
    a.download = fileName;
    a.click();
  }
}
