import * as _ from 'lodash';

import {
  Address,
  Dir,
  DirAbsCode,
  DirCityDto,
  DirCountry,
  DirStatus,
  Directory,
  ELocalNames,
  EmptyAddress,
  ProductRes,
  UserDto,
  ValueType
} from '@app/_models';
import { Client, ClientDto } from '@app/_models/api-models/client';
import { ClientControllerService, IdentityCardControllerService, PrintingFormControllerService } from '@app/api';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { combineLatest, throwError } from 'rxjs';
import { photoImg, signatureImg } from '@app/constants/imgBase64';

import { DownloadUploadFileService } from '@app/services/download-upload-file.service';
import { FooterButtonClick } from '@app/components/tabs-footer/constants/footer-buttons.model';
import { IAppState } from '@app/store/state/app.state';
import { OPERATIONS_NAMES } from '@app/app-operation-mode/constants/operations-list';
import { PHONE_CODE } from '@app/constants/phone-code';
import { RetailDirectoriesNames } from '@app/_models/api-models/retail-directories-names';
import { RouterURLService } from '@app/services/routerURL.service';
import { ToastService } from '@app/services/toast.service';
import { TocService } from '@app/services/toc.service';
import { getOnlyActiveItems } from '@app/services/util/sort-only-active';
import { selectRetailDirectory } from '@app/store/selectors/retail-directories.selector';
import { selectUserData } from '@app/store/selectors/auth.selector';
import { take } from 'rxjs/internal/operators/take';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-clients-full-form',
  templateUrl: './clients-full-form.component.html',
  styleUrls: ['../../common-tabs-scss/full-form-common.component.scss']
})
export class ClientsFullFormComponent implements OnInit, OnDestroy {
  public fullForm: FormGroup;
  public currencies: Dir[] = [];
  public regions: Dir[] = [];
  public cities: DirCityDto[] = [];
  public status: DirStatus[] = [];
  public productCategories: ProductRes[] = [];
  public gender: DirAbsCode[] = [];
  public maritalStatuses: Dir[] = [];
  public countries: DirCountry[] = [];
  public maxIssueDate: Date = new Date();
  public companyActivityTypes: Directory[] = [];
  public passportTypes: DirAbsCode[] = [];

  public isLoading: boolean = false;
  public submitted: boolean = false;
  public footerConfigSource = 'clients.fullForm';

  public isClientDataId: boolean;
  public defaultPhotoImg = photoImg;
  public ValueType = ValueType;
  public ELocalNames = ELocalNames;

  @Input() clientData: Client;
  @Input() managerInfo: UserDto;
  @Input() isMenuVisible: boolean;
  @Input() readonlyForm: boolean = false;

