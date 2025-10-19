import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface IDoc {
  name: string;
  type: string;
  id: number;
}

@Component({
  selector: 'mat-app-table-attach',
  templateUrl: './table-attach.component.html',
  styleUrls: ['./table-attach.component.scss']
})
export class TableAttachComponent implements OnInit {
  // массив прикрепленных документов
  @Input() attachedDocs: IDoc[] = [];

  // emit документа для скачивания
  @Output() downloadDoc: EventEmitter<IDoc> = new EventEmitter<IDoc>();
  // emit документа на удаление
  @Output() removeDoc: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  downloadFile(doc: IDoc) {
    this.downloadDoc.emit(doc);
  }

  removeFile(index: number) {
    this.removeDoc.emit(index);
  }
}
