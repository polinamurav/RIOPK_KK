import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadModalComponent } from '@app/shared/components/modals/upload-modal/upload-modal.component';
import { ModalData } from '@app/_models';
import { HttpResponse } from '@angular/common/http';
import { saveAs } from 'file-saver';

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

  saveFileAsBinary(res: HttpResponse<Blob>) {
    const fileName = DownloadUploadFileService.getFileNameFromResponseContentDisposition(res);
    const decodedFileName = decodeURI(fileName).replace(/ %2F /g, '/');
    if (res.body) {
      saveAs(res.body, decodedFileName);
    } else {
      throw new Error('File not save, response body is empty');
    }
  }

  saveFileFromBase64(base64: string, fileName: string) {
    const blob = DownloadUploadFileService.base64toBlob(base64);
    this.downloadFile(blob, fileName);
  }

  private static getFileNameFromResponseContentDisposition(res: HttpResponse<Blob>) {
    const contentDisposition = res.headers.get('content-disposition') || '';
    if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(contentDisposition);
      if (matches != null && matches[1]) {
        return matches[1].replace(/['"]/g, '');
      }
    } else {
      return 'untitled';
    }
  }

  private static base64toBlob(dataURI: string) {
    const byteString = atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([int8Array]);
  }
}
