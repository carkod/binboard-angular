import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'client/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable()
export class AppLoadService {
 
  recvWindow: number;
  symbol: string;
  constructor(private httpClient: HttpClient) { }
 
  getSettings(): Promise<any> {
    const settingsType = '/global';
    const promise = this.httpClient.get(environment.db.base + environment.db.settings + settingsType)
    .pipe(tap((settings: any) => this.recvWindow = settings.recvWindow))
    .toPromise().then(settings => settings);
    return promise;
  }
}