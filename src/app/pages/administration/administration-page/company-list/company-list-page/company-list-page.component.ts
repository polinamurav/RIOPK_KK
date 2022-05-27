import { AdmSetCompanyListAction, AdmUpdateCompanyListAction } from '@app/store/actions/administration.actions';
import {
  AdministrationBaseModalComponent,
  AdministrationBaseModalData
} from '@app/shared/modals/administration-base-modal/administration-base-modal.component';
import { COMPANIES_HEADERS, COMPANY_FORM } from './constants/company.constants';
import {
  Company,
  CompanyDto,
  CompanyStatus,
  Dir,
  OptionListNames,
  PageDTO,
  PaginationAndSortingDto,
  TableData,
  TableDataHeader,
  UserDto
} from '@app/_models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { filter, pluck, take, takeUntil, tap } from 'rxjs/operators';

import { CompanyStatusControllerService } from '@app/api';
import { IAppState } from '@app/store/state/app.state';
import { MatDialog } from '@angular/material';
import { TariffControllerService } from '@app/api/tariff-controller.service';
import { getOnlyActiveItems } from '@app/services/util/sort-only-active';
import { selectCompanyList } from '@app/store/selectors/administration.selector';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

type Options = Dir | CompanyStatus;

@Component({
  selector: 'app-company-list-page',
  templateUrl: './company-list-page.component.html',
  styleUrls: ['./company-list-page.component.scss']
})
export class CompanyListPageComponent implements OnInit, OnDestroy {
  public dataSource: TableData<Company>;
  public totalCount: number;
  public selectedPage: number = 0;
  public itemLimit: number = 20;
  public objColNameProps: TableDataHeader[] = COMPANIES_HEADERS;
  public changePage: Subject<number> = new Subject<number>();
  public language: string = this.translateService.currentLang;
  public params: PaginationAndSortingDto = {
    page: this.selectedPage,
    size: this.itemLimit.toString()
  };

  private currentUser: UserDto;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private selectCompanyList$: Observable<PageDTO<Company>> = this._store.pipe(select(selectCompanyList));
  private selectCurrentUserData$: Observable<UserDto> = this._store.pipe(select(selectUserData));
  private optionsList: Record<string, Options[]> = {
    [OptionListNames.Tariffs]: [],
    [OptionListNames.CompanyStatus]: []
  };

  constructor(
    private _store: Store<IAppState>,
    private dialog: MatDialog,
    private tariffService: TariffControllerService,
    private companyStatusService: CompanyStatusControllerService,
    private translateService: TranslateService
  ) {
    this.dispatchSortAndPaginationAction();
  }

  ngOnInit() {
    this.createLanguageSubscription();
    this.setCompanyList();
    this.setOptionsList();
  }

  onSearchEvent(inputVal: string): void {
    if (!!inputVal) {
      this.params = {
        page: this.selectedPage.toString(),
        size: this.itemLimit.toString(),
        value: inputVal.trim(),
        lang: this.language
      };
      this.changePage.next(1);
    } else if (this.params.hasOwnProperty('value')) {
      this.params = {
        page: this.params.page,
        size: this.params.size
      };
      this.changePage.next(1);
    }
  }

  onClearEvent(value: boolean) {
    if (!!value && this.params.hasOwnProperty('value')) {
      this.params = {
        page: this.params.page,
        size: this.params.size
      };
      this.changePage.next(1);
    }
  }

  selectedItem(item: Company) {
    this.showDialog(
      {
        title: 'Administration.Aside.Companies',
        dataInfo: item,
        formConfig: COMPANY_FORM,
        showSaveButton: true,
        showCreateButton: false,
        disabledFields: true,
        optionsList: this.optionsList,
        containerClass: 'grid-two-cols'
      },
      (company: CompanyDto) => {
        this._store.dispatch(
          AdmUpdateCompanyListAction({
            paginationData: { ...this.params },
            data: {
              ...item,
              ...company,
              changedByUsername: this.currentUser.username,
              updatedDate: new Date()
            }
          })
        );
      }
    );
  }

  selectedPageEvent(pageNumber: number) {
    this.selectedPage = pageNumber - 1;
    if (this.params.hasOwnProperty('value')) {
      this.params = {
        page: this.selectedPage.toString(),
        size: this.itemLimit.toString(),
        value: this.params.value,
        lang: this.language
      };
    } else {
      this.params = {
        page: this.selectedPage.toString(),
        size: this.itemLimit.toString()
      };
    }

    this.dispatchSortAndPaginationAction();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private setCompanyList() {
    this.selectCompanyList$
      .pipe(
        tap(res => {
          this.totalCount = res.totalElements;
        }),
        filter(item => !!item),
        pluck('content'),
        takeUntil(this.destroy$)
      )
      .subscribe(res => {
        if (res) {
          this.dataSource = new TableData(this.objColNameProps, res);
        }
      });
  }

  private setOptionsList() {
    combineLatest([this.selectCurrentUserData$, this.tariffService.getList(), this.companyStatusService.getList()])
      .pipe(
        take(1),
        takeUntil(this.destroy$)
      )
      .subscribe(([user, tariffs, companyStatuses]) => {
        this.setCurrentUserData<UserDto>(user);
        this.optionsList[OptionListNames.Tariffs] = getOnlyActiveItems<Dir>(tariffs);
        this.optionsList[OptionListNames.CompanyStatus] = getOnlyActiveItems<CompanyStatus>(companyStatuses);
      });
  }

  private setCurrentUserData<T extends UserDto>(res: T) {
    if (res) {
      this.currentUser = res;
    }
  }

  private dispatchSortAndPaginationAction() {
    this._store.dispatch(AdmSetCompanyListAction({ data: this.params }));
  }

  private showDialog(data: AdministrationBaseModalData<Company, any>, callback: (data: CompanyDto) => void) {
    const dialogRef = this.dialog.open(AdministrationBaseModalComponent, {
      width: '50%',
      height: '70%',
      panelClass: 'custom-panel-cls',
      data
    });
    dialogRef.componentInstance.emitData.pipe(takeUntil(this.destroy$)).subscribe(callback);
  }

  private createLanguageSubscription() {
    this.translateService.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((lang: LangChangeEvent) => (this.language = lang.lang));
  }
}
