export interface URPAReportBatchDto {
  created: string;
  dirURPABatchStatus: DirURPABatchStatusDto;
  fileName: string;
  id: number;
  name: string;
  reportReady: boolean;
}

export interface DirURPABatchStatusDto {
  id: string;
  nameAm: string;
  nameRu: string;
}


export interface DirOnlineHistoryReportStatusDto{
  id: string;
  nameAm: string;
  nameRu: string;
}
