import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RemoteServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RemoteServiceProvider {

  apiurl: string = "https://newsapi.org/v1/articles?source={source}&sortBy={sortBy}&apiKey=0d1d916fb7154fc6955a453c76f36475";

  constructor(public http: Http) {
  }

  getNewsData(channel, sortBy) {
    return this.http.get(this.apiurl.replace("{source}", channel).replace("{sortBy}", sortBy));
  }
}
