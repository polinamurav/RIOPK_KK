import { APP_DATE_FORMATS, DateAdapterService } from '@app/shared/date-picker/date-adapter.service';
import {
  ControlErrorComponent,
  ControlErrorContainerDirective,
  ControlErrorsDirective,
  FormSubmitDirective
} from '@app/directives/form-control-validation';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatBadgeModule,
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSlideToggleModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccordionComponent } from './accordion/accordion.component';
import { AdministrationBaseModalComponent } from './modals/administration-base-modal/administration-base-modal.component';
import { BrmsDecisionModalComponent } from './modals/brms-decision-modal/brms-decision-modal.component';
import { ButtonComponent } from './button/button.component';
import { CheckPermissionDirective } from '../directives/check-permission.directive';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { ChooseOptionsModalComponent } from './modals/choose-options-modal/choose-options-modal.component';
import { ClientModalComponent } from '@app/shared/modals/client-modal/client-modal.component';
import { ClientsNavComponent } from './header/clients-nav/clients-nav.component';
import { CommentBoxComponent } from './comment-box/comment-box.component';
import { CommonModule } from '@angular/common';
import { CompanyListModalComponent } from './modals/company-list-modal/company-list-modal.component';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { DateFilterFieldsComponent } from './date-filter-fields/date-filter-fields.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { DeactivateProductModalComponent } from './modals/deactivate-product-modal/deactivate-product-modal.component';
import { DeclineReasonModalComponent } from './modals/decline-reason-modal/decline-reason-modal.component';
import { DropdownFilterComponent } from './dropdown-filter/dropdown-filter.component';
import { EditableTableComponent } from './editable-table/editable-table.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { FormSubTitleDirective } from '@app/directives/form-sub-title.directive';
import { HeaderComponent } from './header/header.component';
import { HeaderNavComponent } from './header/header-nav/header-nav.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { HistoryModalComponent } from './modals/history-modal/history-modal.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { InputDatePickerComponent } from './input-date-picker/input-date-picker.component';
import { InsuranceConditionModalComponent } from './modals/insurance-conditions-modal/insurance-condition-modal.component';
import { IntegrationModalComponent } from './modals/integration-modal/integration-modal.component';
import { LayoutComponent } from './layout/layout.component';
import { LayoutForStepsColComponent } from './layout-for-steps/layout-for-steps-col/layout-for-steps-col.component';
import { LayoutForStepsComponent } from './layout-for-steps/layout-for-steps.component';
import { LayoutСolmComponent } from './layout/layout-colm/layout-colm.component';
import { LoaderComponent } from './loader/loader.component';
import { MainContainerComponent } from '@app/shared/main-container/main-container.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule1 } from './mat-select/mat-select.module';
import { ModalViewActionsComponent } from './modal-view/modal-view-actions/modal-view-actions.component';
import { ModalViewComponent } from './modal-view/modal-view.component';
import { NewClientRequestComponent } from './modals/new-client-request/new-client-request.component';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { NgxMatSelectSearchModule } from './mat-select-search/public_api';
import { NotificationComponent } from './notification/notification.component';
import { NotificationSettingModalComponent } from './modals/notification-modal/notification-setting-modal.component';
import { PaginationComponent } from './table/pagination.component.ts/pagination.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PipesModule } from '@app/pipes';
import { PrintFormModalComponent } from './modals/print-form-modal/print-form-modal.component';
// import { ProductModalComponent } from './modals/product-modal/product-modal.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { RadioFilterFieldsComponent } from './radio-filter-fields/radio-filter-fields.component';
import { ReportModalComponent } from './modals/report-modal/report-modal.component';
import { RouterModule } from '@angular/router';
import { RuleModalComponent } from './modals/brms-rule-modal/brms-rule-modal.component';
import { SearchFieldComponent } from './search-field/search-field.component';
import { SearchSelectComponent } from './search-select/search-select.component';
import { SearchSelectLazyComponent } from './search-select-lazy/search-select-lazy.component';
import { SearchSelectPaginationComponent } from './search-select-lazy/search-select-pagination/search-select-pagination';
import { SettingsModalComponent } from './modals/settings-modal/settings-modal.component';
import { SidebarClientsComponent } from './sidebar-clients/sidebar-clients.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { StepperComponent } from './stepper/stepper.component';
import { TableAttachComponent } from './table-attach/table-attach.component';
import { TableComponent } from './table/table.component';
import { TableModalComponent } from './modals/table-modal/table-modal.component';
import { TextFieldComponent } from '@app/shared/text-field/text-field.component';
import { TextMaskDirective } from '../directives/text-mask.directive';
import { TextMaskModule } from 'angular2-text-mask';
import { TranslateModule } from '@ngx-translate/core';
import { UiSwitchModule } from 'ngx-ui-switch';
import { UploadModalComponent } from './modals/upload-modal/upload-modal.component';
import { UserReasignModalComponent } from './modals/user-reasign-modal/user-reasign-modal.component';
import { WebcamModalComponent } from './modals/webcam-modal/webcam-modal.component';
import { WebcamModule } from 'ngx-webcam';

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

    // necessary for date picker
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    WebcamModule
  ],
  declarations: [
    LoaderComponent,
    SearchSelectComponent,
    FormFieldComponent,
    DatePickerComponent,
    SidebarComponent,
    TextMaskDirective,
    CheckPermissionDirective,
    ButtonComponent,
    TableComponent,
    PaginationComponent,
    LayoutComponent,
    LayoutСolmComponent,
    HeaderComponent,
    DropdownFilterComponent,
    SearchFieldComponent,
    FormSubTitleDirective,
    FormSubmitDirective,
    ControlErrorsDirective,
    ControlErrorComponent,
    ControlErrorContainerDirective,
    ClientModalComponent,
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
    MainContainerComponent,
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
    // ProductModalComponent,
    AdministrationBaseModalComponent,
    RuleModalComponent,
    WebcamModalComponent,
    HeaderNavComponent,
    ClientsNavComponent,
    NewClientRequestComponent,
    SidebarClientsComponent
  ],
  entryComponents: [
    ClientModalComponent,
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
    // ProductModalComponent,
    AdministrationBaseModalComponent,
    RuleModalComponent,
    WebcamModalComponent
  ],
  exports: [
    // Modules
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule1,
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
    LayoutСolmComponent,
    LayoutForStepsComponent,
    LayoutForStepsColComponent,
    EditableTableComponent,
    SidebarComponent,
    SearchSelectComponent,
    FormFieldComponent,
    DatePickerComponent,
    HeaderComponent,
    DropdownFilterComponent,
    SearchFieldComponent,
    ButtonComponent,
    TableComponent,
    PaginationComponent,
    SlideToggleComponent,
    InputDatePickerComponent,
    InputDatePickerComponent,
    ClientModalComponent,
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
    MainContainerComponent,
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
    SearchSelectLazyComponent,
    SearchSelectPaginationComponent,
    HeaderNavComponent,
    ClientsNavComponent,
    SidebarClientsComponent
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-EN' },
    { provide: DateAdapter, useClass: DateAdapterService },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class SharedModule {}
