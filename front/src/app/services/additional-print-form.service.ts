import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PrintingFormControllerService } from '@app/api';
import { Application, PrintingFormDto } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class AdditionalPrintFormService {
  constructor(private printingFormService: PrintingFormControllerService) {}

  getPrintFormsWithSigners(app: Application): Observable<PrintingFormDto[]> {
    const appId = app.applicant.applicationId;
    const branchId = app.dirBranch ? app.dirBranch.id : 0;
    const productId = this.getProductId(app);

    return this.printingFormService.getPrintingFormsForStage(appId, branchId, productId);
  }

  private getProductId(app: Application): number {
    if (app.finalCreditInfo && app.finalCreditInfo.product) {
      return app.finalCreditInfo.product.id;
    } else if (app.chosenCreditInfo && app.chosenCreditInfo.product) {
      return app.chosenCreditInfo.product.id;
    } else if (app.requestedCreditInfo && app.requestedCreditInfo.product) {
      return app.requestedCreditInfo.product.id;
    } else {
      return 0;
    }
  }
}
