import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApiServiceService {
    //  REST_URL = 'http://localhost:8000/';
    REST_URL = 'https://page-brunella.herokuapp.com/';

    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    getAll(endPoint: string): Observable<any[]> {
        return this.http.get<any[]>(this.REST_URL + endPoint + '/')
            .pipe(
                retry(2),
                catchError(this.handleError)
            );
    };

    getOne(endPoint: string, id: number): Observable<any> {
        return this.http.get<any>(this.REST_URL + endPoint + '/' + id + '/')
            .pipe(
                retry(2),
                catchError(this.handleError)
            );
    };

    create(endPoint: string, member: Object): Observable<any> {
        console.log("Tentou criar..");
        console.log(member);
        console.log(this.REST_URL + endPoint + '/');
        return this.http.post(this.REST_URL + endPoint + '/', member)
            .pipe(
                retry(2),
                catchError(this.handleError)
            );
    };

    update(endPoint: string, id: number, member: Object): Observable<any> {
        return this.http.put<any>(this.REST_URL + endPoint + '/' + id + '/', member)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    };

    delete(endPoint: string, id: number): Observable<any> {
        return this.http.delete(this.REST_URL + endPoint + '/' + id + '/')
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    };

    // Manipulação de erros
    handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Erro ocorreu no lado do client
            errorMessage = error.error.message;
        } else {
            // Erro ocorreu no lado do servidor
            errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    };
}
