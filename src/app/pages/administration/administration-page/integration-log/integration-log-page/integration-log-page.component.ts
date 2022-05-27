import { Component, OnDestroy, OnInit } from '@angular/core';
import { IntegrationLog, PageDTO, PaginationAndSortingDto, TableData, TableDataHeader } from '@app/_models';
import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { filter, pluck, takeUntil, tap } from 'rxjs/operators';

import { AdmSetIntegrationLogAction } from '@app/store/actions/administration.actions';
import { CredentialsService } from '@app/services/authentication';
import { IAppState } from '@app/store/state/app.state';
import { selectIntegrationLog } from '@app/store/selectors/administration.selector';

@Component({
  selector: 'app-integration-log-page',
  templateUrl: './integration-log-page.component.html',
  styleUrls: ['./integration-log-page.component.scss']
})
export class IntegrationLogPageComponent implements OnInit, OnDestroy {
  totalCount: number;
  selectedPage: number = 0;
  itemLimit: number = 20;
  params: PaginationAndSortingDto = {
    page: this.selectedPage.toString(),
    size: this.itemLimit.toString()
  };

  dataSource: TableData<IntegrationLog> = new TableData();
  changePage: Subject<number> = new Subject<number>();

  isAdmin: boolean = false;
  isVerifier: boolean = false;
  isDecisionMaker: boolean = false;
  isVerifierBoss: boolean = false;
  isDecisionMakerBoss: boolean = false;

  objColNameProps: TableDataHeader[] = [
    new TableDataHeader(
      'serviceCode',
      'Administration.TableHeaders.IntegrationLog.ServiceCode',
      'string',
      'serviceCode'
    ),

    new TableDataHeader('applicationId', 'Administration.TableHeaders.IntegrationLog.AppId', 'string', 'applicationId'),
    new TableDataHeader('pin', 'Administration.TableHeaders.IntegrationLog.PinInn', 'string', 'pin'),
    new TableDataHeader('guid', 'Administration.TableHeaders.IntegrationLog.Guid', 'string', 'guid'),
    new TableDataHeader('rqDate', 'Administration.TableHeaders.IntegrationLog.RequestDate', 'string', 'rqDate'),
    new TableDataHeader('rsDate', 'Administration.TableHeaders.IntegrationLog.ResponseDate', 'string', 'rsDate'),
    new TableDataHeader(
      'statusName',
      'Administration.TableHeaders.IntegrationLog.ResponseStatus',
      'string',
      'statusName'
    ),
    new TableDataHeader(
      'statusCode',
      'Administration.TableHeaders.IntegrationLog.ResponseCode',
      'string',
      'statusCode'
    ),
    new TableDataHeader(
      'statusMessage',
      'Administration.TableHeaders.IntegrationLog.ResponseMessage',
      'string',
      'statusMessage'
    )
  ];

  private selectIntegrationLog$: Observable<PageDTO<IntegrationLog>> = this._store.pipe(select(selectIntegrationLog));
  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(private credentialsService: CredentialsService, private _store: Store<IAppState>) {
    this.dispatchSortAndPaginationData();
  }

  ngOnInit() {
    this.isAdmin = this.credentialsService.isAdmin;
    this.isVerifier = this.credentialsService.isVerifier;
    this.isDecisionMaker = this.credentialsService.isDecisionMaker;
    this.isVerifierBoss = this.credentialsService.isVerifierBoss;
    this.isDecisionMakerBoss = this.credentialsService.isDecisionMakerBoss;

    this.selectIntegrationLog$
      .pipe(
        tap(res => {
          this.totalCount = res.totalElements;
        }),
        filter(item => !!item),
        pluck('content'),
        takeUntil(this.destroy)
      )
      .subscribe(res => {
        if (!!res) {
          this.dataSource = new TableData(this.objColNameProps, res);
        }
      });
  }

  onSearchEvent(inputVal: string): void {
    if (!!inputVal) {
      this.params.search = inputVal;
      this.changePage.next(1);
    } else if (this.params.hasOwnProperty('search')) {
      delete this.params.search;
      this.changePage.next(1);
    }
  }

  onClearEvent(value: boolean) {
    if (!!value && this.params.hasOwnProperty('search')) {
      delete this.params.search;
      this.changePage.next(1);
    }
  }

  selectedPageEvent(pageNumber: number) {
    this.selectedPage = pageNumber - 1;
    this.params.page = this.selectedPage.toString();
    this.dispatchSortAndPaginationData();
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }

  private dispatchSortAndPaginationData() {
    this._store.dispatch(
      AdmSetIntegrationLogAction({
        data: { ...this.params }
      })
    );
  }
}
