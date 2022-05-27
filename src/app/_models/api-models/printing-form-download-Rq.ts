export class PrintingFormDownloadRq {
  ApplicationId: number;
  PrintingFormTypeId: string;
  ShortFormId: number;
  ProductId: string;

  constructor(ApplicationId = null, PrintingFormTypeId = null, ShortFormId = null, ProductId = null) {
    this.ApplicationId = ApplicationId;
    this.PrintingFormTypeId = PrintingFormTypeId;
    this.ShortFormId = ShortFormId;
    this.ProductId = ProductId;
  }
}
