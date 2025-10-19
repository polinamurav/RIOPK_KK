import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VersionCheckerService {

  private versionUrl = `/assets/configurations/version.json?nocache=${new Date().getTime()}`;

  private localVersion: { version: string };

  private checkInterval = 1000 * 60 * 3; // 5 минут

  constructor(
    private http: HttpClient,
  ) {
  }

  get version(){
    return this.localVersion && this.localVersion.version;
  }

  public startChecking(): void {
    this.checkVersion(); // Проверяем сразу при запуске
    setInterval(() => this.checkVersion(), this.checkInterval);
  }

  public checkVersion(): void {
    this.http.get(this.versionUrl).subscribe((serverVersion: any) => {

      if (!this.localVersion) {
        this.localVersion = serverVersion;
      }

      if (!!this.localVersion && (this.localVersion.version !== serverVersion.version)) {
        console.log('Обнаружено обновление!', {
          local: this.localVersion.version,
          remote: serverVersion.version
        });

        this.promptUserToUpdate();
      }
    });
  }

  private promptUserToUpdate(): void {
    if (confirm('Доступно обновление. Перезагрузить страницу?')) {
      window.location.reload();
    }
  }

}
