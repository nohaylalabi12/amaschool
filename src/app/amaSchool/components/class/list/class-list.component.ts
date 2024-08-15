import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Message, MessageService } from "primeng/api";
import { Grade } from 'src/app/amaSchool/models/grade';
import { GradeService } from 'src/app/amaSchool/service/grade.service';
import { ClassResponse } from "../../../models/class";
import { ClassService } from "../../../service/class.service";
import { CourseService } from "../../../service/course.service";

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  providers: [MessageService],
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent implements OnInit {
  classes: ClassResponse[] = [];
  courses: any[] = [];
  grades: Grade[] = [];
  searchForm!: FormGroup;
  totalElements: number = 0;
  display: boolean = false;
  addClasse!: string;
  classUpdated!: string;
  msgs: Message[] = [];
  displayDialog: { [key: string]: boolean } = {};

  constructor(
    private gradeService: GradeService,
    private route: ActivatedRoute,
    private classService: ClassService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.addClasse = params['addClasse'];
      this.classUpdated = params['classUpdated'];
    });

    if (this.addClasse === 'added') {
      this.showSuccessViaMessages('add');
    }
    if (this.classUpdated === 'updated') {
      this.showSuccessViaMessages('update');
    }

    this.loadClasses(0, 10);
    this.searchForm = this.fb.group({
      name: [''],        // Added 'name' control
      classeCode: [''],
    });
  }

  showSuccessViaToast() {
    this.messageService.add({ key: 'tst2', severity: 'success', summary: 'Success', detail: 'Class successfully deleted' });
  }

  showErrorViaToast() {
    this.messageService.add({ key: 'tst3', severity: 'error', summary: 'Error', detail: 'Class not deleted' });
  }

  showSuccessViaMessages(action: string) {
    this.msgs = [];
    if (action === 'add') {
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Class successfully added' });
    }
    if (action === 'update') {
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Class successfully updated' });
    }
  }

  loadClasses(page: number, rows: number): void {
    this.classService.getAllClass(page, rows).subscribe(data => {
      this.classes = data.classes;
      this.totalElements = data.totalElements;
      console.log(this.totalElements);
      console.log(this.classes);
    });
  }

  loadCourses() {
    const page = 0;
    const size = 100;
    this.courseService.getAllCourse(page, size).subscribe(
      (response: { courses: any[], totalElements: number }) => {
        this.courses = response.courses.map(course => ({
          label: course.name,        
          value: course.courseCode   
        }));
      },
      (error: any) => {
        console.error('Error loading courses:', error);
      }
    );
  }

  loadGrades() {
    const page = 0;
    const size = 100;
    this.gradeService.getAllGrade(page, size).subscribe(
      (response: { grades: Grade[], totalElements: number, totalPages: number }) => {
        this.grades = response.grades;
      },
      (error: any) => {
        console.error('Error loading grades:', error);
      }
    );
  }

  navigateToCreateClasse() {
    this.router.navigate(['class/create']);
  }

  navigateToDetails(classeCode: any) {
    this.router.navigate(['class/details'], { queryParams: { code: classeCode } });
  }

  navigateToUpdateClasse(classeCode: any) {
    this.router.navigate(['class/update'], { queryParams: { code: classeCode } });
  }

  onPageChange(event: any): void {
    const page = event.page;
    const size = event.rows;
    this.loadClasses(page, size);
  }

  deleteClasse(classeCode: any): void {
    this.displayDialog[classeCode] = false;
    this.classService.deleteClass(classeCode).subscribe(
      () => {
        const index = this.classes.findIndex(classe => classe.classeCode === classeCode);
        if (index !== -1) {
          this.classes.splice(index, 1);
          this.loadClasses(0, 10);
          this.showSuccessViaToast();
        }
      },
      (error) => {
        console.error(`Error when deleting class with code ${classeCode}`, error);
        this.showErrorViaToast();
      }
    );
  }

  searchClass(): void {
    const name = this.searchForm.get('name')?.value || '';   // Added 'name' form control handling
    const classCode = this.searchForm.get('classeCode')?.value || '';  
    
    this.classes = [];
    
    this.classService.getClass(name, classCode).subscribe({
      next: content => {
        this.classes = content.classes;
        this.totalElements = content.totalElements;
        console.log('Search results:', this.classes); 
      },
      error: err => {
        console.error('Error occurred during class search:', err);
      }
    });
  }
}
