import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  DirBranchControllerService,
  DirectoriesService,
  DirSalesChannelControllerService, ProductCategoryControllerService,
  ReportControllerService
} from '@app/api';
import {catchError, tap} from 'rxjs/operators';
import {DirOnlineHistoryReportStatusDto} from "@app/pages/report/report-page/upra-report/models";
import moment from 'moment';
import {ToastService} from "@app/services/toast.service";
import { EInputType, ELocalNames, ValueType } from '@app/_models';
import {BehaviorSubject, combineLatest, of} from 'rxjs';
import {
  DirTradingCompanyPointDto
} from '@app/pages/administration/administration-page/trading-company-points/model/dir-trading-company-point-dto';
import { TranslateService } from '@ngx-translate/core';

export interface ReportField {
  id: string;
  label: string;
  selected: boolean;
  originalFields?: string[];
}

export interface ReportBlock {
  id: string;
  name: string;
  selected: boolean;
  fields: ReportField[];
}

export interface ReportFieldsResponse {
  [category: string]: {
    [fieldId: string]: string;
  };
}

@Component({
  selector: 'ngx-report-pos',
  templateUrl: './report-data.component.html',
  styleUrls: ['./report-data.component.scss']
})
export class ReportDataComponent implements OnInit {

  infoBlocks: ReportBlock[] = [];
  ValueType = ValueType;
  isLoading = false;
  language: string = this.translateService.currentLang;

  status: DirOnlineHistoryReportStatusDto;

  reportForm = new FormGroup({
    createdFrom: new FormControl(null, Validators.required),
    createdTo: new FormControl(null, Validators.required),
    issuedFrom: new FormControl(null),
    issuedTo: new FormControl(null),
    productIds: new FormControl([]),
    salesChannelIds: new FormControl([]),
    branchCodes: new FormControl([]),
    statusReportsIds: new FormControl([]),
  })

  optionsList: Record<string, any[]> = {
    applicationStatusId: [],
    product: [],
    branches: [],
    branchesForSelect: [],
    channelsList: [],
  };

  private dataLoaded = false;

  constructor(
    private toastService: ToastService,
    private reportControllerService: ReportControllerService,
    private productCategoryControllerService: ProductCategoryControllerService,
    private dirBranchControllerService: DirBranchControllerService,
    private dirSalesChannelService: DirSalesChannelControllerService,
    private directoriesService: DirectoriesService,
    private translateService: TranslateService
  ) {
  }

  getPropertyName(): string {
    return this.language === 'am' ? ELocalNames.NameAm : ELocalNames.NameRu;
  }

  toggleAllFields(block: ReportBlock, isChecked: boolean): void {
    block.selected = isChecked;
    block.fields.forEach(field => field.selected = isChecked);
  }

  onFieldChange(block: ReportBlock, field: ReportField, isChecked: boolean): void {
    field.selected = isChecked;
    this.checkBlockState(block);
  }

  checkBlockState(block: ReportBlock): void {
    const allFieldsSelected = block.fields.every(field => field.selected);
    const someFieldSelected = block.fields.some(field => field.selected);

    if (allFieldsSelected) {
      block.selected = true;
    } else if (!someFieldSelected) {
      block.selected = false;
    } else {
      block.selected = false;
    }
  }

  ngOnInit(): void {
    this.loadInitialData();
    this.loadReportFields();
  }

