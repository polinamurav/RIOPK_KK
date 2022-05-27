export class GetStatementDto {
  accountId: number;
  applicantId: number;
  applicationId: number;
  creditAmount: number;
  date: string | Date;
  debitAmount: number;
  id: number;
  opCode: string;
  partnerAccountIban: string;
  purpose: string;
}
