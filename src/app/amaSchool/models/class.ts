import { Grade } from "./grade";


export interface ClassResponse {
    name: string;
    currentStudents: number;
    studentLimit: number;
    classeCode: string;
    grade: Grade;
    courses: any[]; // Course list type is set to any[]
}



export interface ClassRequest {
    name: string;
    currentStudents: number;
    studentLimit: number;
    classeCode: string;
    gradeCode: string;
    courses: string[]; // This corresponds to the list of course codes in the backend DTO
}

