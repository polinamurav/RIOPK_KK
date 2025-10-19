import { ChangeDetectorRef, Injectable } from '@angular/core';
import { PreapproveBaseResourcesService } from '@app/api/preapprove-base-resources.service';
import { catchError, finalize, tap } from 'rxjs/operators';
import { ButtonsSettings, PreapproveBaseDto } from '@app/_models/api-models/preapprove-base-dto';
import { BehaviorSubject, forkJoin, throwError } from 'rxjs';
import { BaseFormField, ResponseCommonDto, TableData } from '@app/_models';
import {
  PREAPPROVE_BASE_ACTIVATED,
  PREAPPROVE_BASE_IN_WORK
} from '@app/pages/pre-approved-offers/pre-approved-offers/pre-approved-bases-list/PreapproveBaseListConfig';
import { DownloadUploadFileService } from '@app/services/download-upload-file.service';
import { BASE_RUN_CONFIG } from '@app/pages/pre-approved-offers/pre-approved-offers/modals/create-new-pre-approved-base-modal/preapprove-base-form-config';
import * as _ from 'lodash';
import { FormGroupService } from '@app/services/form-group.service';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FileDownloaderComponent } from '@app/shared/components/file-downloader/file-downloader.component';
import { MimeTypes } from '@app/components/constants/mime-types';
import {
  CreateNewPreApprovedBaseModal,
  CreateNewPreApprovedBaseModalComponent
} from '@app/pages/pre-approved-offers/pre-approved-offers/modals/create-new-pre-approved-base-modal/create-new-pre-approved-base-modal.component';
import { config } from '../../../../../assets/configurations/configurationFile';
import { PreapproveExecutionDto } from '@app/_models/api-models/preapprove-execution-dto';
import { PreapproveExecutionResourcesService } from '@app/api/preapprove-execution-resources.service';
import { ToastService } from '@app/services/toast.service';

export enum PreapproveStatusesEnum {
  CREATED = 'CREATED',
  CALCULATING = 'CALCULATING',
  CALCULATING_DONE = 'CALCULATING_DONE',
  ACTIVATED = 'ACTIVATED',
  DEACTIVATED = 'DEACTIVATED',
  STOPPED = 'STOPPED'
}

export interface ProcessStrategyBtnConfig {
  name: string;
  show: boolean;
  disabled: boolean;
  action: () => void;
}

@Injectable()
export class PreApprovedBasesListDataService {
  private _acceptAgreement = [
    MimeTypes.PDF,
    MimeTypes.PNG,
    MimeTypes.DOC,
    MimeTypes.DOCX,
    MimeTypes.XLS,
    MimeTypes.XLSX,
    MimeTypes.JPG
  ];

  private _strategyActionsConfig: ProcessStrategyBtnConfig[] = [];

  private _preapproveBaseInWorkTable: TableData<PreapproveBaseDto> = new TableData<PreapproveBaseDto>(
    PREAPPROVE_BASE_IN_WORK,
    []
  );

  private _preapproveBaseInActivatedTable: TableData<PreapproveBaseDto> = new TableData<PreapproveBaseDto>(
    PREAPPROVE_BASE_ACTIVATED,
    []
  );

  private _preapproveBaseList$ = new BehaviorSubject<PreapproveBaseDto[]>(null);

  private _preapproveExecutionList$ = new BehaviorSubject<PreapproveExecutionDto[]>(null);

  private _baseProcessRunConfig: BaseFormField[] = _.cloneDeep(BASE_RUN_CONFIG);

  private _baseListLoading$ = new BehaviorSubject<boolean>(false);

  private _selectedBase$ = new BehaviorSubject<PreapproveBaseDto>(null);

  private _selectedBaseId: number;

  private _baseProcessRunForm: FormGroup;

  private _completedClients = new BehaviorSubject<number>(null);

  private _currentStatus$ = new BehaviorSubject<string>(null);

  private _isLoading: boolean = false;

  private _errorMessage: string;

  private isDeactivateBaseProcess: boolean = false;

  constructor(
    private readonly dialog: MatDialog,
    private toastService: ToastService,
    private readonly formGroupService: FormGroupService<any, any>,
    private readonly downloadUploadFileService: DownloadUploadFileService,
    private readonly preapproveBaseResourcesService: PreapproveBaseResourcesService,
    private readonly preapproveExecutionResourcesService: PreapproveExecutionResourcesService
  ) {}

  get acceptAgreement() {
    return this._acceptAgreement;
  }

  get currentStatus$() {
    return this._currentStatus$.asObservable();
  }

  get completedClients$() {
    return this._completedClients.asObservable();
  }

  get baseProcessRunConfig() {
    return this._baseProcessRunConfig;
  }

  get baseProcessRunForm() {
    return this._baseProcessRunForm;
  }

  get strategyActionsConfig() {
    return this._strategyActionsConfig;
  }

  get preapproveBaseInWorkTable() {
    return this._preapproveBaseInWorkTable;
  }

