import { RevenueServiceEmploymentDto } from '@app/_models';

export class RevenueServiceEmploymentResponseDto {
  applicantId: number;
  applicationId: number;
  guid: string;
  id: number;
  request: string;
  revenueServiceEmployments: RevenueServiceEmploymentDto[];
  rqDate: string | Date;
  rsDate: string | Date;
  statusCode: string;
  statusMessage: string;
  statusName: string;
}