  private userData: UserDto;
  private userName: string = null;
  private CLIENT_DATA: string = 'CLIENT_DATA';
  private AGREEMENT: string = 'AGREEMENT';
  private selectUserData$ = this.store.pipe(select(selectUserData));
  private currencies$ = this.store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.currencies)));
  private countries$ = this.store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.countries)));
  private regions$ = this.store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.regions)));
  private cities$ = this.store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.cities)));
  private gender$ = this.store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.gender)));
  private maritalStatuses$ = this.store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.maritalStatuses)));
  private passportType$ = this.store.pipe(select(selectRetailDirectory(RetailDirectoriesNames.passportType)));

  private companyActivityTypes$ = this.store.pipe(
    select(selectRetailDirectory(RetailDirectoriesNames.employmentActivity))
  );

  constructor(
    private store: Store<IAppState>,
    private formBuilder: FormBuilder,
    private tocService: TocService,
    private toastService: ToastService,
    private printingFormService: PrintingFormControllerService,
    private fileService: DownloadUploadFileService,
    private routerURLService: RouterURLService,
    private clientService: ClientControllerService,
    private identityCardControllerService: IdentityCardControllerService
  ) {}

  ngOnInit() {
    this.getDirectories();
    this.createForm();
    this.checkReadonly();
  }

  ngOnDestroy(): void {
    this.tocService.resetScrollSpyInfo();
  }

  onFooterButtonClick(event: FooterButtonClick): void {
    switch (event.buttonTypeClicked) {
      case 'submit': {
        this.submitForm();
        break;
      }
      case 'print': {
        this.getAgreement();
        break;
      }
      case 'cancel': {
        this.cancelApp();
        break;
      }
      default: {
        break;
      }
    }
  }

  getAgreement() {
    this.isLoading = true;

    this.printingFormService
      .getFilledClientPrintingForm(this.clientData.id, this.AGREEMENT)
      .pipe(
        catchError(err => {
          this.isLoading = false;
          return throwError(err);
        }),
        untilDestroyed(this)
      )
      .subscribe(res => {
        this.fileService.downloadFile(res, `Согласие.docx`);
        this.isLoading = false;
      });
  }

  cancelApp() {
    this.isLoading = true;

    this.navigateToDashboard();
  }

  submitForm() {
    this.submitted = true;
    if (this.fullForm.invalid) {
      this.scrollToFirstInvalid();
      return;
    }
    this.requestsPipe().subscribe((res: any) => {
      if (!res) {
        this.toastService.viewMsg('SuccessMessage.SentForProcessing', 'success');
        this.navigateToDashboard();
      } else {
        this.toastService.viewMsg(res.message, 'warning');
      }

      this.submitted = false;
    });
  }

  private requestsPipe() {
    this.isLoading = true;

    return this.identityCardControllerService
      .update({
        ...this.clientData.identityCard,
        ...this.fullForm.getRawValue().identityCard
      })
      .pipe(
        switchMap((identityCardId: number) => {
          const clientDto: ClientDto = new ClientDto(this.clientData);
          const clientFormValue: Client = this.fullForm.getRawValue();
          const regAddr: Address = this.getAddress();
          delete clientFormValue.identityCard;

          return this.clientService.update({
            ...clientDto,
            ...clientFormValue,
            identityCardId,
            regAddr,
            mobilePhone: clientDto.mobilePhone.length === 9 ? PHONE_CODE + clientDto.mobilePhone : clientDto.mobilePhone
          });
        }),
        catchError(err => {
          this.isLoading = false;
          return throwError(err);
        }),
        switchMap((clientId: number) => {
          return this.clientService.complete(clientId);
        }),
        catchError(err => {
          this.isLoading = false;
          return throwError(err);
        }),
        finalize(() => (this.isLoading = false)),
        untilDestroyed(this)
      );
  }

  private getAddress(): Address {
    const newAddress = _.omit(
      this.fullForm.getRawValue().regAddr,
      'cityParsed',
      'countryParsed',
      'regionParsed',
      'streetParsed'
    );

    return this.clientData.regAddr
      ? { ...this.clientData.regAddr, ...newAddress }
      : { ...new EmptyAddress(null), ...newAddress };
  }

  private createForm() {
    this.fullForm = this.formBuilder.group({
      birthDate:
        !!this.clientData && !!this.clientData.birthDate
          ? [{ value: new Date(this.clientData.birthDate), disabled: true }]
          : ['', [Validators.required]],
      firstName:
        !!this.clientData && !!this.clientData.firstName
          ? [{ value: this.clientData.firstName, disabled: true }]
          : ['', [Validators.required]],
      middleName:
        !!this.clientData && !!this.clientData.middleName
          ? [{ value: this.clientData.middleName, disabled: true }]
          : ['', [Validators.required]],
      lastName:
        !!this.clientData && !!this.clientData.lastName
          ? [{ value: this.clientData.lastName, disabled: true }]
          : ['', [Validators.required]],
      birthPlace:
        !!this.clientData && !!this.clientData.birthPlace
          ? [{ value: this.clientData.birthPlace, disabled: true }]
          : ['', [Validators.required]],
      genderId:
        !!this.clientData && !!this.clientData.gender && !!this.clientData.gender.id
          ? [{ value: this.clientData.gender.id, disabled: true }]
          : ['', [Validators.required]],
      citizenshipId:
        !!this.clientData && !!this.clientData.citizenship && !!this.clientData.citizenship.id
          ? [{ value: this.clientData.citizenship.id, disabled: true }]
          : ['', [Validators.required]],
      maritalStatusId:
        !!this.clientData && !!this.clientData.maritalStatus && !!this.clientData.maritalStatus.id
          ? [{ value: this.clientData.maritalStatus.id, disabled: true }]
          : ['', [Validators.required]],

      identityCard: this.formBuilder.group({
        series:
          !!this.clientData && !!this.clientData.identityCard.series
            ? [{ value: this.clientData.identityCard.series, disabled: true }]
            : ['', [Validators.required, Validators.pattern(/^AA$|^AZE$/)]],
        number:
          !!this.clientData && !!this.clientData.identityCard.number
            ? [{ value: this.clientData.identityCard.number, disabled: true }]
            : ['', [Validators.required]],
        identityCardType:
          !!this.clientData && !!this.clientData.identityCard.identityCardType
            ? [{ value: this.clientData.identityCard.identityCardType, disabled: true }]
            : [this.setPassportType(this.clientData.identityCard.series), [Validators.required]],
        pin:
          !!this.clientData && !!this.clientData.identityCard.pin
            ? [{ value: this.clientData.identityCard.pin, disabled: true }]
            : ['', [Validators.required]],
        issuedBy:
          !!this.clientData && !!this.clientData.identityCard.issuedBy
            ? [{ value: this.clientData.identityCard.issuedBy, disabled: true }]
            : ['', [Validators.required]],
        issueDate:
          !!this.clientData && !!this.clientData.identityCard.issueDate
            ? [{ value: new Date(this.clientData.identityCard.issueDate), disabled: true }]
            : ['', [Validators.required]],
        validityDate:
          !!this.clientData && !!this.clientData.identityCard.validityDate
            ? [{ value: new Date(this.clientData.identityCard.validityDate), disabled: true }]
            : ['', [Validators.required]],
        signature: [
          !!this.clientData && !!this.clientData.identityCard.signature
            ? this.clientData.identityCard.signature
            : signatureImg
        ]
      }),
      regAddress:
        !!this.clientData && !!this.clientData.regAddress
          ? [{ value: this.clientData.regAddress, disabled: true }]
          : ['', [Validators.required]],

      mobilePhone:
        !!this.clientData && !!this.clientData.mobilePhone
          ? [{ value: this.clientData.mobilePhone, disabled: true }]
          : ['', [Validators.required, Validators.minLength(9)]],

      dirCompanyActivityTypeId:
        !!this.clientData && !!this.clientData.dirCompanyActivityType
          ? { value: this.clientData.dirCompanyActivityType.id, disabled: true }
          : ['', [Validators.required]],

      regAddr: this.formBuilder.group({
        country:
          !!this.clientData && !!this.clientData.regAddr && !!this.clientData.regAddr.country
            ? [{ value: this.clientData.regAddr.country, disabled: true }]
            : ['', [Validators.required]],

        region:
          !!this.clientData && !!this.clientData.regAddr && !!this.clientData.regAddr.region
            ? [{ value: this.clientData.regAddr.region, disabled: true }]
            : ['', [Validators.required]],

        city:
          !!this.clientData && !!this.clientData.regAddr && !!this.clientData.regAddr.city
            ? [{ value: this.clientData.regAddr.city, disabled: true }]
            : ['', [Validators.required]],

        street:
          !!this.clientData && !!this.clientData.regAddr && !!this.clientData.regAddr.street
            ? [{ value: this.clientData.regAddr.street, disabled: true }]
            : ['', [Validators.required]],

        countryParsed:
          !!this.clientData && !!this.clientData.regAddr && !!this.clientData.regAddr.countryParsed
            ? [{ value: this.clientData.regAddr.countryParsed, disabled: true }]
            : [{ value: '', disabled: true }],

        regionParsed:
          !!this.clientData && !!this.clientData.regAddr && !!this.clientData.regAddr.regionParsed
            ? [{ value: this.clientData.regAddr.regionParsed, disabled: true }]
            : [{ value: '', disabled: true }],

        cityParsed:
          !!this.clientData && !!this.clientData.regAddr && !!this.clientData.regAddr.cityParsed
            ? [{ value: this.clientData.regAddr.cityParsed, disabled: true }]
            : [{ value: '', disabled: true }],

        streetParsed:
          !!this.clientData && !!this.clientData.regAddr && !!this.clientData.regAddr.streetParsed
            ? [{ value: this.clientData.regAddr.streetParsed, disabled: true }]
            : [{ value: '', disabled: true }]
      })
    });
  }

  private checkReadonly() {
    this.isClientDataId = this.clientData.clientStatus.id === this.CLIENT_DATA;

    if (this.readonlyForm || !this.isClientDataId) {
      this.fullForm.disable();
    }
  }

  private getDirectories() {
    combineLatest([
      this.selectUserData$,
      this.currencies$,
      this.countries$,
      this.regions$,
      this.cities$,
      this.gender$,
      this.maritalStatuses$,
      this.companyActivityTypes$,
      this.passportType$
    ])
      .pipe(
        take(1),
        untilDestroyed(this)
      )
      .subscribe(
        ([
          selectedUserData,
          currencies,
          countries,
          regions,
          cities,
          gender,
          maritalStatuses,
          companyActivityTypes,
          passportType
        ]) => {
          this.setCurrentUserData<UserDto>(selectedUserData);
          this.currencies = getOnlyActiveItems<Dir>(currencies);
          this.countries = getOnlyActiveItems<DirCountry>(countries);
          this.regions = getOnlyActiveItems<Dir>(regions);
          this.cities = getOnlyActiveItems<DirCityDto>(cities);
          this.gender = gender;
          this.maritalStatuses = maritalStatuses;
          this.companyActivityTypes = getOnlyActiveItems<Directory>(companyActivityTypes);
          this.passportTypes = getOnlyActiveItems<DirAbsCode>(passportType);
        }
      );
  }

  private setPassportType(ser: string) {
    if (ser === 'AA') {
      return this.passportTypes.find(type => type.code === '002');
    } else if (ser === 'AZE') {
      return this.passportTypes.find(type => type.code === '001');
    }
  }

  private navigateToDashboard() {
    this.routerURLService.navigateToDashboard(OPERATIONS_NAMES.Clients);
  }

  private scrollToFirstInvalid() {
    const firstElementWithError = document.querySelector('form').querySelector('.ng-invalid');
    if (!!firstElementWithError) {
      firstElementWithError.scrollIntoView();
    }
  }

  private setCurrentUserData<T extends UserDto>(res: T) {
    if (res) {
      this.userData = res;
    }
    if (res && res.username) {
      this.userName = res.username;
    }
  }
}
