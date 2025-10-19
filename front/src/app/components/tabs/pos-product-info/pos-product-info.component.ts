import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Application, PosRkkDataDto} from "@app/_models";
import {PosUsersResourceService} from "@app/api/pos-users-resource.service";
import {tap} from "rxjs/operators";
import {ELanguageType} from "@app/constants/language";
import {PosProductInfoDataService} from "@app/components/tabs/pos-product-info/pos-product-info-data.service";


@Component({
  selector: 'ngx-pos-product-info',
  templateUrl: './pos-product-info.component.html',
  styleUrls: ['./pos-product-info.component.scss']
})
export class PosProductInfoComponent implements OnInit , OnDestroy{

  @Input() applicationData: Application;
  @Input() language: string;

  ELanguageType = ELanguageType;


  constructor(
   private posProductInfoDataService: PosProductInfoDataService
  ) { }

  get posRkkDataDto() {
    return this.posProductInfoDataService.posRkkDataDto;
  }

  get totalCost() {
    return this.posProductInfoDataService.totalCost
  }

  ngOnInit(): void {
    this.posProductInfoDataService.init(this.applicationData);
  }

  ngOnDestroy() {
    this.posProductInfoDataService.destroy()
  }

}