  get preapproveBaseInActivatedTable() {
    return this._preapproveBaseInActivatedTable;
  }

  get preapproveBaseList$() {
    return this._preapproveBaseList$.asObservable();
  }

  get preapproveExecutionList$() {
    return this._preapproveExecutionList$.asObservable();
  }

  get preapproveExecutionList() {
    return this._preapproveExecutionList$.getValue();
  }

  get baseListLoading$() {
    return this._baseListLoading$.asObservable();
  }

  get selectedBase$() {
    return this._selectedBase$.asObservable();
  }

  get selectedBase() {
    return this._selectedBase$.getValue();
  }

  get selectedBaseId() {
    return this._selectedBaseId;
  }

  get errorMessage() {
    return this._errorMessage;
  }

  set errorMessage(e: string) {
    this._errorMessage = e;
  }

  get isLoading() {
    return this._isLoading;
  }

  set isLoading(t: boolean) {
    this._isLoading = t;
  }

  init() {
    this.fetchPreapproveBaseList();
    this.createFormRunProcessBase();
    // this.setStrategyBtnConfig();
  }

  setBase = (base: PreapproveBaseDto): void => {
    console.log('base ===>', base);
    this._selectedBase$.next(base);
    this._selectedBaseId = base.id;
    this._baseProcessRunForm.reset();
    this.fetchPreapproveExecutionList();
    if (this.selectedBaseId) {
      this.getBaseById();
    }
  };

  fetchPreapproveBaseList = (): void => {
    this._baseListLoading$.next(true);
    this.preapproveBaseResourcesService
      .getPreapproveBaseList()
      .pipe(
        tap(data => {
          this._preapproveBaseList$.next(data);
          this._preapproveBaseInWorkTable = new TableData<PreapproveBaseDto>(
            PREAPPROVE_BASE_IN_WORK,
            this.filterBaseByTab(data)
          );
          this._preapproveBaseInActivatedTable = new TableData<PreapproveBaseDto>(
            PREAPPROVE_BASE_ACTIVATED,
            this.filterBaseByTab(data, true)
          );
          this._baseListLoading$.next(false);
        })
      )
      .subscribe();

    this.fetchPreapproveExecutionList();

    if (this.selectedBase) {
      this.getBaseById();
    }
  };

  fetchPreapproveExecutionList = (): void => {
    this.preapproveExecutionResourcesService
      .getPreapproveExecutionList()
      .pipe(
        tap(data => {
          this._preapproveExecutionList$.next(data);
        })
      )
      .subscribe();
  };

  deactivateBase = (event: PreapproveBaseDto): void => {
    if (!this.isDeactivateBaseProcess) {
      this.isDeactivateBaseProcess = true;
      this.isLoading = true;
      this.preapproveBaseResourcesService
        .deactivateBase(event.id)
        .pipe(
          tap(this.fetchPreapproveBaseList),
          finalize(() => {
            this.isDeactivateBaseProcess = false;
            this.isLoading = false;
          })
        )
        .subscribe();
    }
  };

  downloadBase = (): void => {
    this.preapproveBaseResourcesService.getPreapproveBaseResultsFile(this.selectedBaseId, true, true, true, () => {});
  };

  getBaseById = (): void => {
    this.isLoading = true;
    this.errorMessage = '';
    this.preapproveBaseResourcesService
      .getPreapproveBaseById(this.selectedBaseId)
      .pipe(
        tap(data => {
          this._selectedBase$.next(data.preapproveBase);
          this.getCompletedClients();
          this.setStrategyBtnConfig(data.buttonsSettings);
          this.getCurrentStatus(data.preapproveBase);
          this.isLoading = false;
        })
      )
      .subscribe();
  };

  createNewBase = (data: any, callBack?: () => void): void => {
    this.preapproveBaseResourcesService
      .createBase(data)
      .pipe(
        tap(this.fetchPreapproveBaseList),
        tap(callBack)
      )
      .subscribe();
  };

  uploadBase = (file: File, id: number): void => {
    this.preapproveBaseResourcesService
      .uploadBase(file, id)
      .pipe(tap(this.fetchPreapproveBaseList))
      .subscribe();
  };

  uploadCalculatedBase = (): void => {
    const dialogRef = this.dialog.open(FileDownloaderComponent, {
      width: '30%',
      panelClass: 'custom-panel-cls',
      data: {}
    });
    dialogRef.componentInstance.accept = this._acceptAgreement;
    dialogRef.componentInstance.showUploadBtn = true;
    dialogRef.componentInstance.isModalView = true;
    dialogRef.componentInstance.attachmentMaxSize = config.preApprovedMaxSizeBytes;

    let file = null;

    dialogRef.componentInstance.emitUploadFileEvent
      .pipe(
        tap(data => {
          this.isLoading = true;
          this.preapproveBaseResourcesService
            .uploadCalculatedBase(file, this.selectedBaseId)
            .pipe(
              tap(this.getBaseById),
              finalize(() => {
                this.isLoading = false;
              }),
              catchError(er => {
                this.toastService.viewMsg(er.error, 'error');
                return throwError(er);
              })
            )
            .subscribe();
          dialogRef.close();
        })
      )
      .subscribe();

    dialogRef.componentInstance.fileLoadedEvent
      .pipe(
        tap(data => {
          file = data.file;
        })
      )
      .subscribe();
  };

