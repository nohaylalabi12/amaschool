import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Message, MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import { TeacherSpecialtyService } from '../../../service/teacher-specialty.service';
import { TeacherSpecialty } from '../../../models/teacher-specialty';

@Component({
  selector: 'app-teacher-specialty-list',
  providers: [MessageService],
  templateUrl: './specialty-list.component.html',
  styleUrl: './specialty-list.component.scss'
})
export class TeacherSpecialtyListComponent {
  teacherSpecialties: TeacherSpecialty[] = [];
  searchForm!: FormGroup;
  totalElements: number = 0;
  display: boolean = false;
  addTeacherSpecialty!: string;
  teacherSpecialtyUpdated!: string;
  msgs: Message[] = [];
  displayDialog: { [key: string]: boolean } = {};

  constructor(
    private route: ActivatedRoute,
    private teacherSpecialtyService: TeacherSpecialtyService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.teacherSpecialties.forEach(teacherSpecialty => {
      this.displayDialog[teacherSpecialty.specialtyCode] = false;
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.addTeacherSpecialty = params['addTeacherSpecialty'];
    });
    this.route.queryParams.subscribe(params => {
      this.teacherSpecialtyUpdated = params['teacherSpecialtyUpdated'];
    });
    if (this.addTeacherSpecialty === 'added') {
      this.showSuccessViaMessages('add');
    }
    if (this.teacherSpecialtyUpdated === 'updated') {
      this.showSuccessViaMessages('update');
    }
    this.loadTeacherSpecialties(0, 10);
    this.searchForm = this.fb.group({
      specialtyCode: [''],
    });
  }

  showSuccessViaToast() {
    this.messageService.add({ key: 'tst2', severity: 'success', summary: 'Success', detail: 'Teacher Specialty successfully deleted' });
  }

  showErrorViaToast() {
    this.messageService.add({ key: 'tst3', severity: 'error', summary: 'Error', detail: 'Teacher Specialty not deleted' });
  }

  showSuccessViaMessages(action: string) {
    if (action === 'add') {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Teacher Specialty successfully added' });
    }
    if (action === 'update') {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Teacher Specialty successfully updated' });
    }
  }

  loadTeacherSpecialties(page: number, rows: number): void {
    this.teacherSpecialtyService.getAllTeacherSpecialties(page, rows).subscribe(data => {
      this.teacherSpecialties = data.teacherSpecialties;
      this.totalElements = data.totalElements;
      console.log(this.totalElements);
      console.log(this.teacherSpecialties);
    });
  }

  navigateToCreateTeacherSpecialty() {
    this.router.navigate(['teacher-specialty/create']);
  }

  navigateToUpdateTeacherSpecialty(specialtyCode: any) {
    this.router.navigate(['teacher-specialty/update'], { queryParams: { code: specialtyCode } });
  }

  onPageChange(event: any): void {
    const page = event.page;
    const size = event.rows;
    this.loadTeacherSpecialties(page, size);
  }

  deleteTeacherSpecialty(specialtyCode: any): void {
    this.displayDialog[specialtyCode] = false;
    this.teacherSpecialtyService.deleteTeacherSpecialty(specialtyCode).subscribe(
      () => {
        const index = this.teacherSpecialties.findIndex(teacherSpecialty => teacherSpecialty.specialtyCode === specialtyCode);
        if (index !== -1) {
          this.teacherSpecialties.splice(index, 1);
          this.loadTeacherSpecialties(0, 10);
          this.showSuccessViaToast();
        }
      },
      (error) => {
        console.error(`Error when deleting teacher specialty with code ${specialtyCode}`, error);
      }
    );
  }

  searchTeacherSpecialtyByCode(): void {
    this.teacherSpecialties = [];
    this.teacherSpecialtyService.getTeacherSpecialtyByCode(this.searchForm.get('specialtyCode')?.value).subscribe(content => {
      this.teacherSpecialties = content.teacherSpecialties;
      this.totalElements = content.totalElements;
    });
  }
}
