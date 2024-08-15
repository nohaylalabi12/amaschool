import { Component, OnInit } from '@angular/core';
import { Student } from "../../../models/student";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Message, MessageService } from "primeng/api";
import { ActivatedRoute, Router } from "@angular/router";
import { StudentService } from "../../../service/student.service";

@Component({
    selector: 'app-student-list',
    providers: [MessageService],
    templateUrl: './student-list.component.html',
    styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent  {
    students: Student[] = [];
    searchForm!: FormGroup;
    totalElements: number = 0;
    display: boolean = false;
    addStudent !: string;
    studentUpdated !: string;
    msgs: Message[] = [];
    displayDialog: { [key: string]: boolean } = {};

    constructor(private route: ActivatedRoute, private studentService: StudentService,
                private messageService: MessageService, private fb: FormBuilder, private router: Router) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.addStudent = params['addStudent'];
            this.studentUpdated = params['studentUpdated'];
        });
        if (this.addStudent === 'added') {
            this.showSuccessViaMessages('add');
        }
        if (this.studentUpdated === 'updated') {
            this.showSuccessViaMessages('update');
        }
        this.loadStudents(0, 10);
        this.searchForm = this.fb.group({
            studentCode: [''],
            cne: [''],
            firstName: [''],
            lastName: [''],
        });
    }

    loadStudents(page: number, rows: number): void {
        this.studentService.getAllStudents(page, rows).subscribe(data => {
            this.students = data.students;
            this.totalElements = data.totalElements;
            this.students.forEach(student => {
                this.displayDialog[student.studentCode] = false;
            });
        });
    }

    searchStudents(): void {
        const studentCode = this.searchForm.get('studentCode')?.value || '';
        const cne = this.searchForm.get('cne')?.value || '';
        const firstName = this.searchForm.get('firstName')?.value || '';
        const lastName = this.searchForm.get('lastName')?.value || '';
        this.students = [];
        this.studentService.SearchStudents(studentCode, cne, lastName, firstName).subscribe(content => {
            this.students = content.students;
            this.totalElements = content.totalElements;
        });
    }

    showSuccessViaToast() {
        this.messageService.add({ key: 'tst2', severity: 'success', summary: 'Success', detail: 'Student successfully deleted' });
    }

    showSuccessViaMessages(action : string) {
        if (action === 'add'){
            this.msgs = [];
            this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Student successfully added' });
        }
        if (action === 'update'){
            this.msgs = [];
            this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Student successfully updated' });
        }
    }

    navigateToCreateStudent() {
        this.router.navigate(['student/create']);
    }

    navigateToUpdateStudent(studentCode: any) {
        this.router.navigate(['student/update'], { queryParams: { code: studentCode } });
    }

    navigateToDetails(studentCode: any){
        this.router.navigate(['student/details'], { queryParams: { code: studentCode} })
    }

    onPageChange(event: any): void {
        const page = event.page;
        const size = event.rows;
        this.loadStudents(page, size);
    }

    deleteStudent(studentCode: any): void {
        this.displayDialog[studentCode] = false;
        this.studentService.deleteStudent(studentCode).subscribe(
            () => {
                const index = this.students.findIndex(student => student.studentCode === studentCode);
                if (index !== -1) {
                    this.students.splice(index, 1);
                    this.loadStudents(0, 10);
                    this.showSuccessViaToast();
                }
            },
            (error) => {
                console.error(`Error when deleting student with code ${studentCode}`, error);
            }
        );
    }

    showErrorViaToast() {
        this.messageService.add({ key: 'tst3', severity: 'error', summary: 'Error', detail: 'Student not deleted' });
    }

    exportExcel() {
        this.studentService.downloadExcel().subscribe(response => {
            const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'students.xlsx';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        });
    }
}
