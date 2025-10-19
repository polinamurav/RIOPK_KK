import { Component, OnInit } from '@angular/core';
import {UpraDataService} from "@app/pages/report/report-page/upra-report/upra-data.service";
import {URPAReportBatchDto} from "@app/pages/report/report-page/upra-report/models";



@Component({
  selector: 'ngx-upra-report',
  templateUrl: './upra-report.component.html',
  styleUrls: ['./upra-report.component.scss'],
  providers: [UpraDataService]
})
export class UpraReportComponent implements OnInit {

  constructor(
    private upraDataService: UpraDataService
  ) { }

  get config(){
    return this.upraDataService.config;
  }

  get dataSource() {
    return this.upraDataService.dataSource;
  }


  onlinkEvent(event: any) {
    this.upraDataService.onlinkEvent(event)
  }

  selectedItem(event: URPAReportBatchDto){
    this.upraDataService.addUpra(event, true);
  }


  ngOnInit(): void {
    this.upraDataService.init()
  }

  selectedPageEvent(pageNumber: number){
    this.upraDataService.selectedPageEvent(pageNumber);
  }

  addNewPackage() {
    this.upraDataService.addUpra(null, false);
  }

  refresh(){
    this.upraDataService.refresh();
  }

}
