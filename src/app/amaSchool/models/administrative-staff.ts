export interface AdministrativeStaffRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    administrativeStaffCode?: string;
  }
  
  export interface AdministrativeStaffResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    administrativeStaffCode: string;
  }
 