import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  MatRippleModule
} from '@angular/material/core';
import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
  NbDialogModule,
  NbCardModule,
  NbTabsetModule,
  NbAccordionModule,
  NbSpinnerModule,
  NbRadioModule,
  NbProgressBarModule,
  NbStepperModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbSecurityModule } from '@nebular/security';

import { DEFAULT_THEME } from './styles/theme.default';
import { DARK_THEME } from './styles/theme.dark';
import { HeaderComponent } from '@app/shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { HeaderNavComponent } from '@app/shared/header/header-nav/header-nav.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule1 } from '@app/shared/components/mat-select/mat-select.module';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxMatSelectSearchModule } from '@app/shared/components/mat-select-search/ngx-mat-select-search.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMaskModule } from 'ngx-mask';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { InlineSVGModule } from 'ng-inline-svg';
import { TextMaskModule } from 'angular2-text-mask';
import { UiSwitchModule } from 'ngx-ui-switch';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { HighchartsChartModule } from 'highcharts-angular';
import { PipesModule } from '@app/pipes';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WebcamModule } from 'ngx-webcam';
import { LoaderComponent } from '@app/shared/components/loader/loader.component';
import { SearchSelectComponent } from '@app/shared/components/search-select/search-select.component';
import { LoginContainerComponent } from '@app/shared/components/login-container/login-container.component';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';
import { SidebarComponent } from '@app/shared/components/sidebar/sidebar.component';
import { TextMaskDirective } from '@app/directives/text-mask.directive';
import { CheckPermissionDirective } from '@app/directives/check-permission.directive';
import { TableComponent } from '@app/shared/components/table/table.component';
import { TableSortComponent } from '@app/shared/components/table-sort/table-sort.component';
import { PaginationComponent } from '@app/shared/components/table/pagination.component.ts/pagination.component';
import { PaginationSortComponent } from '@app/shared/components/table-sort/pagination.component.ts/pagination-sort.component';
import { LayoutComponent } from '@app/shared/layout/layout.component';
import { LayoutColmComponent } from '@app/shared/layout/layout-colm/layout-colm.component';
import { SearchFieldComponent } from '@app/shared/components/search-field/search-field.component';
import { FormSubTitleDirective } from '@app/directives/form-sub-title.directive';
import {
  ControlErrorComponent,
  ControlErrorContainerDirective,
  ControlErrorsDirective,
  FormSubmitDirective
} from '@app/directives/form-control-validation';
import { UploadModalComponent } from '@app/shared/components/modals/upload-modal/upload-modal.component';
import { SlideToggleComponent } from '@app/shared/components/slide-toggle/slide-toggle.component';
import { LayoutForStepsComponent } from '@app/shared/layout-for-steps/layout-for-steps.component';
import { LayoutForStepsColComponent } from '@app/shared/layout-for-steps/layout-for-steps-col/layout-for-steps-col.component';
import { StepperComponent } from '@app/shared/components/stepper/stepper.component';
import { RadioButtonComponent } from '@app/shared/components/radio-button/radio-button.component';
import { RadioFilterFieldsComponent } from '@app/shared/components/radio-filter-fields/radio-filter-fields.component';
import { ReportModalComponent } from '@app/shared/components/modals/report-modal/report-modal.component';
import { ChooseOptionsModalComponent } from '@app/shared/components/modals/choose-options-modal/choose-options-modal.component';
import { ConfirmModalComponent } from '@app/shared/components/modals/confirm-modal/confirm-modal.component';
import { DeactivateProductModalComponent } from '@app/shared/components/modals/deactivate-product-modal/deactivate-product-modal.component';
import { NotificationComponent } from '@app/shared/components/notification/notification.component';
import { TableModalComponent } from '@app/shared/components/modals/table-modal/table-modal.component';
import { TableAttachComponent } from '@app/shared/components/table-attach/table-attach.component';
import { TextFieldComponent } from '@app/shared/components/text-field/text-field.component';
import { SettingsModalComponent } from '@app/shared/components/modals/settings-modal/settings-modal.component';
import { NotificationSettingModalComponent } from '@app/shared/components/modals/notification-modal/notification-setting-modal.component';
import { IntegrationModalComponent } from '@app/shared/components/modals/integration-modal/integration-modal.component';
import { PrintFormModalComponent } from '@app/shared/components/modals/print-form-modal/print-form-modal.component';
import { CompanyListModalComponent } from '@app/shared/components/modals/company-list-modal/company-list-modal.component';
import { BrmsDecisionModalComponent } from '@app/shared/components/modals/brms-decision-modal/brms-decision-modal.component';
import { UserReasignModalComponent } from '@app/shared/components/modals/user-reasign-modal/user-reasign-modal.component';
import { ModalViewComponent } from '@app/shared/components/modal-view/modal-view.component';
import { ModalViewActionsComponent } from '@app/shared/components/modal-view/modal-view-actions/modal-view-actions.component';
import { HistoryModalComponent } from '@app/shared/components/modals/history-modal/history-modal.component';
import { InsuranceConditionModalComponent } from '@app/shared/components/modals/insurance-conditions-modal/insurance-condition-modal.component';
import { SearchSelectLazyComponent } from '@app/shared/components/search-select-lazy/search-select-lazy.component';
import { SearchSelectPaginationComponent } from '@app/shared/components/search-select-lazy/search-select-pagination/search-select-pagination';
import { DeclineReasonModalComponent } from '@app/shared/components/modals/decline-reason-modal/decline-reason-modal.component';
import { AdministrationBaseModalComponent } from '@app/shared/components/modals/administration-base-modal/administration-base-modal.component';
import { RuleModalComponent } from '@app/shared/components/modals/brms-rule-modal/brms-rule-modal.component';
import { WebcamModalComponent } from '@app/shared/components/modals/webcam-modal/webcam-modal.component';
import { OneColumnLayoutComponent, ThreeColumnsLayoutComponent, TwoColumnsLayoutComponent } from '@app/theme/layouts';
import { LoginLayoutComponent } from '@app/theme/layouts/login-layout/login.layout';
import { CapitalizePipe, NumberWithCommasPipe, PluralPipe, RoundPipe, TimingPipe } from '@app/theme/pipes';
import { NgxEchartsModule } from 'ngx-echarts';
import { EditableTableComponent } from '@app/shared/components/editable-table/editable-table.component';
import { DatePickerComponent } from '@app/shared/components/date-picker/date-picker.component';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { DropdownFilterComponent } from '@app/shared/components/dropdown-filter/dropdown-filter.component';
import { FormFieldComponent } from '@app/shared/components/form-field/form-field.component';
import { InputDatePickerComponent } from '@app/shared/components/input-date-picker/input-date-picker.component';
import { AccordionComponent } from '@app/shared/components/accordion/accordion.component';
import { CheckboxComponent } from '@app/shared/components/checkbox/checkbox.component';
import { DateFilterFieldsComponent } from '@app/shared/components/date-filter-fields/date-filter-fields.component';
import { CommentBoxComponent } from '@app/shared/components/comment-box/comment-box.component';
import { APP_DATE_FORMATS, DateAdapterService } from '@app/shared/components/date-picker/date-adapter.service';
import { MatSliderModule } from '@angular/material/slider';
import { UserModalComponent } from '@app/shared/components/modals/user-modal/user-modal.component';
import { SimplyModalWrapperComponent } from '@app/shared/components/simply-modal-wrapper/simply-modal-wrapper.component';
import { PreviewFileModalComponent } from '@app/shared/components/preview-file-modal/preview-file-modal.component';
import { CorpCompanySearchModalComponent } from '@app/shared/components/corp-company-search-modal/corp-company-search-modal.component';
import { FileDownloaderComponent } from '@app/shared/components/file-downloader/file-downloader.component';
import { TableDropMenuComponent } from '@app/shared/components/table-sort/table-drop-menu/table-drop-menu.component';
import { CommunicationFormComponent } from '@app/shared/components/communication-form/communication-form.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

