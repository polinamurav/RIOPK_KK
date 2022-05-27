import { Component, OnInit } from '@angular/core';

import { SidebarLink } from '@app/_models';

@Component({
  selector: 'ngx-directories-page',
  templateUrl: './directories-page.component.html'
})
export class DirectoriesPageComponent implements OnInit {
  sidebarLinkList: SidebarLink[] = [
    { name: 'Directories.CreditManagerRefusalReasons', link: 'declines' },
    { name: 'Directories.BankBranches', link: 'bankBranch' },
    // { name: 'Отделы банка', link: 'department' },
    { name: 'Directories.Countries', link: 'countries' },
    { name: 'Directories.CurrencyCodes', link: 'currency' },
    // { name: 'Категория товара', link: 'dir-goods' },
    // { name: 'Партнеры', link: 'dir-partner' },
    // { name: 'Каналы продаж', link: 'salesChanel' },
    // { name: 'Коды операторов мобильной связи', link: 'operatorCode' },
    // { name: 'Предодобренные заявки', link: 'preApprovedCredit' },
    { name: 'Directories.CreditPurpose', link: 'creditPurpose' },
    // { name: 'Образование', link: 'education' },
    { name: 'Directories.ActivitiesTypes', link: 'activities' },
    { name: 'Directories.FamilyConnections', link: 'familyRelationship' },
    { name: 'Directories.NumberEmployee', link: 'numberEmployee' },
    // { name: 'Виды проживания', link: 'accommodationType' },
    { name: 'Directories.CallCenterEmployeeRefusalReasons', link: 'callCenterDecline' },
    // { name: 'Организационно правовая структура работодателя', link: 'employmentLegalType' },
    // { name: 'Категории публичных должностных лиц', link: 'ipdl' },
    // { name: 'Причины отсутствия ИНН', link: 'innAbsenceReason' },
    // { name: 'Типы связи', link: 'communicationType' },
    { name: 'Directories.IncomeTypes', link: 'incomeType' },
    { name: 'Directories.PlannedOperations', link: 'operationType' },
    { name: 'Directories.FATCA', link: 'fatca' },
    { name: 'Directories.OperationsFrequencyAndVolume', link: 'operation-freq-type' },
    // { name: 'Подписанты', link: 'signer' },
    // { name: 'Регионы', link: 'region' },
    { name: 'Directories.Localities', link: 'city' },
    // { name: 'Directories.PaymentCards', link: 'payment-card' },
    { name: 'Directories.UnderwriterRefusalReasons', link: 'decision-maker-decline-reason' },
    // { name: 'Статусы телефонной верификации', link: 'call-status' },
    { name: 'Directories.InsuranceTypes', link: 'insurance-types' },
    // { name: 'Сегменты', link: 'segments' },
    // { name: 'Результат выезда на место бизнеса', link: 'inspection-result' },
    { name: 'Directories.PreApprovedClientsFactors', link: 'preapproved-factor' },
    // { name: 'Directories.CommissionCodes', link: 'abs-commission' },
    // { name: 'Тип клиента по ИНН', link: 'inn-type' },
    // { name: 'Статус ИНН', link: 'inn-status' },
    { name: 'Directories.Declines', link: 'ensure-type' },
    { name: 'Directories.IssueType', link: 'issue-type' },
    { name: 'Directories.ScheduleFrequency', link: 'schedule-frequency' },
    { name: 'Directories.IncomeFrequency', link: 'income-frequency' },
    { name: 'Directories.JobPosition', link: 'job-position' },
    { name: 'Directories.Tariff', link: 'tariff' },
    { name: 'Directories.RBP', link: 'rbp' }
  ];

  constructor() {}

  ngOnInit() {}
}
