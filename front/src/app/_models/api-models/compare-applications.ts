export class CompareApplicationsDto {
  field: string;
  value: string;
  valuePrev: string;
}

export class ListCompareApplicationsDto {
  fieldDtos: CompareApplicationsDto[];
}