const NB_MODULES = [
  NbLayoutModule,
  NbCardModule,
  NbAccordionModule,
  NbMenuModule,
  NbDialogModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbSecurityModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
  NbTabsetModule,
  NbSpinnerModule,
  NbProgressBarModule,
  NbRadioModule,
  NbStepperModule
];
const COMPONENTS = [
  LoginLayoutComponent,
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
  HeaderComponent,
  HeaderNavComponent,
  FooterComponent
];

const PIPES = [CapitalizePipe, PluralPipe, RoundPipe, TimingPipe, NumberWithCommasPipe];

const COMMON = [CommonModule, MatRippleModule, TranslateModule];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule1,
    MatInputModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    NgxMatSelectSearchModule,
    NgxEchartsModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatTooltipModule,
    NgxMaskModule.forRoot(),
    PerfectScrollbarModule,
    InlineSVGModule,
    TextMaskModule,
    UiSwitchModule,
    MatButtonModule,
    RouterModule,
    TranslateModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    NgbModule,
    MatTabsModule,
    MatDialogModule,
    MatExpansionModule,
    MatRadioModule,
    HighchartsChartModule,
    PipesModule,
    ScrollingModule,
    // necessary for date picker
    MatDatepickerModule,
    MatSliderModule,
    MatFormFieldModule,
    MatNativeDateModule,
    WebcamModule,
    ...COMMON,
    ...NB_MODULES
  ],
  exports: [
    // Modules
    FormsModule,
    LoginContainerComponent,
    DialogComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule1,
    MatSliderModule,
    MatInputModule,
    FormSubTitleDirective,
    FormSubmitDirective,
    ControlErrorsDirective,
    CheckPermissionDirective,
    ControlErrorComponent,
    ControlErrorContainerDirective,
    MatToolbarModule,
    MatTooltipModule,
    MatTabsModule,
    MatRadioModule,
    MatSlideToggleModule,
    NgxMatSelectSearchModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    PerfectScrollbarModule,
    InlineSVGModule,
    TextMaskModule,
    TranslateModule,
    MatDatepickerModule,
    UiSwitchModule,
    MatDialogModule,
    MatExpansionModule,
    HighchartsChartModule,
    NgbModule,
    PipesModule,

    // Components
    LoaderComponent,
    LayoutComponent,
    LayoutColmComponent,
    LayoutForStepsComponent,
    LayoutForStepsColComponent,
    EditableTableComponent,
    SidebarComponent,
    SearchSelectComponent,
    FormFieldComponent,
    DatePickerComponent,
    DropdownFilterComponent,
    SearchFieldComponent,
    ButtonComponent,
    TableComponent,
    TableSortComponent,
    PaginationComponent,
    PaginationSortComponent,
    SlideToggleComponent,
    InputDatePickerComponent,
    UserModalComponent,
    UploadModalComponent,
    AccordionComponent,
    StepperComponent,
    ReportModalComponent,
    CheckboxComponent,
    ChooseOptionsModalComponent,
    ConfirmModalComponent,
    DeactivateProductModalComponent,
    RadioButtonComponent,
    DateFilterFieldsComponent,
    RadioFilterFieldsComponent,
    NotificationComponent,
    TableModalComponent,
    CommentBoxComponent,
    TableAttachComponent,
    PrintFormModalComponent,
    CompanyListModalComponent,
    BrmsDecisionModalComponent,
    UserReasignModalComponent,
    ModalViewComponent,
    ModalViewActionsComponent,
    TextFieldComponent,
    SearchSelectLazyComponent,
    SearchSelectPaginationComponent,

    SimplyModalWrapperComponent,
    FileDownloaderComponent,
    CommunicationFormComponent,

    ...COMMON,
    ...NB_MODULES,
    ...COMPONENTS,
    ...PIPES
  ],
  entryComponents: [
    UserModalComponent,
    UploadModalComponent,
    ReportModalComponent,
    ChooseOptionsModalComponent,
    ConfirmModalComponent,
    ControlErrorComponent,
    DeactivateProductModalComponent,
    TableModalComponent,
    SettingsModalComponent,
    NotificationSettingModalComponent,
    IntegrationModalComponent,
    PrintFormModalComponent,
    CompanyListModalComponent,
    BrmsDecisionModalComponent,
    UserReasignModalComponent,
    HistoryModalComponent,
    InsuranceConditionModalComponent,
    DeclineReasonModalComponent,
    PreviewFileModalComponent,
    SimplyModalWrapperComponent,
    // ProductModalComponent,
    AdministrationBaseModalComponent,
    RuleModalComponent,
    WebcamModalComponent,
    CorpCompanySearchModalComponent
  ],
  declarations: [
    LoaderComponent,
    LoginContainerComponent,
    DialogComponent,
    SearchSelectComponent,
    FormFieldComponent,
    DatePickerComponent,
    SidebarComponent,
    TextMaskDirective,
    CheckPermissionDirective,
    ButtonComponent,
    TableComponent,
    TableSortComponent,
    PaginationComponent,
    PaginationSortComponent,
    LayoutComponent,
    LayoutColmComponent,
    DropdownFilterComponent,
    SearchFieldComponent,
    FormSubTitleDirective,
    FormSubmitDirective,
    ControlErrorsDirective,
    ControlErrorComponent,
    ControlErrorContainerDirective,
    UserModalComponent,
    UploadModalComponent,
    AccordionComponent,
    SlideToggleComponent,
    LayoutForStepsComponent,
    LayoutForStepsColComponent,
    EditableTableComponent,
    InputDatePickerComponent,
    StepperComponent,
    RadioButtonComponent,
    DateFilterFieldsComponent,
    RadioFilterFieldsComponent,
    ReportModalComponent,
    ChooseOptionsModalComponent,
    CheckboxComponent,
    ConfirmModalComponent,
    DeactivateProductModalComponent,
    NotificationComponent,
    TableModalComponent,
    CommentBoxComponent,
    TableAttachComponent,
    TextFieldComponent,
    SettingsModalComponent,
    NotificationSettingModalComponent,
    IntegrationModalComponent,
    PrintFormModalComponent,
    CompanyListModalComponent,
    BrmsDecisionModalComponent,
    UserReasignModalComponent,
    ModalViewComponent,
    ModalViewActionsComponent,
    HistoryModalComponent,
    InsuranceConditionModalComponent,
    SearchSelectLazyComponent,
    SearchSelectPaginationComponent,
    DeclineReasonModalComponent,
    PreviewFileModalComponent,
    SimplyModalWrapperComponent,
    // ProductModalComponent,

    AdministrationBaseModalComponent,
    RuleModalComponent,
    WebcamModalComponent,
    HeaderNavComponent,
    TableDropMenuComponent,
    CorpCompanySearchModalComponent,
    FileDownloaderComponent,
    CommunicationFormComponent,

    ...COMPONENTS,
    ...PIPES
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    { provide: DateAdapter, useClass: DateAdapterService },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: 'default'
          },
          [DEFAULT_THEME, DARK_THEME]
        ).providers
      ]
    };
  }
}
