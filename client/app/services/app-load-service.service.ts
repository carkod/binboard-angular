import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'client/environments/environment';
 
@Injectable()
export class AppLoadService {
 
  constructor(private httpClient: HttpClient) { }
 
  getSettings(): Promise<any> {
    const settingsType = '/global';
    const promise = this.httpClient.get(environment.db.base + environment.db.settings + settingsType).toPromise().then(settings => settings);
    return promise;
  }
}