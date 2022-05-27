import { UserDto } from '..';

export class CommentDto {
  applicationId: number;
  comment: string;
  createdBy: UserDto;
  createdDate: string | Date;
  id?: number;
}
