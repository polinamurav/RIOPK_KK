import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { config } from '../../../../assets/configurations/configurationFile';
import { MimeTypes } from '@app/components/constants/mime-types';
interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

export interface FileDownloaderModalConfig {
  accept?: MimeTypes[];
}

export interface FileDownloaderEmitConfig {
  file?: File;
  base64?: string;
  error?: boolean;
}

@Component({
  selector: 'app-file-downloader',
  templateUrl: './file-downloader.component.html',
  styleUrls: ['./file-downloader.component.scss']
})
export class FileDownloaderComponent implements OnInit {
  public fileName: string;
  public src: string;
  public pathTitle: string = 'Modals.Buttons.ChoosePhoto';
  acceptForInput: string;
  acceptedFormates: string[] = ['pdf', 'jpg', 'png', 'xls', 'xlsx', 'doc', 'docx'];

  isAttachmentSizeInvalid: boolean;
  isAttachmentTypeInvalid: boolean;

  @Input() titleForPreview: string = 'Buttons.Attach';
  @Input() showError: string;
  @Input() disableUpload: boolean;
  @Input() showUploadBtn: boolean;
  @Input() accept: MimeTypes[];
  @Input() attachmentMaxSize = config.attachmentMaxSizeBytes;
  @Output() fileLoadedEvent = new EventEmitter<FileDownloaderEmitConfig>();
  emitUploadFileEvent = new EventEmitter<any>();
  isModalView: boolean;

  private file: File;

  constructor() {}

  ngOnInit(): void {
    this.acceptForInput = this.accept ? this.accept.join(',') : '*';
  }

  get getAttachmentMaxSize() {
    return this.convertBytesToMBytes(this.attachmentMaxSize);
  }

  // ! TODO Romanovski: changed all
  public uploadFile(event: HTMLInputEvent) {
    const reader = new FileReader(); // HTML5 FileReader API
    const target = event.target;
    const file = target.files[0];

    const extension = this.getExtension(file);
    if (target.files && target.files[0]) {
      this.isAttachmentSizeInvalid = target.files[0].size > this.attachmentMaxSize;
      this.setAttachmentTypeFlag(file.type, this.accept, extension);

      reader.readAsDataURL(file);
      this.fileName = file.name;
      reader.onload = () => {
        // if (!this.returnString) {

        if (!this.isAttachmentSizeInvalid && !this.isAttachmentTypeInvalid) {
          this.fileLoadedEvent.emit({
            file: target.files[0],
            base64: reader.result as string
          });
          this.file = target.files[0];
        } else {
          this.fileLoadedEvent.emit({
            error: true
          });
        }
      };
    }
  }

  emitUploadFile() {
    this.emitUploadFileEvent.emit();
  }

  convertBytesToMBytes = (b: number): number => {
    const k = 1024;
    if (b) {
      const i = Math.floor(Math.log(b) / Math.log(k));
      return b ? parseFloat((b / Math.pow(k, i)).toFixed(1)) : 0;
    }
  };

  // ! TODO Romanovski: changed all
  public previewAttachment() {
    let objectURL = window.URL.createObjectURL(this.file);

    const anchor = document.createElement('a');
    anchor.href = objectURL;
    anchor.target = '_blank';
    anchor.click();

    this.src = (this.file as any).imgAsString;
  }

  public deleteFile() {
    this.fileName = this.isAttachmentSizeInvalid = this.isAttachmentTypeInvalid = null;
    this.fileLoadedEvent.emit(null);
  }

  private getExtension = (file: File): string => {
    const nameArr = file.name.split('.');
    return nameArr[nameArr.length - 1];
  };

  private setAttachmentTypeFlag(fileType: string, acceptedTypesList: MimeTypes[], extension: string) {
    this.isAttachmentTypeInvalid =
      (!!acceptedTypesList.length && !acceptedTypesList.includes(fileType as MimeTypes)) ||
      !this.acceptedFormates.includes(extension.toLowerCase());
  }
}
