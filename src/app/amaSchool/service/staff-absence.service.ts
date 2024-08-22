import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { StaffAbsenceRequest, StaffAbsenceResponse } from '../models/staff-absence';

@Injectable({
  providedIn: 'root'
})
export class StaffAbsenceService {

  private apiUrl = `${environment.apiBaseUrl}absences`;

  constructor(private http: HttpClient) {}

  // Method to get a list of all staff absences with pagination
  getAllStaffAbsences(page: number, size: number): Observable<{ staffAbsences: StaffAbsenceResponse[], totalElements: number }> {
    let params = new HttpParams().append('page', page.toString()).append('size', size.toString());

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(response => {
        const staffAbsences: StaffAbsenceResponse[] = response.content;
        const totalElements: number = response.totalElements;
        return { staffAbsences, totalElements };
      })
    );
  }

  // Method to get staff absences by criteria
  search(staffAbsenceCode: string, staffCode: string, absenceDate: string): Observable<{ absences: StaffAbsenceResponse[], totalElements: number }> {
    let params: any = new HttpParams();

    if (staffAbsenceCode !== undefined && staffAbsenceCode !== '') {
      params = params.append('staffAbsenceCode', staffAbsenceCode);
    }

    if (staffCode !== undefined && staffCode !== '') {
      params = params.append('staffCode', staffCode);
    }

    if (absenceDate !== undefined && absenceDate !== '') {
      params = params.append('absenceDate', absenceDate);
    }

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(response => {
        const absences: StaffAbsenceResponse[] = response.content;
        const totalElements: number = response.totalElements;
        return { absences, totalElements };
      })
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }
    return throwError(errorMessage);
  }

  // Method to add a new staff absence
  addStaffAbsence(staffAbsence: StaffAbsenceRequest): Observable<StaffAbsenceResponse> {
    return this.http.post<StaffAbsenceResponse>(this.apiUrl, staffAbsence);
  }

  // Method to update an existing staff absence
  updateStaffAbsence(staffAbsence: StaffAbsenceRequest): Observable<StaffAbsenceResponse> {
    return this.http.put<StaffAbsenceResponse>(this.apiUrl, staffAbsence);
  }

  // Method to delete a staff absence by its code
  deleteStaffAbsence(absenceCode: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?code=${absenceCode}`);
  }

  // Method to download absences as an Excel file
  downloadExcel(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download`, { responseType: 'blob' });
  }

  // Method to get absence by code
  getAbsenceByCode(staffAbsenceCode: string): Observable<{ absences: StaffAbsenceResponse[], totalElements: number }> {
    let params: any = new HttpParams();

    if (staffAbsenceCode !== undefined && staffAbsenceCode !== '') {
      params = params.append('staffAbsenceCode', staffAbsenceCode);
    }

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(response => {
        const absences: StaffAbsenceResponse[] = response.content;
        const totalElements: number = response.totalElements;
        return { absences, totalElements };
      })
    );
  }
   // Corrected method to get staff absence by code
   getStaffAbsenceByCode(absenceCode: string): Observable<any> {
    let params: any = new HttpParams();

    // Append the absence code as a parameter if it exists
    if (absenceCode) {
      params = params.append('staffAbsenceCode', absenceCode);
    }

    // Make the GET request with the parameters
    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(response => {
        const staffAbsences: StaffAbsenceResponse[] = response.content;
        const totalElements: number = response.totalElements;
        return { staffAbsences, totalElements };
      })
    );
  }
  // Method to get staff absences by administrative staff code
  /*getAbsencesByStaffCode(administrativeStaffCode: string): Observable<StaffAbsenceResponse[]> {
    let params = new HttpParams().set('staffCode', administrativeStaffCode);

    return this.http.get<any>(`${this.apiUrl}`, { params }).pipe(
      map(response => {
        return response.content.map((absence: any) => ({
          staffAbsenceCode: absence.staffAbsenceCode,
          absenceDate: absence.absenceDate,
          absenceCause: absence.absenceCause,
          startTime: absence.startTime,
          endTime: absence.endTime,
          absenceStatus: absence.absenceStatus,
        }));
      })
    );
  }
    */


}
