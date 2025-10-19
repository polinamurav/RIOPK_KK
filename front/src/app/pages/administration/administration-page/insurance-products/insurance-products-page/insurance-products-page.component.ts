import { InsuranceProductFrontDto, TableData, TableDataHeader } from '@app/_models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { InsuranceProductControllerService } from '@app/api';
import { INSURANCE_PRODUCTS_HEADERS } from '@app/pages/administration/administration-page/insurance-products/insurance-products-page/constants/insurance-products.constants';

@Component({
  selector: 'app-insurance-products-page',
  templateUrl: './insurance-products-page.component.html',
  styleUrls: ['./insurance-products-page.component.scss']
})
export class InsuranceProductsPageComponent implements OnInit, OnDestroy {
  public dataSource: TableData<InsuranceProductFrontDto>;
  public objColNameProps: TableDataHeader[] = INSURANCE_PRODUCTS_HEADERS;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private insuranceProductController: InsuranceProductControllerService) {}

  ngOnInit(): void {
    this.setInsuranceProductsList();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private setInsuranceProductsList(): void {
    this.insuranceProductController
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: InsuranceProductFrontDto[]) => {
        this.dataSource = new TableData(this.objColNameProps, res);
      });
  }

  updateList(): void {
    this.insuranceProductController
      .update()
      .pipe(
        switchMap(() => this.insuranceProductController.getAll()),
        takeUntil(this.destroy$)
      )
      .subscribe((res: InsuranceProductFrontDto[]) => {
        this.dataSource = new TableData(this.objColNameProps, res);
      });
  }
}
