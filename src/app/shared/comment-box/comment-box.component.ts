import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { UserDto } from '@app/_models';
import { TranslateService } from '@ngx-translate/core';
import { untilDestroyed } from '@app/core';

interface ICommentBlock {
  icon: string;
  changedByUsername: string;
  changedByFio: string;
  createdDate: string | Date;
  comment: string;
}
@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss']
})
export class CommentBoxComponent implements OnDestroy {
  @Input() commentList: ICommentBlock[] = [];
  @Input() userData: UserDto;
  @Input() readonly: boolean = false;
  @Output() emitComnent: EventEmitter<string> = new EventEmitter<string>();

  defaultUrl: string = '../../../assets/about.png';
  comment: string = '';

  constructor(private translateService: TranslateService) {}

  ngOnDestroy() {}

  onSendComment() {
    if (this.comment) {
      this.emitComnent.next(this.comment);
      const newComment: ICommentBlock = {
        icon: '',
        changedByUsername: this.userData.username,
        changedByFio: this.userData.fio,
        createdDate: new Date(),
        comment: this.comment
      };
      this.commentList.unshift(newComment);
      this.comment = '';
    } else {
      this.translateService
        .get('Modals.ErrorMessages.EmptyComment', null)
        .pipe(untilDestroyed(this))
        .subscribe((text: string) => {
          Swal.fire({
            icon: 'error',
            text
          });
        });
    }
  }
}
