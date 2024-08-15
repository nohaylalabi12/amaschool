import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { catchError, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Student } from "../models/student";


@Injectable({
    providedIn: 'root'
})
export class StudentService {

    private apiUrl = `${environment.apiBaseUrl}students`;
    constructor(private http: HttpClient) { }

    page: number = 0;
    size: number = 10;

    getAllStudents(page: number, size: number): Observable<any> {
        let params: any = new HttpParams();
        params = params.append('page', page.toString());
        params = params.append('size', size.toString());

        return this.http.get<any>(`${this.apiUrl}`, { params }).pipe(
            map(response => {
                const students: Student[] = response.content;
                const totalElements: number = response.totalElements;
                const totalPages: number = response.totalPages;
                return { students, totalElements, totalPages };
            })
        );
    }

    SearchStudents(studentCode: string , cne:string , lastName:string, firstName:string){
        let params: any = new HttpParams();
        if (studentCode !== undefined && studentCode !== null && studentCode !== '') {
            params = params.append("studentCode", studentCode);
            console.log(params)
        }
        if (cne !== undefined && cne !== null && cne !== '') {
            params = params.append("cne", cne);
            console.log(params)
        }
        if (lastName !== undefined && lastName !== null && lastName !== '') {
            params = params.append("lastName", lastName);
            console.log(params)
        }
        if (firstName !== undefined && firstName !== null && firstName !== '') {
            params = params.append("firstName", firstName);
            console.log(params)
        }

        return this.http.get<any>(`${this.apiUrl}`, { params }).pipe(
            map(response => {
                const students: Student[] = response.content;
                const totalElements: number = response.totalElements;
                console.log(response.content)
                return { students, totalElements };
            })
        );
    }
    getStudentByCode(studentCode: string) {
        let params: any = new HttpParams();
        if (studentCode !== undefined && studentCode !== null && studentCode !== '') {
            params = params.append("studentCode", studentCode);
            console.log(params)
        }

        return this.http.get<any>(`${this.apiUrl}`, { params }).pipe(
            map(response => {
                const std: Student[]= response.content;
                const totalElements: number = response.totalElements;
                console.log(response.content)
                return { std, totalElements };
            })
        );
    }

    addStudent(student: Student): Observable<Student> {
        return this.http.post<Student>(this.apiUrl, student);
    }

    checkCneUnique(cne: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.apiUrl}/check-cne?cne=${cne}`);
    }

    updateStudent(student: Student): Observable<Student> {
        return this.http.put<Student>(this.apiUrl, student);
    }

    deleteStudent(code: any) {
        return this.http.delete<void>(`${this.apiUrl}?code=${code}`);
    }

    downloadExcel(): Observable<Blob> {
        return this.http.get(`${this.apiUrl}/download`, { responseType: 'blob' });
    }
}
