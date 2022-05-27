import * as CONSTANTS from './constants/verification-constants';

import {
  Application,
  CommentDto,
  CreditInfo,
  CreditInfoDto,
  Dir,
  EditableTableHeader,
  EInputType,
  OptionListNames,
  ProductRes,
  TableData,
  UserDto,
  ValueType,
  VerificationDto
} from '@app/_models';
import {
  ApplicationControllerService,
  BrmsFinalMatrixFrontControllerService,
  ChatUnderLimitOwnerControllerService
} from '@app/api';
import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Observable, combineLatest, throwError } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { catchError, finalize, switchMap, take } from 'rxjs/operators';

import { BRMSFinalMatrixDto } from '@app/_models/api-models/brms';
import { ChatUnderManagerControllerService } from '@app/api/chat-under-manager-controller.service';
import { FooterButtonClick } from '@app/components/tabs-footer/constants/footer-buttons.model';
import { FormGroup } from '@angular/forms';
import { FormGroupService } from '@app/services/form-group.service';
import { IAppState } from '@app/store/state/app.state';
import { OPERATIONS_NAMES } from '@app/app-operation-mode/constants/operations-list';
import { RetailDirectoriesNames } from '@app/_models/api-models/retail-directories-names';
import { RouterURLService } from '@app/services/routerURL.service';
import { ToastService } from '@app/services/toast.service';
import { getOnlyActiveItems } from '@app/services/util/sort-only-active';
import { selectRetailDirectory } from '@app/store/selectors/retail-directories.selector';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { untilDestroyed } from '@app/core';
import { MatrixUtilService } from '@app/components/tabs/data-form/services/matrix-util.service';
import { CreditInfoControllerService } from '@app/api/credit-info-controller.service';
import { VerificationGroupKeys } from './constants/verification-constants';
import { TableDataProcessingService } from '@app/components/tabs/data-form/services/table-data-processing.service';
import { ChatManagerVerificatorControllerService } from '@app/api/chat-manager-verificator-controller .service';
import {EditableTableComponent} from "@app/shared/editable-table/editable-table.component";

type Options = ProductRes | Dir;
type TableDataOptions = CreditInfo;

@Component({
  selector: 'ng-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['../../common-tabs-scss/verification-common.component.scss'],
  providers: [MatrixUtilService, TableDataProcessingService]
})
export class VerificationComponent implements OnInit, OnDestroy {
  @Input() verificationData: VerificationDto;
  @Input() readonlyForm: boolean = false;
  @Input() applicationData: Application;
  @Input() language: string;

  @ViewChild(EditableTableComponent) editableTableComponent: EditableTableComponent<any>;

  public form: FormGroup;
  public userData: UserDto;

  chatManagerVerificatorList: CommentDto[];

  public finalMatrixData: TableData<BRMSFinalMatrixDto> = new TableData(CONSTANTS.FINAL_MATRIX_HEADERS, []);
  public needVerificationCreditInfoData: TableData<any> = new TableData(CONSTANTS.FINAL_CREDIT_INFO_HEADERS, []);
  public verifiedCreditInfoData: EditableTableHeader[] = CONSTANTS.VERIFIED_CREDIT_INFO_HEADERS;

  verifiedCreditInfo: CreditInfo[] = [];

  public footerConfigSource = 'common.verification';
  public isNewMessageExists: boolean = false;
  public isLoading: boolean = false;

  public itemLimit: number = 20;
  public totalCount: number = 1;

  public formConfig = CONSTANTS.VERIFICATION_FORM;
  public EInputType = EInputType;
  public ValueType = ValueType;
  public optionsList: Record<string, Options[]> = {
    [OptionListNames.Product]: [],
    [OptionListNames.Currencies]: []
  };
  isWithRef: boolean = false;
  isWithProduct: number = null;
  finalMatrix: BRMSFinalMatrixDto[] = [];