  getPreapproveBaseResultsFile = (
    isOriginal?: boolean,
    isApproved: boolean = true,
    isFileContent: boolean = false
  ): void => {
    this.isLoading = true;
    this.preapproveBaseResourcesService.getPreapproveBaseResultsFile(
      this.selectedBaseId,
      isOriginal,
      isApproved,
      isFileContent,
      () => {
        this.getBaseById();
        this.isLoading = false;
      }
    );
  };

  deleteBase = (): void => {
    this.preapproveBaseResourcesService
      .deleteBase(this.selectedBaseId)
      .pipe(
        tap(this.getBaseById),
        tap(this.fetchPreapproveBaseList)
      )
      .subscribe();
  };

  startProcess = (): void => {
    this.isLoading = true;
    this.errorMessage = '';
    this.preapproveBaseResourcesService
      .uploadPreapproveBase(this.selectedBaseId, {
        ...this.prepareToggles(),
        preapproveBaseId: this.selectedBaseId
      })
      .pipe(tap(this.fetchPreapproveBaseList))
      .subscribe((response: ResponseCommonDto) => {
        this.isLoading = false;
        if (!!response && response.statusCode === -1) {
          this._errorMessage = response.statusDesc;
        } else {
          this._errorMessage = '';
        }
      });
  };

  stopProcess = (): void => {
    this.preapproveExecutionResourcesService
      .executionStop()
      .pipe(tap(this.fetchPreapproveBaseList))
      .subscribe((response: ResponseCommonDto) => {});
  };

  activateBase = (data: any, callBack?: () => void): void => {
    this.preapproveBaseResourcesService
      .activateBase({
        ...this.selectedBase,
        ...data
      })
      .pipe(
        tap(callBack),
        tap(this.getBaseById),
        tap(this.fetchPreapproveBaseList)
      )
      .subscribe((response: ResponseCommonDto) => {
        this.isLoading = false;
        if (!!response && response.statusCode === -1) {
          this._errorMessage = response.statusDesc;
        } else {
          this._errorMessage = '';
        }
      });
  };

  private filterBaseByTab = (data: PreapproveBaseDto[], activated?: boolean): PreapproveBaseDto[] => {
    return data.filter(el =>
      activated ? el.statusId === PreapproveStatusesEnum.ACTIVATED : el.statusId !== PreapproveStatusesEnum.ACTIVATED
    );
  };

  private prepareToggles = (): any => {
    const toggles = this._baseProcessRunForm.getRawValue();
    Object.keys(toggles).forEach(key => {
      toggles[key] = !!toggles[key];
    });
    return toggles;
  };

  private getCompletedClients = (): void => {
    this.preapproveBaseResourcesService.getCompletedClients(this.selectedBaseId).subscribe(resp => {
      this._completedClients.next(resp);
    });
  };

  private createFormRunProcessBase = (): void => {
    this._baseProcessRunForm = this.formGroupService.createForm(null, this._baseProcessRunConfig, null);
  };

  private setStrategyBtnConfig = (settings: ButtonsSettings): void => {
    this._strategyActionsConfig = [
      {
        name: 'Выгрузить результат Стратегии',
        show: settings.isResultVisible,
        disabled: false,
        action: () => {
          this.getPreapproveBaseResultsFile(true);
        }
      },
      {
        name: 'Выгрузить скорректированный результат',
        show: settings.isCorrectedResultVisible,
        disabled: false,
        action: () => {
          this.getPreapproveBaseResultsFile();
        }
      },
      {
        name: 'Выгрузить исключенных',
        show: settings.isDeclinedClientsVisible,
        disabled: false,
        action: () => {
          this.getPreapproveBaseResultsFile(true, false);
        }
      },
      {
        name: 'Загрузить корректировку',
        show: settings.isUploadCorrectedVisible,
        disabled: false,
        action: this.uploadCalculatedBase
      },
      {
        name: 'Активировать базу',
        show: settings.isResultVisible,
        disabled: !settings.isActivateVisible,
        action: this.activateBaseModalOpen
      }
    ];
  };

  private activateBaseModalOpen = (): void => {
    console.log('Добавить новую базу');
    const config: CreateNewPreApprovedBaseModal = {
      baseName: this.selectedBase.details,
      isCreateNew: false
    };
    const dialogRef = this.dialog.open(CreateNewPreApprovedBaseModalComponent, {
      width: '50%',
      panelClass: 'custom-panel-cls',
      data: config
    });
  };

  private getCurrentStatus = (base: PreapproveBaseDto): void => {
    this._currentStatus$.next(base.statusNameRu);
  };
}
