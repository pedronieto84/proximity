import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  
  readonly path = 'http://ec2-34-250-57-63.eu-west-1.compute.amazonaws.com:8080';
  /* readonly path = 'https://jsonplaceholder.typicode.com'; */
  body: any;

  constructor(private http: HttpClient) {
  }

  dashboardGet() {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    return this.http.get(this.path + '/modulo1/encuesta/kpi', {headers});
  }
}
