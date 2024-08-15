
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeacherRequest, TeacherResponse } from '../models/teacher';



@Injectable({
  providedIn: 'root'
})

export class TeacherService {

    private apiUrl = `${environment.apiBaseUrl}teachers`;
    private specialtyUrl = `${environment.apiBaseUrl}teacher-specialties`; // URL for specialties

    constructor(private http: HttpClient) {
    }

    // Method to get a list of all teachers with pagination
    getAllTeachers(page: number, size: number): Observable<{ teachers: TeacherResponse[], totalElements: number }> {
        let params = new HttpParams();
        params = params.append('page', page.toString());
        params = params.append('size', size.toString());

        return this.http.get<any>(this.apiUrl, {params}).pipe(
            map(response => {
                const teachers: TeacherResponse[] = response.content.map((teacher: any) => ({
                    ...teacher,
                    specialty: {
                        specialtyName: teacher.specialty?.name || '', // Adjusting to include specialtyName
                        specialtyCode: teacher.specialty?.specialtyCode || ''
                    }
                }));
                const totalElements: number = response.totalElements;
                return {teachers, totalElements};
            })
        );
    }

    // Method to get a specific teacher by their code
//   getTeacherByCode(teacherCode: string): Observable<{ teachers: TeacherResponse[], totalElements: number }> {
//     let params = new HttpParams();
//     if (teacherCode) {
//       params = params.append('teacherCode', teacherCode);
//     }

//     return this.http.get<any>(this.apiUrl, { params }).pipe(
//       map(response => {
//         const teachers: TeacherResponse[] = response.content.map((teacher: any) => ({
//           ...teacher,
//           specialty: {
//             specialtyName: teacher.specialty?.name || '', // Adjusting to include specialtyName
//             specialtyCode: teacher.specialty?.specialtyCode || ''
//           }
//         }));
//         const totalElements: number = response.totalElements;
//         console.log("searched by code : " ,teacherCode)
//         return { teachers, totalElements };
//       })
//     );
//   }

    getTeacherByCode(teacherCode: string): Observable<{ teachers: TeacherResponse[], totalElements: number }> {
        let params = new HttpParams().append('teacherCode', teacherCode);

        return this.http.get<any>(this.apiUrl, {params}).pipe(
            map(response => {
                const teachers: TeacherResponse[] = response.content.map((teacher: any) => ({
                    ...teacher,
                    specialty: {
                        specialtyName: teacher.specialty?.name || '',
                        specialtyCode: teacher.specialty?.specialtyCode || ''
                    }
                }));
                const totalElements: number = response.totalElements;
                return {teachers, totalElements};
            })
        );
    }

    getTeachersByCriteria(criteria: {
        teacherCode?: string,
        firstName?: string,
        lastName?: string,
        cin?: string
    }): Observable<{ teachers: TeacherResponse[], totalElements: number }> {
        let params = new HttpParams();


        if (criteria.teacherCode) {
            params = params.append('teacherCode', criteria.teacherCode);
        }
        if (criteria.firstName) {
            params = params.append('firstName', criteria.firstName);
        }
        if (criteria.lastName) {
            params = params.append('lastName', criteria.lastName);
        }
        if (criteria.cin) {
            params = params.append('cin', criteria.cin);
        }

        return this.http.get<any>(this.apiUrl, {params}).pipe(
            map(response => {
                const teachers: TeacherResponse[] = response.content.map((teacher: any) => ({
                    ...teacher,
                    specialty: {
                        specialtyName: teacher.specialty?.name || '',
                        specialtyCode: teacher.specialty?.specialtyCode || ''
                    }
                }));
                const totalElements: number = response.totalElements;
                return {teachers, totalElements};
            })
        );
    }


    // Method to add a new teacher
    addTeacher(teacher: TeacherRequest): Observable<TeacherResponse> {
        return this.http.post<TeacherResponse>(this.apiUrl, teacher);
    }

    // Method to update an existing teacher's details
    updateTeacher(teacher: TeacherRequest): Observable<TeacherResponse> {
        return this.http.put<TeacherResponse>(this.apiUrl, teacher);
    }

    // Method to delete a teacher by their code
    deleteTeacher(teacherCode: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}?teacherCode=${teacherCode}`);
    }

    // Method to fetch all available teacher specialties
    getAllSpecialties(): Observable<any[]> {
        return this.http.get<any[]>(this.specialtyUrl);
    }
}
