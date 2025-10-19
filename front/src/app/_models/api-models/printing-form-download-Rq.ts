export class PrintingFormDownloadRq {
  applicationId: number;
  printingFormCode: string;

  constructor(ApplicationId: any = null, printingFormCode: any = null) {
    this.applicationId = ApplicationId;
    this.printingFormCode = printingFormCode;
  }
}
