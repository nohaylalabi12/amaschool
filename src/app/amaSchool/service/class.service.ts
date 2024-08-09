import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Grade} from "../models/grade";
import {ClassRequest, ClassResponse} from "../models/class";

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private apiUrl = `${environment.apiBaseUrl}classe`;
  constructor(private http: HttpClient) { }

  getAllClass(page: number,size:number): Observable<any> {
    let params : any = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());

    return this.http.get<any>(`${this.apiUrl}`,{params}).pipe(
        map(response => {
          const classes: ClassResponse[] = response.content;
          const totalElements: number = response.totalElements;
          return { classes, totalElements };
        })
    );
  }

  getClassByCode(classCode: string) {
    let params : any = new HttpParams();
    if( classCode !== undefined && classCode !== null && classCode !== '') {
      params = params.append("classeCode",classCode);
    }

    return this.http.get<any>(`${this.apiUrl}`,{params}).pipe(
        map(response => {
          const classes: ClassResponse[] = response.content;
          const totalElements: number = response.totalElements;
          console.log(response.content)
          return { classes, totalElements };
        })
    );
  }

  addClass(classe: ClassRequest): Observable<ClassResponse> {
    return this.http.post<ClassResponse>(this.apiUrl, classe);

  }
  updateClass(classe: ClassRequest): Observable<ClassResponse> {
    return this.http.put<ClassResponse>(this.apiUrl,  classe);

  }
  deleteClass(code:any) {
    return this.http.delete<void>(this.apiUrl+"?classeCode="+code);
  }
}
