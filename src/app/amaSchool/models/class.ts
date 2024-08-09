import {Grade} from "./grade";

export interface ClassResponse {
    name : string
    classeCode : string
    currentStudents: number,
    studentLimit: number,
    grade: Grade;
}
export interface ClassRequest {
    name : string
    classeCode : string
    currentStudents: number,
    studentLimit: number,
    gradeCode : string
}