  getReport() {
    if(this.reportForm.valid) {
      this.isLoading = true;

      const selectedFields = this.getSelectedFields();
      const formValues = this.reportForm.value;

      if ((formValues.issuedFrom && !formValues.issuedTo) || (!formValues.issuedFrom && formValues.issuedTo)) {
        this.toastService.viewMsg('Даты выдачи должны быть обе указаны', 'error');
        this.isLoading = false;
        return;
      }

      const extractValues = (items: any[], property: string): string[] => {
        if (!items) return null;
        if (Array.isArray(items)) {
          return items.map(item => item[property] || item).filter(Boolean);
        }
        return null;
      };

      const extractIds = (items: any[]): string[] => {
        if (!items) return null;
        if (Array.isArray(items)) {
          return items.map(item => item.id || item).filter(Boolean);
        }
        return null;
      };

      const extractNumberIds = (items: any[]): number[] => {
        if (!items) return null;
        if (Array.isArray(items)) {
          return items.map(item => Number(item.id || item)).filter(id => !isNaN(id));
        }
        return null;
      };

      const reportData: any = {
        createdFrom: this.formatDate(formValues.createdFrom),
        createdTo: this.formatDate(formValues.createdTo),
        reportFields: selectedFields
      };

      if (formValues.issuedFrom && formValues.issuedTo) {
        reportData.issuedFrom = this.formatDate(formValues.issuedFrom);
        reportData.issuedTo = this.formatDate(formValues.issuedTo);
      }

      const productIds = extractNumberIds(formValues.productIds);
      if (productIds && productIds.length > 0) {
        reportData.productIds = productIds;
      }

      const salesChannelIds = extractNumberIds(formValues.salesChannelIds);
      if (salesChannelIds && salesChannelIds.length > 0) {
        reportData.salesChannelIds = salesChannelIds;
      }

      const branchCodes = extractValues(formValues.branchCodes, 'code');
      if (branchCodes && branchCodes.length > 0) {
        reportData.branchCodes = branchCodes;
      }

      const statusReportsIds = extractIds(formValues.statusReportsIds);
      if (statusReportsIds && statusReportsIds.length > 0) {
        reportData.statusReportsIds = statusReportsIds;
      }

      this.reportControllerService.getReportData(reportData, () => {
        this.isLoading = false;
      });
    } else {
      this.showError();
    }
  }

  private getSelectedFields(): string[] {
    const selectedFields: string[] = [];

    this.infoBlocks.forEach(block => {
      if (block.selected) {
        block.fields.forEach(field => {
          if (field.originalFields) {
            selectedFields.push(...field.originalFields);
          }
        });
      } else {
        block.fields.forEach(field => {
          if (field.selected && field.originalFields) {
            selectedFields.push(...field.originalFields);
          }
        });
      }
    });

    return selectedFields;
  }

  private loadReportFields(): void {
    this.isLoading = true;
    this.reportControllerService.getReportFields().pipe(
        tap((apiFields: ReportFieldsResponse) => {
          this.infoBlocks = this.fieldsToBlocks(apiFields);
          this.isLoading = false;
        }),
        catchError(error => {
          this.isLoading = false;
          return of([]);
        })
    ).subscribe();
  }

  private fieldsToBlocks(apiResponse: ReportFieldsResponse): ReportBlock[] {
    const blocks: ReportBlock[] = [];

    const categoryNames = Object.keys(apiResponse);

    for (const categoryName of categoryNames) {
      const subCategories = apiResponse[categoryName];

      const newBlock: ReportBlock = {
        id: categoryName,
        name: categoryName,
        selected: false,
        fields: []
      };

      const subCategoryNames = Object.keys(subCategories);

      for (const subCategoryName of subCategoryNames) {
        const fieldsObject = subCategories[subCategoryName];

        const keysName = Object.values(fieldsObject);

        const newField: ReportField = {
          id: subCategoryName,
          label: subCategoryName,
          selected: false,
          originalFields: keysName
        };

        newBlock.fields.push(newField);
      }

      blocks.push(newBlock);
    }

    return blocks;
  }

  private loadInitialData() {
    if (this.dataLoaded) {
      return;
    }

    combineLatest([
      this.directoriesService.getStatusReportsDir(), // статус
      this.productCategoryControllerService.getAllActive(), // продукт
      this.dirBranchControllerService.getList(), // филиал
      this.dirSalesChannelService.getList(), // канал продаж
    ]).pipe(
      tap(([applicationStatusId, product, branches, channelsList]) => {
        branches.forEach(b => {
          b.nameRu = b.code.slice(4, 8) + ' ' + b.nameRu;
          b.nameAm = b.code.slice(4, 8) + ' ' + b.nameAm;
        })

        this.optionsList = {
          ...this.optionsList,
          applicationStatusId,
          product,
          branches,
          branchesForSelect: branches,
          channelsList,
        };

        this.dataLoaded = true;
      })
    ).subscribe();
  }

  private formatDate(date: Date): string {
    return moment(date).format('YYYY-MM-DD');
  }

  private showError = () => {
    this.toastService.viewMsg('ErrorMessage.ReportOnlineErrorDates', 'error');
  }
}
