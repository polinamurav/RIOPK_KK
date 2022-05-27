import {
  AdmCreateVisualAssessmentAction,
  AdmSetVisualAssessmentAction,
  AdmUpdateVisualAssessmentAction
} from '@app/store/actions/administration.actions';
import {
  AdministrationBaseModalComponent,
  AdministrationBaseModalData
} from '@app/shared/modals/administration-base-modal/administration-base-modal.component';
import { BRMSRuleType, PageDTO, PaginationAndSortingDto, TableData, TableDataHeader } from '@app/_models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DirVisualAssessment, DirVisualAssessmentDto } from '@app/_models/api-models/visual-assessment';
import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { VISUAL_ASSESSMENT_FORM, VISUAL_ASSESSMENT_HEADERS } from '../constants/visual-assessment.constants';
import { filter, pluck, tap } from 'rxjs/operators';

import { BrmsRuleTypeControllerService } from '@app/api';
import { IAppState } from '@app/store/state/app.state';
import { MatDialog } from '@angular/material';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { selectVisualAssessments } from '@app/store/selectors/administration.selector';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-visual-assessment',
  templateUrl: './visual-assessment.component.html',
  styleUrls: ['../../../styles/common-table-styles.scss']
})
export class VisualAssessmentComponent implements OnInit, OnDestroy {
  public totalCount: number;
  public changePage: Subject<number> = new Subject<number>();
  public dataSource: TableData<any>;
  public userRole: number;

  public objColNameProps: TableDataHeader[] = VISUAL_ASSESSMENT_HEADERS;
  public selectedPage: number = 0;
  public itemLimit: number = 20;
  public params: PaginationAndSortingDto = {
    page: this.selectedPage.toString(),
    size: this.itemLimit.toString()
  };

  private userName: string;
  private newVisualAssessmentDto: DirVisualAssessmentDto = new DirVisualAssessmentDto();
  private optionsList: Record<string, BRMSRuleType[]> = {
    brmsRuleType: []
  };

  private selectUserData$ = this._store.pipe(select(selectUserData));
  private visualAssessments$: Observable<PageDTO<DirVisualAssessment>> = this._store.pipe(
    select(selectVisualAssessments)
  );

  constructor(
    private brmsRuleTypeService: BrmsRuleTypeControllerService,
    private _store: Store<IAppState>,
    private dialog: MatDialog
  ) {
    this.dispatchSortAndPaginationData();
  }

  ngOnInit() {
    this.getDirectories();
    this.getCurrentUser();
    this.getVisualAssessments();
  }

  ngOnDestroy(): void {}

  selectedItem(item: DirVisualAssessment) {
    this.showDialog(
      {
        title: 'Редактировать визуальную оценку',
        dataInfo: item,
        formConfig: VISUAL_ASSESSMENT_FORM,
        showSaveButton: true,
        showCreateButton: false,
        disabledFields: true,
        optionsList: this.optionsList
      },
      (data: DirVisualAssessmentDto) => {
        this._store.dispatch(
          AdmUpdateVisualAssessmentAction({
            paginationData: { ...this.params },
            data: {
              ...item,
              ...data,
              changedByUsername: this.userName,
              updated: new Date()
            }
          })
        );
      }
    );
  }

  selectedPageEvent(pageNumber: number) {
    this.selectedPage = pageNumber - 1;
    this.params.page = this.selectedPage.toString();
    this._store.dispatch(AdmSetVisualAssessmentAction({ data: { ...this.params } }));
  }

  openCreateNewDialog() {
    this.showDialog(
      {
        title: 'Создать визуальную оценку',
        dataInfo: this.newVisualAssessmentDto,
        formConfig: VISUAL_ASSESSMENT_FORM,
        showSaveButton: false,
        showCreateButton: true,
        disabledFields: false,
        optionsList: this.optionsList
      },
      (data: DirVisualAssessmentDto) => {
        this._store.dispatch(
          AdmCreateVisualAssessmentAction({
            paginationData: { ...this.params },
            data: {
              ...this.newVisualAssessmentDto,
              ...data,
              created: new Date(),
              changedByUsername: this.userName,
              updated: null
            }
          })
        );
      }
    );
  }

  showDialog(data: AdministrationBaseModalData<DirVisualAssessmentDto, BRMSRuleType>, callback: (data: any) => void) {
    const dialogRef = this.dialog.open(AdministrationBaseModalComponent, {
      width: '50%',
      height: '70%',
      panelClass: 'custom-panel-cls',
      data
    });
    dialogRef.componentInstance.emitData.pipe(untilDestroyed(this)).subscribe(callback);
  }

  private getVisualAssessments() {
    this.visualAssessments$
      .pipe(
        tap(res => {
          this.totalCount = res.totalElements;
        }),
        filter(item => !!item),
        pluck('content'),
        untilDestroyed(this)
      )
      .subscribe(res => {
        if (res) {
          this.dataSource = new TableData(this.objColNameProps, res);
        }
      });
  }

  private getCurrentUser() {
    this.selectUserData$.pipe(untilDestroyed(this)).subscribe(res => {
      if (res && res.username) {
        this.userName = res.username;
        this.userRole = res.authorities[0].id;
      }
    });
  }

  private getDirectories() {
    this.brmsRuleTypeService
      .getAll()
      .pipe(untilDestroyed(this))
      .subscribe((list: BRMSRuleType[]) => {
        this.optionsList.brmsRuleType = list.filter((item: BRMSRuleType) => item.active === true);
      });
  }

  private dispatchSortAndPaginationData() {
    this._store.dispatch(
      AdmSetVisualAssessmentAction({
        data: { ...this.params }
      })
    );
  }
}
