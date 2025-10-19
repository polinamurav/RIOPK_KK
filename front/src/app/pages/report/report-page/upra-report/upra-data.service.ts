import { Injectable } from '@angular/core';
import {ReportControllerService} from "@app/api";
import {OptionListNames, PaginationAndSortingDto, TableData, TableDataHeader} from "@app/_models";
import {pluck, tap} from "rxjs/operators";
import {URPAReportBatchDto} from "@app/pages/report/report-page/upra-report/models";
import {MatDialog} from "@angular/material/dialog";
import {
  CreateUpraReportModalComponent, ICreateUpraReportModalConfig
} from "@app/pages/report/report-page/upra-report/create-upra-report-modal/create-upra-report-modal.component";



const ColNameProps: TableDataHeader[]  =  [
  new TableDataHeader('created', 'TableHeader.DateCreation', 'date', 'created'),
  new TableDataHeader('name', 'Название пакета', 'string', 'name'),
  new TableDataHeader('fileName', 'Список клиентов', 'link', 'fileName'),
  new TableDataHeader('dirURPABatchStatus.nameRu', 'Статус', 'ru', 'dirURPABatchStatus.nameRu'),
  new TableDataHeader('dirURPABatchStatus.nameAm', 'Статус', 'am', 'dirURPABatchStatus.nameAm'),
];


@Injectable()
export class UpraDataService {

  private _config = {
    selectedPage: 1,
    totalCount: 0,
    itemLimit: 20,
  }
  private _params: PaginationAndSortingDto = {
    page: this._config.selectedPage - 1,
    size: this._config.itemLimit
  };

  private _dataSource: TableData<URPAReportBatchDto> = new TableData(ColNameProps, []);

  constructor(
    private dialog: MatDialog,
    private reportControllerService: ReportControllerService
  ) { }

  get config() {
    return this._config;
  }

  get dataSource() {
    return this._dataSource;
  }

  init(){
    this.fetchTable();
  }

  refresh(){
    this.fetchTable();
  }

  addUpra(data: URPAReportBatchDto, isEdit?: boolean)  {
    this.openUpdaModal(data, isEdit);
  }

  onlinkEvent(data: {row: URPAReportBatchDto, code: string}): void {
    console.log('data', data)
    if(data.code === 'fileName') {
      this.reportControllerService.downloadClients(data.row.id);
    }
  }

  selectedPageEvent(pageNumber: number){
    this.config.selectedPage = pageNumber - 1;
    this._params = {
      page: this.config.selectedPage.toString(),
      size: this.config.itemLimit.toString(),
    }
    this.fetchTable();
  }

  private fetchTable = () => {
    this.reportControllerService.getUpraPage(this._params).pipe(
      tap(res => {
        this.config.totalCount = res.totalElements;
      }),
      pluck('content'),
      tap(content => {


        this._dataSource = new TableData(ColNameProps, content)


        this._dataSource.tableDataHeader[3].setCellClick(this.setCelConfigForPackage())
        this._dataSource.tableDataHeader[4].setCellClick(this.setCelConfigForPackage())
        this._dataSource.tableDataHeader[1].setCellClick({
          clickEvent:  (item: URPAReportBatchDto) => {
            this.openUpdaModal(item, true);
          },
        })

    })).subscribe()
  }

  private setCelConfigForPackage = () => {
    return {
      class: (item: URPAReportBatchDto) => item.dirURPABatchStatus && item.dirURPABatchStatus.id === 'CREATED' ? 'link' : '',
      visible: () => true,
      clickEvent:  (item: URPAReportBatchDto) => {
        this.createURPAReport(item);
      },
    }
  }

  private createURPAReport = (item: URPAReportBatchDto) => {
    if(item.dirURPABatchStatus && item.dirURPABatchStatus.id === 'CREATED') {
      this.reportControllerService.createURPAReport(item.id).pipe(tap(data => {
        this.fetchTable();
      })).subscribe()
    }
  }

  private openUpdaModal(data: URPAReportBatchDto, isEdit?: boolean)  {

    if(isEdit && data.dirURPABatchStatus && data.dirURPABatchStatus.id !== 'CREATED') {
      return
    }

    const config: ICreateUpraReportModalConfig ={
      title: isEdit ? 'Редактировать пакет документов' : 'Новый пакет документов',
      item: data
    }
    const dialogRef = this.dialog.open(CreateUpraReportModalComponent, {
      width: '30vw',
      data: config
    }).afterClosed().pipe(tap(res => {
      if(res === 'SAVED') {
        this.refresh();
      }
    })).subscribe();
  }


}
