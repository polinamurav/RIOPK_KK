export class AbsProvenIncomeResponseDto {
  absProvenIncomes: AbsProvenIncomeDto[];
  applicantId: number;
  applicationId: number;
  guid: string;
  id: number;
  request: string;
  response: string;
  rqDate: string | Date;
  rsDate: string | Date;
  salaryMedian: number;
  statusCode: string;
  statusMessage: string;
  statusName: string;
}

export class AbsProvenIncomeDto {
  employerName: string;
  employerTin: string;
  id: number;
  incomeAmount: number;
  isEmployerSalary: boolean;
  isMainEmployer: boolean;
}
