import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ApiProvider {
  url: string = "http://localhost:3000";

  constructor(public http: Http) {
  }

  doGet(service: string, params: Object): Observable<Array<any>> {
    return this.http.get(this.url + service).map(this.extractData);
  }

  private extractData(res: Response) {
    console.log(res);
    let body = res.json();
    console.log(body);
    return body || {};
  }
}
