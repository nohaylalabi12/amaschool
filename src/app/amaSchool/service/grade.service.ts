import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { Grade } from "../models/grade";

@Injectable({
  providedIn: 'root'
})
export class GradeService {

    private apiUrl = `${environment.apiBaseUrl}grade`;
    constructor(private http: HttpClient) {
    }

    page : number = 0;
    size : number = 10;
    getAllGrade(page: number,size:number): Observable<any> {
        let params : any = new HttpParams();
        params = params.append('page', page.toString());
        params = params.append('size', size.toString());

        return this.http.get<any>(`${this.apiUrl}`,{params}).pipe(
            map(response => {
                const grades: Grade[] = response.content;
                const totalElements: number = response.totalElements;
                const totalPages : number = response.totalPages;
                return { grades, totalElements,totalPages };
            })
        );
    }

    getGradeByCode(gradeCode: string) {
        let params : any = new HttpParams();
        if( gradeCode !== undefined && gradeCode !== null && gradeCode !== '') {
            params = params.append("gradeCode",gradeCode);
            console.log(params)
        }

        return this.http.get<any>(`${this.apiUrl}`,{params}).pipe(
            map(response => {
                const grades: Grade[] = response.content;
                const totalElements: number = response.totalElements;
                console.log(response.content)
                return { grades, totalElements };
            })
        );
    }

    addGrade(grade: Grade): Observable<Grade> {
        return this.http.post<Grade>(this.apiUrl, grade);

    }
    updateGrade(grade: Grade): Observable<Grade> {
        return this.http.put<Grade>(this.apiUrl, grade);

    }
    deleteGrade(code:any) {
        return this.http.delete<void>(this.apiUrl+"?gradeCode="+code);
    }
}
