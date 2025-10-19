import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { AttachmentSaveData, AttachmentType, DirDto, ModalData } from '@app/_models';
import { config } from '../../../../../assets/configurations/configurationFile';
import { MimeTypes } from '@app/components/constants/mime-types';
import { UploadDocumentId } from '@app/constants/upload-document-id';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-upload-modal-content',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss']
})
export class UploadModalComponent implements OnInit {
  imageUrl: null | string = '';

  attachmentMaxSize = config.attachmentMaxSizeBytes;

  pathTitle: string = 'Modals.Buttons.ChoosePhoto';

  fileName: string;

  selectData: DirDto[] | AttachmentType[] = [];

  selectItem: FormControl = new FormControl('');

  emitData: AttachmentSaveData | string;

  isAttachmentSizeInvalid: boolean = false;

  isAttachmentTypeInvalid: boolean = false;

  viewSearchSelect: boolean = false;

  returnString: boolean = true;

  placeholder: string;

  selectPropertyName: string;

  acceptForInput: string;

  private acceptedFormates: string[] = ['pdf', 'jpg', 'png', 'xls', 'xlsx', 'doc', 'docx'];
  private _accept: MimeTypes[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: ModalData, public dialogRef: MatDialogRef<UploadModalComponent>) {}

  ngOnInit() {
    if (!!this.data) {
      this._accept = this.data.accept || [];
      this.acceptForInput = this.data.accept ? this.data.accept.join(',') : '*';
      this.pathTitle = this.data.pathTitle;
      this.selectData = this.data.selectData;
      this.returnString = this.data.returnString;
      this.viewSearchSelect = !!this.data.viewSearchSelect;
      if (this.viewSearchSelect) {
        this.selectItem = new FormControl('', Validators.required);
        if (this.data.attachmentTypeId) {
          this.selectItem.setValue(this.data.attachmentTypeId);
        }
      }
      this.placeholder = this.data.placeholder || 'Статус занятости';
      this.selectPropertyName = this.data.selectPropertyName;
    }
  }

  get getAttachmentMaxSize() {
    return this.convertBytesToMBytes(this.attachmentMaxSize);
  }

  changeType(type: string) {
    this.changeAcceptedTypes(type);

    if (this.emitData) {
      // tslint:disable: no-string-literal
      this.emitData['typeId'] = type;
      const ext = this.getExtension(this.emitData['file']);
      this.setAttachmentTypeFlag(type, this.emitData['file']['type'], this._accept, ext);
    } else {
      this.emitData = {
        file: null,
        name: null,
        typeId: type,
        imgAsString: null
      };
    }
  }

  uploadFile(event: HTMLInputEvent) {
    const reader = new FileReader(); // HTML5 FileReader API
    const target = event.target;
    const file = target.files[0];

    if (target.files && target.files[0]) {
      this.isAttachmentSizeInvalid = target.files[0].size > this.attachmentMaxSize;

      const ext = this.getExtension(file);
      this.setAttachmentTypeFlag(this.selectItem.value, file.type, this._accept, ext);

      reader.readAsDataURL(file);
      this.fileName = file.name;
      reader.onload = () => {
        if (!this.returnString) {
          this.emitData = {
            file: target.files[0],
            name: file.name,
            typeId: this.selectItem.value,
            imgAsString: reader.result as string
          };
        } else {
          this.emitData = reader.result as string;
        }
      };
    }
  }

  setPathToParent() {
    if (this.emitData) {
      this.dialogRef.close(this.emitData);
    }
  }

  convertBytesToMBytes = (b: number): number => {
    const k = 1024;
    if (b) {
      const i = Math.floor(Math.log(b) / Math.log(k));
      return b ? parseFloat((b / Math.pow(k, i)).toFixed(1)) : 0;
    }
  };

  private changeAcceptedTypes(type: string) {
    if (type === UploadDocumentId.Photo) {
      this.acceptForInput = 'image/*';
    }

    if (type === UploadDocumentId.PhotoInspection || type === UploadDocumentId.PhotoFinal) {
      this._accept = [...this._accept, ...[MimeTypes.JPG, MimeTypes.PNG]];
    }

    this.acceptForInput = this._accept.join(',');
  }

  private getExtension = (file: File): string => {
    const nameArr = file.name.split('.');
    return nameArr[nameArr.length - 1];
  };

  private setAttachmentTypeFlag(
    selectedType: string,
    fileType: string,
    acceptedTypesList: MimeTypes[],
    extension: string
  ) {
    this.isAttachmentTypeInvalid =
      (selectedType !== UploadDocumentId.Photo &&
        !!acceptedTypesList.length &&
        !acceptedTypesList.includes(fileType as MimeTypes)) ||
      !this.acceptedFormates.includes(extension.toLowerCase());
  }
}
