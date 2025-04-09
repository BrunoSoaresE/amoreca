import {Injector} from '@angular/core';
import {Observable} from 'rxjs';
import { HttpBaseService } from './http-base.service';


export abstract class BaseService extends HttpBaseService {
  /**
   * Obter endereço do environmentService
   * @protected
   */
  protected urlQuerieController;
  protected urlCommandController;

  constructor(
    injector: Injector,
    urlBase: string,
    querieControllerName: string,
    commandControllerName?: string,
  ) {
    super(injector);

    if (urlBase) {
      this.urlQuerieController = urlBase;
    }

    if (querieControllerName) {
      this.urlQuerieController = `${urlBase}/${querieControllerName}`;
      this.urlCommandController = `${urlBase}/${querieControllerName}`;
    }

    if (commandControllerName) {
      this.urlCommandController = `${urlBase}/${commandControllerName}`;
    }
  }

  get(url: string, params?: any): Observable<any> {
    return this.baseGet(this.getQuerieUrl(url), params);
  }

  post(url: string, body: any) {
    return this.basePost(this.getCommandUrl(url), body);
  }


  put(url: string, body: any) {
    return this.basePut(this.getCommandUrl(url), body);
  }

  patch(url: string, body: any) {
    return this.basePatch(this.getCommandUrl(url), body);
  }

  download(url?: string, params?: any) {
    return this.baseDownload(`${this.urlQuerieController}/${url}`, params);
  }
  downloadBase64(url: string, params?: any): Observable<any> {
    return this.baseDownloadBase64(this.getQuerieUrl(url), params);
  }

  delete(url: string, id: any, action?: string) {
    url = `${this.getCommandUrl(url)}/${id}`;

    if (action) {
      url += `/${action}`;
    }


    return this.baseDelete(url);
  }

  getQuerieUrl = (url: string) => url ? `${this.urlQuerieController}/${url}` : this.urlQuerieController as string;

  getCommandUrl = (url: string) => url ? `${this.urlCommandController}/${url}` : this.urlCommandController as string;

}
