import { Component, OnInit } from '@angular/core';
import { TeacherResponse } from "../../../models/teacher";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Message, MessageService } from "primeng/api";
import { ActivatedRoute, Router } from "@angular/router";
import { TeacherService } from "../../../service/teacher.service";

@Component({
  selector: 'app-teacher-list',
  providers: [MessageService],
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss']
})
export class TeacherListComponent implements OnInit {
  teachers: TeacherResponse[] = [];
  searchForm!: FormGroup;
  totalElements: number = 0;
  display: boolean = false;
  addTeacher!: string;
  teacherUpdated!: string;
  msgs: Message[] = [];
  displayDialog: { [key: string]: boolean } = {};

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.addTeacher = params['addTeacher'];
    });
    this.route.queryParams.subscribe(params => {
      this.teacherUpdated = params['teacherUpdated'];
    });

    if (this.addTeacher === 'added') {
      this.showSuccessViaMessages('add');
    }
    if (this.teacherUpdated === 'updated') {
      this.showSuccessViaMessages('update');
    }

    this.loadTeachers(0, 10);

    // Initialize searchForm with all necessary controls
    this.searchForm = this.fb.group({
      teacherCode: [''],
      firstName: [''],
      lastName: [''],
      cin: ['']
    });
  }

  showSuccessViaToast() {
    this.messageService.add({ key: 'tst2', severity: 'success', summary: 'Success', detail: 'Teacher successfully deleted' });
  }

  showErrorViaToast() {
    this.messageService.add({ key: 'tst3', severity: 'error', summary: 'Error', detail: 'Teacher not deleted' });
  }

  showSuccessViaMessages(action: string) {
    if (action === 'add') {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Teacher successfully added' });
    }
    if (action === 'update') {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Teacher successfully updated' });
    }
  }

  loadTeachers(page: number, rows: number): void {
    this.teacherService.getAllTeachers(page, rows).subscribe(data => {
      this.teachers = data.teachers;
      this.totalElements = data.totalElements;

      // Initialize displayDialog object for each teacher
      this.teachers.forEach(teacher => {
        this.displayDialog[teacher.teacherCode] = false;
      });
    });
  }

  navigateToCreateTeacher() {
    this.router.navigate(['teachers/create']);
  }

  navigateToUpdateTeacher(teacherCode: string) {
    this.router.navigate(['teachers/update'], { queryParams: { code: teacherCode } });
  }

  navigateToDetails(teacherCode: string) {
    this.router.navigate(['teachers/details'], { queryParams: { code: teacherCode } });
  }

  onPageChange(event: any): void {
    const page = event.page;
    const size = event.rows;
    this.loadTeachers(page, size);
  }

  deleteTeacher(teacherCode: string): void {
    this.displayDialog[teacherCode] = false;
    this.teacherService.deleteTeacher(teacherCode).subscribe(
      () => {
        const index = this.teachers.findIndex(teacher => teacher.teacherCode === teacherCode);
        if (index !== -1) {
          this.teachers.splice(index, 1);
          this.loadTeachers(0, 10);
          this.showSuccessViaToast();
        }
      },
      (error) => {
        console.error(`Error when deleting teacher with code ${teacherCode}`, error);
        this.showErrorViaToast();
      }
    );
  }

  applySearch(): void {
    const teacherCode = this.searchForm.get('teacherCode')?.value;
    const firstName = this.searchForm.get('firstName')?.value;
    const lastName = this.searchForm.get('lastName')?.value;
    const cin = this.searchForm.get('cin')?.value;

    console.log('Search triggered with:', { teacherCode, firstName, lastName, cin }); // Debugging

    const criteria = { teacherCode, firstName, lastName, cin };

    this.teacherService.getTeachersByCriteria(criteria).subscribe(response => {
      this.teachers = response.teachers;
      this.totalElements = response.totalElements;
    });
  }
}
