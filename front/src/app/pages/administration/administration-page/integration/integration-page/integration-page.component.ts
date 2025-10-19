import { Component, OnDestroy, OnInit } from '@angular/core';
import { IntegrationSetting, PaginationAndSortingDto, TableData, TableDataHeader } from '@app/_models';
import { Store, select } from '@ngrx/store';
import { pluck, takeUntil, tap } from 'rxjs/operators';

import { AdmSetIntegrationAction } from '@app/store/actions/administration.actions';
import { IAppState } from '@app/store/state/app.state';
import { IntegrationModalComponent } from '@app/shared/components/modals/integration-modal/integration-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { selectIntegration } from '@app/store/selectors/administration.selector';
import { selectUserData } from '@app/store/selectors/auth.selector';

@Component({
  selector: 'app-integration-page',
  templateUrl: './integration-page.component.html',
  styleUrls: ['./integration-page.component.scss']
})
export class IntegrationPageComponent implements OnInit, OnDestroy {
  objColNameProps: TableDataHeader[] = [
    new TableDataHeader('serviceName', 'Administration.TableHeaders.Integration.ServiceName', 'string'),
    new TableDataHeader('isServiceOn', 'Administration.TableHeaders.Integration.ServiceStatus', 'status'),
    new TableDataHeader('serviceCode', 'Administration.TableHeaders.Integration.ServiceCode', 'string'),
    new TableDataHeader('created', 'Administration.TableHeaders.Integration.Created', 'dateAndTime'),
    new TableDataHeader('updated', 'Administration.TableHeaders.Integration.Updated', 'dateAndTime'),
    new TableDataHeader('changedByUsername', 'Administration.TableHeaders.ChangedBy', 'string')
  ];
  selectUserData$ = this._store.pipe(select(selectUserData));
  selectIntegration$ = this._store.pipe(select(selectIntegration));
  params: PaginationAndSortingDto;
  selectedPage: number = 0;
  itemLimit: number = 20;
  totalCount: number;
  dataSource;
  isAdmin: boolean = false;

  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(private _store: Store<IAppState>, private dialog: MatDialog) {}

  ngOnInit() {
    this.params = {
      page: this.selectedPage.toString(),
      size: this.itemLimit.toString()
    };

    this.selectUserData$
      .pipe(
        pluck('authorities'),
        takeUntil(this.destroy)
      )
      .subscribe(user => {
        this.isAdmin = user[0].authority === 'ADMIN';
      });

    this._store.dispatch(AdmSetIntegrationAction({ data: this.params }));
    this.selectIntegration$
      .pipe(
        tap(res => {
          this.totalCount = res.totalElements;
        }),
        pluck('content'),
        takeUntil(this.destroy)
      )
      .subscribe(data => {
        this.dataSource = new TableData(this.objColNameProps, data);
      });
  }
  dispatchSortAndPaginationAction() {
    this._store.dispatch(AdmSetIntegrationAction({ data: this.params }));
  }

  selectedPageEvent(pageNumber: number) {
    this.selectedPage = pageNumber - 1;
    this.params = {
      page: this.selectedPage.toString(),
      size: this.itemLimit.toString()
    };
    this.dispatchSortAndPaginationAction();
  }

  onSelectItem(selectedItem: IntegrationSetting) {
    if (!!this.isAdmin) {
      const dialogRef = this.dialog.open(IntegrationModalComponent, {
        width: '600px',
        height: '500px',
        data: {
          settings: selectedItem,
          pagination: this.params
        }
      });
      (dialogRef.componentInstance as IntegrationModalComponent).emitData.pipe(takeUntil(this.destroy)).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
