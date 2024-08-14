export interface TeacherRequest {
    firstName: string;
    lastName: string;
    cin: string;
    email: string;
    phone: string;
    specialtyCode: string;
    teacherCode: string;
  }

  export interface TeacherResponse {
    firstName: string;
    lastName: string;
    cin: string;
    email: string;
    phone: string;
    specialty: TeacherSpecialtyResponse;
    teacherCode: string;
  }

  export interface TeacherSpecialtyResponse {

    specialtyName: string;
    specialtyCode: string;
  }
