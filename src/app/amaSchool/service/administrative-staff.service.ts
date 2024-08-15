import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdministrativeStaffRequest, AdministrativeStaffResponse } from '../models/administrative-staff';

@Injectable({
  providedIn: 'root'
})
export class AdministrativeStaffService {

  private apiUrl = `${environment.apiBaseUrl}staff`;

  constructor(private http: HttpClient) { }

  // Méthode pour obtenir tous les membres du staff
  getAllStaff(page: number, size: number): Observable<any> {
    let params: any = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());

    return this.http.get<any>(`${this.apiUrl}`, { params }).pipe(
      map(response => {
        const staff: AdministrativeStaffResponse[] = response.content;
        const totalElements: number = response.totalElements;
        return { staff, totalElements };
      })
    );
  }

  // Méthode pour chercher le staff par code, prénom ou nom
  searchStaff(staffCode: string, firstName: string, lastName: string): Observable<any> {
    let params: any = new HttpParams();
    
    if (staffCode) {
      params = params.append('administrativeStaffCode', staffCode);
    }
    if (firstName) {
      params = params.append('firstName', firstName);
    }
    if (lastName) {
      params = params.append('lastName', lastName);
    }
  
    return this.http.get<any>(`${this.apiUrl}`, { params }).pipe(
      map(response => {
        const staff: AdministrativeStaffResponse[] = response.content;
        const totalElements: number = response.totalElements;
        return { staff, totalElements };
      })
    );
  }

  // Méthode pour ajouter un membre du staff
  addStaff(staff: AdministrativeStaffRequest): Observable<AdministrativeStaffResponse> {
    return this.http.post<AdministrativeStaffResponse>(this.apiUrl, staff);
  }

  // Méthode pour récupérer un membre du staff par code
  getStaffByCode(staffCode: string): Observable<any> {
    let params: any = new HttpParams();
    if (staffCode) {
      params = params.append('administrativeStaffCode', staffCode);
    }
    return this.http.get<any>(`${this.apiUrl}`, { params }).pipe(
      map(response => {
        const staff: AdministrativeStaffResponse[] = response.content;
        const totalElements: number = response.totalElements;
        return { staff, totalElements };
      })
    );
  }

  // Méthode pour mettre à jour un membre du staff
  updateStaff(staff: AdministrativeStaffRequest): Observable<AdministrativeStaffResponse> {
    return this.http.put<AdministrativeStaffResponse>(this.apiUrl, staff);
  }

  // Méthode pour supprimer un membre du staff
  deleteStaff(staffCode: any): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?administrativeStaffCode=${staffCode}`);
  }

  // Méthode pour télécharger le fichier Excel
  downloadExcel(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download`, { responseType: 'blob' });
  }
}
