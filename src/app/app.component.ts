import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private http: HttpClient) {
    this.getUser()
      .map(e => e[0]['login'])
      .mergeMap(e => this.doNextThing(e))
      .subscribe(e => {
        console.log(e)
      })
  }
  getUser(): Observable<any> {
    return this.http.get('https://api.github.com/search/users?q=pramoth')
      .map(e => e['items']);
  }
  doNextThing(e: any): Observable<any> {
    return this.http.get(`https://api.github.com/users/${e}/followers`)
  }
}
