import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {

  base_url: string = 'http://localhost:8080';
  end_point: string = '/api/v1';

  constructor(public http: Http) { }

  get_headers()
  {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return headers;
  }

  private extractData(res: Response)
  {
      let body = res.json();
      let result = body || { };

      return result || { };
  }

  private handleError(error: Response | any)
  {
      // In a real world app, you might use a remote logging infrastructure
      let errMsg;
      if (error instanceof Response) {
          const body = error.json() || '';

          errMsg = {status: error.status, message: body.message};

      } else {
          errMsg = {status: false, message: 'Error!'};
      }

      //console.error(errMsg);
      return Observable.throw(errMsg);
  }

  get_all()
  {
      return this.http.get(this.base_url + this.end_point)
          .map(this.extractData)
          .catch(this.handleError);
  }

  get_by_id(id)
  {
      return this.http.get(this.base_url + this.end_point + '/' + id)
          .map(this.extractData)
          .catch(this.handleError);
  }

  add(data)
  {
    return this.http.post(
                this.base_url + this.end_point,
                JSON.stringify(data),
                {headers: this.get_headers()}
            )
            .map(this.extractData)
            .catch(this.handleError);
  }

  modify(data)
  {
    return this.http.put(
                this.base_url + this.end_point + '/' + data._id,
                JSON.stringify(data),
                {headers: this.get_headers()}
            )
            .map(this.extractData)
            .catch(this.handleError);
  }

  delete_by_id(id:string)
  {
      return this.http.delete(this.base_url + this.end_point + '/' + id)
          .map(this.extractData)
          .catch(this.handleError);
  }
}
