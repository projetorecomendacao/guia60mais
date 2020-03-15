import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  REST_URL = 'http://localhost:8000/';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')



  constructor(private http: HttpClient) { }

  getAll(endPoint: string) : Observable<any> {
    return this.http.get(this.REST_URL+ endPoint + '/',
                         {headers: this.httpHeaders}
    );
  };

  getOne(endPoint: string, id: number) : Observable<any> {
      return this.http.get(this.REST_URL + endPoint + '/' + id + '/', 
                            {headers: this.httpHeaders});
  };
  
  create(endPoint: string, member: object) : Observable<any> {
      return this.http.post(this.REST_URL + endPoint +'/', member, 
                            {headers: this.httpHeaders});
  };

  update(endPoint: string, id: number, value: Object): Observable<any> {
    return this.http.put(this.REST_URL + endPoint + '/' + id + '/', value, 
                          {headers: this.httpHeaders});
  }

  delete(endPoint: string, id: number) : Observable<any> {
    return this.http.delete(this.REST_URL + endPoint + '/' + id + '/', 
                          {headers: this.httpHeaders});
  };
}
