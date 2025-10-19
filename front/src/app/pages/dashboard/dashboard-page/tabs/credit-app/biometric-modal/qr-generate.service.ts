import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QrGenerateService {

  private _refreshInterval = 10000; // 10 секунд

  private _qrTokenValue = '';

  constructor() { }

  get qrToken() {
    return this._qrTokenValue;
  }

  generateQrToken(){
    this.fetchToken();
    setInterval(() => this.fetchToken(), this._refreshInterval);
  }

  fetchToken(): void {
    const timestamp = Date.now();
    this._qrTokenValue = `&active=false&ts=${timestamp}`;
  }

}
