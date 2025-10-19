import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

type AttachmentsObjFields = 'attachmentName' | 'attachmentPages';

@Injectable({
  providedIn: 'root'
})
export class UploadAttachmentListenerService {
  uploadedPhotoTransferSource = new Subject<string>();
  uploadedPhoto$ = this.uploadedPhotoTransferSource.asObservable();

  uploadPhotoTransferEvent = new Subject<boolean>();
  uploadPhotoEvent$ = this.uploadPhotoTransferEvent.asObservable();

  private _attachmentNumberOfPages: Array<Record<AttachmentsObjFields, string | number>> = [];

  private _isAttachmentLoading = false;

  public getAttachmentNumberOfPages(): Array<Record<AttachmentsObjFields, string | number>> {
    return this._attachmentNumberOfPages;
  }

  isAttachmentValidByPages(attachmentType: string, expectedNumbersOfPages: number): boolean {
    let isAttachmentValid = false;

    this._attachmentNumberOfPages.forEach((attachmentRecord: Record<AttachmentsObjFields, string | number>) => {
      if (
        attachmentRecord.attachmentName === attachmentType &&
        attachmentRecord.attachmentPages >= expectedNumbersOfPages
      ) {
        isAttachmentValid = true;
      }
    });

    return isAttachmentValid;
  }

  public setAttachmentNumberOfPages(attachmentName: string, attachmentPages: number): void {
    this._attachmentNumberOfPages.push({ attachmentName, attachmentPages });
  }

  public resetAttachmentNumberOfPages() {
    this._attachmentNumberOfPages = [];
  }

  public sendUploadedPhotoAsString(photoAsString: string): void {
    this.uploadedPhotoTransferSource.next(photoAsString);
  }

  public setAttachmentLoadingStatus(attachmentStatus: boolean): void {
    this._isAttachmentLoading = attachmentStatus;
  }

  public getAttachmentLoadingStatus(): boolean {
    return this._isAttachmentLoading;
  }

  public emitUploadedPhotoEvent(): void {
    this.uploadPhotoTransferEvent.next(true);
  }
}
