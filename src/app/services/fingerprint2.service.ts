import { Injectable } from '@angular/core';
import * as Fingerprint2 from 'fingerprintjs2';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class Fingerprint2Service {
  private options = {
    excludes: {
      deviceMemory: true,
      language: true,
      userAgent: true,
      canvas: true,
      plugins: true,
      platform: true,
      screenResolution: true,
      timezone: true,
      enumerateDevices: true,
      pixelRatio: true,
      doNotTrack: true,
      fontsFlash: true
    }
  };

  constructor() {}

  getHash(): Observable<string> {
    return from(Fingerprint2.getPromise(this.options)).pipe(
      map(components => {
        const values = components.map(component => {
          return component.value;
        });

        const hash = Fingerprint2.x64hash128(values.join(''), 31);

        return hash;
      })
    );
  }
}
