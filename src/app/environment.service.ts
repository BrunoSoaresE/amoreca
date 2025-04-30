import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { environment as RC } from '../environments/environment.RC';
import { environment as STABLE } from '../environments/environment.STABLE';
import { environment } from '../environments/environment';

@Injectable()
export class EnvironmentService {
  public static settings: any = environment;

  constructor(private http: HttpClient) {
  }

  load() {
    const jsonFile2 = '../assets/config/config.json';
    return this.http
      .get(jsonFile2)
      .pipe(
        tap((response: any) => {
          EnvironmentService.settings = getSettings(response.ambiente);
        })
      )
      .toPromise();
  }
}


export const getSettings = (ambiente: string) => {
  console.log(`#AMBIENTE: ${ambiente}`);
  switch (ambiente) {
    case 'RC':
      return RC;
    case 'STABLE':
      return STABLE;
    default:
      return environment;
  }
};

export default EnvironmentService.settings;
