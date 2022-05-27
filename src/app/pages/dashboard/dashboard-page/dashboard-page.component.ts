import { Component, OnInit } from '@angular/core';

import { CredentialsService } from '@app/services/authentication';
import { IAppState } from '@app/store/state/app.state';
import { RetailDirSetValueActions } from '@app/store/actions/retail-directories.actions';
import { RetailDirectoriesNames } from '@app/_models/api-models/retail-directories-names';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ngx-dashboard-page',
  templateUrl: './dashboard-page.component.html'
})
export class DashboardPageComponent implements OnInit {
  public isViewTabs: boolean = false;

  private directoriesList: RetailDirectoriesNames[] = [RetailDirectoriesNames.productCategories];

  constructor(private _store: Store<IAppState>, private credentialsService: CredentialsService) {}

  ngOnInit(): void {
    this.setDirValueToStore(this.directoriesList);

    this.isViewTabs =
      this.credentialsService.isAdmin ||
      this.credentialsService.isCreditManager ||
      this.credentialsService.isVideoBank ||
      this.credentialsService.isCallCenter ||
      this.credentialsService.isDSA;
  }

  private setDirValueToStore(tabDirectoriesNamesList: RetailDirectoriesNames[]) {
    tabDirectoriesNamesList.forEach((directoryListName: string) => {
      this._store.dispatch(
        RetailDirSetValueActions({
          propertyName: directoryListName,
          productGroupId: null
        })
      );
    });
  }
}
