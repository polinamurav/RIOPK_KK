import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface PreviewFileModalData {
  file: Blob | { page: string }[];
  type: PreviewFileModalTypes;
}

export enum PreviewFileModalTypes {
  IMAGE = 'IMAGE'
}

@Component({
  selector: 'app-preview-file-modal',
  templateUrl: './preview-file-modal.component.html',
  styleUrls: ['./preview-file-modal.component.scss']
})
export class PreviewFileModalComponent implements OnInit {
  type: PreviewFileModalTypes;
  types = PreviewFileModalTypes;
  images: string[] = [];
  public src;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {}

  ngOnInit() {
    if (this.data) {
      let binaryData = [];
      binaryData.push(this.data.file);

      let file = this.data.file;
      let reader = new FileReader();

      reader.readAsText(file);
      reader.onload = function() {
        console.log(reader.result);
      };

      reader.onerror = function() {
        console.log(reader.error);
      };

      if (this.data) {
        this.type = this.data.type;
        switch (this.type) {
          case PreviewFileModalTypes.IMAGE:
            const idx = this.data.file.indexOf('base64,');
            const picture = 'data:image/jpeg;base64,' + this.data.file.slice(idx + 7);
            this.images.push(picture);
        }
      }
    }
  }
}
