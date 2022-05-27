import { LocalNames, UserDto } from '..';

export class ReportType implements LocalNames {
  code: string;
  created: string;
  id: number;
  nameGe: string;
  nameEn?: string;
  nameRu: string;
  updated: string;
}

export class ReportRunHistoryDto {
  createdBy: UserDto;
  createdDate: string;
  dateFrom: string;
  dateTo: string;
  id: number;
  reportFinishDate: string;
  reportType: ReportType;
  updatedBy: UserDto;
  updatedDate: string;
}
