import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { CourseResponse } from "../models/course";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = `${environment.apiBaseUrl}courses`;
  constructor(private http: HttpClient) { }

  getAllCourse(page: number, size: number): Observable<any> {
    let params: any = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());

    return this.http.get<any>(`${this.apiUrl}`, { params }).pipe(
        map(response => {
            const courses: CourseResponse[] = response.content.map((course: any) => ({
                name: course.name,
                description: course.description,
                numberOfExams: course.numberOfExams,
                numberMaxOfExams: course.numberMaxOfExams,
                courseCode: course.courseCode,
                teachers: course.teachers.map((teacher: any) => ({
                    firstName: teacher.firstName,
                    lastName: teacher.lastName,
                    cin: teacher.cin,
                    email: teacher.email,
                    phone: teacher.phone,
                    specialtyCode: teacher.specialtyCode,
                    teacherCode: teacher.teacherCode
                }))
            }));
            const totalElements: number = response.totalElements;
            return { courses, totalElements };
        })
    );
}


  getCourseByCode(courseCode: string) {
    let params : any = new HttpParams();
    if( courseCode !== undefined && courseCode !== null && courseCode !== '') {
      params = params.append("courseCode",courseCode);
    }
    

    return this.http.get<any>(`${this.apiUrl}`,{params}).pipe(
        map(response => {
          const courses: CourseResponse[] = response.content;
          const totalElements: number = response.totalElements;
          console.log(response.content)
          return { courses, totalElements };
        })
    );
  }

  getCourseByName(name: string) {
    let params: any = new HttpParams();
    if (name !== undefined && name !== null && name !== '') {
        params = params.append("name", name);
    }

    return this.http.get<any>(`${this.apiUrl}`,{params}).pipe(
      map(response => {
        const courses: CourseResponse[] = response.content;
        const totalElements: number = response.totalElements;
        console.log(response.content)
        return { courses, totalElements };
      })
    );
}


//   addCourse(course: CourseRequest): Observable<CourseResponse> {
//     return this.http.post<CourseResponse>(this.apiUrl, course);

//   }
//   updateCourse(course: CourseRequest): Observable<CourseResponse> {
//     return this.http.put<CourseResponse>(this.apiUrl,  course);

//   }
//   deleteCourse(code:any) {
//     return this.http.delete<void>(this.apiUrl+"?courseCode="+code);
//   }
}
