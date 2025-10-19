import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { TableData, Application, TableDataHeader, RoleAuthority } from '@app/_models';
import { IChosenCredit, IPossibleCredit } from '@app/_models/credit-types';
import { ApplicationControllerService } from '@app/api';
import { BRMSResponse } from '@app/_models/api-models/brms';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/store/state/app.state';
import { untilDestroyed } from '@app/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'ng-decision',
  templateUrl: './decision.component.html',
  styleUrls: ['./decision.component.scss']
})
export class DecisionComponent implements OnInit, OnChanges, OnDestroy {
  itemLimit: number = 20;
  params: string = '';
  totalCount: number = 0;

  selectUserData$ = this._store.pipe(select(selectUserData));

  chosenCreditColNameProps: TableDataHeader[] = [
    new TableDataHeader('productType', 'Вид продукта', 'string'),
    new TableDataHeader('autoApproveSum', 'Сумма кредита', 'number'),
    new TableDataHeader('currency', 'Валюта', 'string'),
    new TableDataHeader('minTermForAutoApproveSum', 'Мин.срок кредита, мес', 'string'),
    new TableDataHeader('maxCreditTerm', 'Макс.срок кредита, мес', 'string'),
    new TableDataHeader('annPaymentForAutoApproveSum', 'Ежемес.платеж, мин.срок', 'number'),
    new TableDataHeader('rateForAutoApproveSum', 'Ставка', 'string')
  ];

  possibleCreditColNameProps: TableDataHeader[] = [
    new TableDataHeader('productType', 'Вид продукта', 'string'),
    new TableDataHeader('maxCreditSum', 'Сумма кредита', 'number'),
    new TableDataHeader('currency', 'Валюта', 'string'),
    new TableDataHeader('minTerm', 'Мин.срок кредита, мес', 'string'),
    new TableDataHeader('maxCreditTerm', 'Макс.срок кредита, мес', 'string'),
    new TableDataHeader('annPayment', 'Ежемес.платеж, макс.срок', 'number'),
    new TableDataHeader('rate', 'Ставка', 'string')
  ];

  chosenCreditInfoData: TableData<IChosenCredit> = new TableData(this.chosenCreditColNameProps, []);
  possibleCreditInfoData: TableData<IPossibleCredit> = new TableData(this.possibleCreditColNameProps, []);

  disapproveCode: string | null = null;
  decision: string | null = null;

  viewButtonParams: boolean = false;

  @Input() applicationData: Application;

  constructor(private applicationControllerService: ApplicationControllerService, private _store: Store<IAppState>) {}

  ngOnInit() {
    this.selectUserData$.pipe(untilDestroyed(this)).subscribe(res => {
      if (!!res && !!res.authorities.length) {
        this.viewButtonParams = res.authorities.some(
          val =>
            val.authority === RoleAuthority.ADMIN ||
            val.authority === RoleAuthority.DECISION_MAKER ||
            val.authority === RoleAuthority.DECISION_MAKER_BOSS
        );
      }
    });
  }

  ngOnChanges() {
    if (this.applicationData) {
      this.applicationControllerService.getBrms(this.applicationData.id).subscribe(brmsResponse => {
        if (!!brmsResponse) {
          if (this.applicationData.decision.code === '001') {
            this.chosenCreditTableAddition(brmsResponse);
            this.possibleCreditTableAddition(brmsResponse);
          } else if (this.applicationData.decision.code === '002') {
            this.possibleCreditTableAddition(brmsResponse);
          }
          this.params = brmsResponse.params;
        }
      });
      this.decision = !!this.applicationData.brms12Decision ? this.applicationData.brms12Decision.nameRu : '';
      this.disapproveCode = this.applicationData.disapproveCode;
    }
  }

  viewParams() {
    Swal.fire({ text: this.params ? this.params : 'Нет параметров' });
  }

  ngOnDestroy(): void {}

  private chosenCreditTableAddition(brms: BRMSResponse) {
    const chosenCreditData: IChosenCredit = {
      productType: brms.productType,
      autoApproveSum: brms.autoApproveSum,
      currency: brms.currency,
      minTermForAutoApproveSum: brms.minTermForAutoApproveSum,
      maxCreditTerm: brms.maxCreditTerm,
      annPaymentForAutoApproveSum: brms.annPaymentForAutoApproveSum,
      rateForAutoApproveSum: brms.rateForAutoApproveSum
    };

    this.chosenCreditInfoData = new TableData(this.chosenCreditColNameProps, [chosenCreditData]);
  }
  private possibleCreditTableAddition(brms: BRMSResponse) {
    const possibleCreditData: IPossibleCredit = {
      productType: brms.productType,
      maxCreditSum: brms.maxCreditSum,
      currency: brms.currency,
      minTerm: brms.minTerm,
      maxCreditTerm: brms.maxCreditTerm,
      annPayment: brms.annPayment,
      rate: brms.rate
    };

    this.possibleCreditInfoData = new TableData(this.possibleCreditColNameProps, [possibleCreditData]);
  }
}
