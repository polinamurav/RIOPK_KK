import { Injectable } from '@angular/core';
import { BorrowerControllerService } from '@app/api/borrower-controller.service';
import { OPZFacadePostDto } from '@app/_models/api-models/opzfacade-get-dto';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BorrowersDataService {
  constructor(private readonly borrowerControllerService: BorrowerControllerService) {}

  setOpzData(data: OPZFacadePostDto): void {
    this.borrowerControllerService
      .setOpz(data)
      .pipe(
        tap(res => {
          console.log(res);
        })
      )
      .subscribe();
  }
}