  private selectUserData$ = this._store.pipe(select(selectUserData));
  private products$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.productCategories)));
  private currencies$ = this._store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.currencies)));

  VerificationGroupKeys = VerificationGroupKeys;

  constructor(
    private _store: Store<IAppState>,
    private toastService: ToastService,
    private chatManagerVerificatorService: ChatManagerVerificatorControllerService,
    private applicationControllerService: ApplicationControllerService,
    private brmsFinalService: BrmsFinalMatrixFrontControllerService,
    private routerURLService: RouterURLService,
    private matrixUtilService: MatrixUtilService,
    private formGroupService: FormGroupService<any, Options>,
    private creditInfoService: CreditInfoControllerService,
    private tableDataProcessingService: TableDataProcessingService
  ) {}

  ngOnInit() {
    this.checkNewMsg();
    this.getDirectories();
    this.createForm();

    this.getFinalMatrix();
    this.getNeedVerificationCreditInfo(this.applicationData);
    this.getVerifiedCreditInfo(this.applicationData);
    this.setChatInfo();
  }

  ngOnDestroy(): void {}

  onFooterButtonClick(event: FooterButtonClick): void {
    switch (event.buttonTypeClicked) {
      case 'submit': {
        this.submitForm();
        break;
      }
      case 'cancel': {
        this.navigateToDashboard();
        break;
      }
      case 'delay': {
        this.delayApp();
        break;
      }
      case 'openComments': {
        this.onCommentClick();
        break;
      }
      case 'loadToOwner': {
        this.loadCommentToVerificatorChat(event.event as string);
        break;
      }
      default: {
        break;
      }
    }
  }

  filterMatrix() {
    this.finalMatrixData = new TableData(
      !this.isWithRef ? CONSTANTS.FINAL_MATRIX_HEADERS : CONSTANTS.FINAL_MATRIX_WITH_REF_HEADERS,
      this.matrixUtilService.filterMatrix(this.finalMatrix, this.isWithRef, this.isWithProduct)
    );
  }

  changeIsWithRef(isWithRef: boolean) {
    this.isWithRef = isWithRef;
    this.isWithProduct = null;

    this.filterMatrix();
  }

  changeIsWithProduct(isWithProduct: number) {
    this.isWithProduct = isWithProduct;

    this.filterMatrix();
  }

  editedRow(rowValue: TableDataOptions, groupName: string) {
    const creditInfoDto = new CreditInfoDto(rowValue);

    this.tableDataProcessingService
      .editedRow(creditInfoDto, groupName)
      .pipe(untilDestroyed(this))
      .subscribe(value => null, err => this.toastService.viewMsg('ErrorMessage.NotEdited', 'error'));
  }

  private setChatInfo() {
    this.chatManagerVerificatorService
      .getAllByApplicationId(this.applicationData.id.toString())
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        res.sort(function(a, b) {
          // @ts-ignore
          return new Date(b.createdDate) - new Date(a.createdDate);
        });
        this.chatManagerVerificatorList = res;
      });

    this.isNewMessageExists = this.applicationData.newMessageULChat;
  }

  private checkNewMsg() {
    this.isNewMessageExists = this.applicationData.newMessageUMChat || this.applicationData.newMessageULChat;
  }

  private createForm() {
    this.form = this.formGroupService.createForm(this.applicationData, this.formConfig, this.optionsList);
  }

  private getDirectories() {
    combineLatest([this.products$, this.selectUserData$, this.currencies$])
      .pipe(
        take(1),
        untilDestroyed(this)
      )
      .subscribe(([productCategories, user, currencies]) => {
        this.setCurrentUserData<UserDto>(user);
        this.optionsList[OptionListNames.Product] = getOnlyActiveItems<ProductRes>(productCategories);
        this.optionsList[OptionListNames.Currencies] = getOnlyActiveItems<Dir>(currencies);
      });
  }

  private setCurrentUserData<T extends UserDto>(res: T) {
    if (res) {
      this.userData = res;
    }
  }

  private getFinalMatrix() {
    this.brmsFinalService
      .getPreapproveMatrix(this.applicationData.id.toString())
      .pipe(untilDestroyed(this))
      .subscribe((matrix: BRMSFinalMatrixDto[]) => {
        this.finalMatrix = matrix;
        this.filterMatrix();
      });
  }

  // private getNeedVerificationCreditInfo(applicationData: Application) {
  //   if (applicationData && applicationData.needVerificationCreditInfo) {
  //     this.needVerificationCreditInfoData = new TableData(CONSTANTS.FINAL_CREDIT_INFO_HEADERS, [
  //       applicationData.needVerificationCreditInfo
  //     ]);
  //   }
  // }

  private getNeedVerificationCreditInfo(applicationData: Application) {
    if (applicationData && applicationData.finalCreditInfo) {
      this.needVerificationCreditInfoData = new TableData(CONSTANTS.FINAL_CREDIT_INFO_HEADERS, [
        applicationData.finalCreditInfo
      ]);
    }
  }

  private getVerifiedCreditInfo(applicationData: Application) {
    if (applicationData && applicationData.verifiedCreditInfo) {
      this.verifiedCreditInfo.push(applicationData.verifiedCreditInfo);
    }
  }

  private delayApp() {
    this.navigateToDashboard();
  }

  private submitForm() {
    if (!this.editableTableComponent.checkValidationFirstRow()) {
      this.toastService.viewMsg('ErrorMessage.NoAcceptedCreditInfo', 'warning');
      return;
    }

    this.applicationControllerService
      .acceptApp(this.applicationData.id.toString(), this.language)
      .subscribe((res: any) => {
        if (!res) {
          this.toastService.viewMsg('SuccessMessage.SentForProcessing', 'success');
          this.navigateToDashboard();
        } else {
          this.isLoading = false;
          this.toastService.viewMsg(res.message, 'warning');
        }
      });
  }

  private loadCommentToVerificatorChat(comment: string) {
    this.chatManagerVerificatorService
      .save({
        applicationId: this.applicationData.id,
        createdBy: this.userData,
        createdDate: new Date(),
        comment
      })
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  private onCommentClick() {
    if (!!this.isNewMessageExists && !this.readonlyForm) {
      this.applicationControllerService
        .readAllMessageChat(this.applicationData.id)
        .pipe(untilDestroyed(this))
        .subscribe(_ => (this.isNewMessageExists = false));
    }
  }

  private navigateToDashboard() {
    this.routerURLService.navigateToDashboard(OPERATIONS_NAMES.Lending);
  }
}
