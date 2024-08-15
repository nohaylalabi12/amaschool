// import {Teacher} from './teacher';


export interface CourseResponse {
    name: string;
    description: string;  // Added based on the backend DTO
    numberOfExams: number;
    numberMaxOfExams: number;
    courseCode: string;
    teachers: any[];  // This can be more specific based on your needs
}


export interface CourseRequest {
    name: string;
    numberOfExams: number;
    numberMaxOfExams: number;
    studentLimit: number;
    courseCode: string;
    // teacher: Teacher;
    teachers: String; // Course list type is set to any[]
}

