import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { TeacherSpecialty } from "../models/teacher-specialty";

@Injectable({
    providedIn: 'root'
})
export class TeacherSpecialtyService {

    private apiUrl = `${environment.apiBaseUrl}teacher-specialty`;
    constructor(private http: HttpClient) {
    }

    page : number = 0;
    size : number = 10;

    getAllTeacherSpecialties(page: number, size: number): Observable<any> {
        let params : any = new HttpParams();
        params = params.append('page', page.toString());
        params = params.append('size', size.toString());

        return this.http.get<any>(`${this.apiUrl}`, {params}).pipe(
            map(response => {
                const teacherSpecialties: TeacherSpecialty[] = response.content;
                const totalElements: number = response.totalElements;
                const totalPages: number = response.totalPages;
                return { teacherSpecialties, totalElements, totalPages };
            })
        );
    }

    getTeacherSpecialtyByCode(specialtyCode: string): Observable<any> {
        let params : any = new HttpParams();
        if (specialtyCode !== undefined && specialtyCode !== null && specialtyCode !== '') {
            params = params.append("specialtyCode", specialtyCode);
        }

        return this.http.get<any>(`${this.apiUrl}`, {params}).pipe(
            map(response => {
                const teacherSpecialties: TeacherSpecialty[] = response.content;
                const totalElements: number = response.totalElements;
                return { teacherSpecialties, totalElements };
            })
        );
    }

    addTeacherSpecialty(teacherSpecialty: TeacherSpecialty): Observable<TeacherSpecialty> {
        return this.http.post<TeacherSpecialty>(this.apiUrl, teacherSpecialty);
    }

    updateTeacherSpecialty(teacherSpecialty: TeacherSpecialty): Observable<TeacherSpecialty> {
        return this.http.put<TeacherSpecialty>(this.apiUrl, teacherSpecialty);
    }

    deleteTeacherSpecialty(code: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}?specialtyCode=${code}`);
    }
}
  