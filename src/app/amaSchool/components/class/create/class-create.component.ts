import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseResponse } from 'src/app/amaSchool/models/course'; // Ensure this import is correct
import { CourseService } from 'src/app/amaSchool/service/course.service';
import { ClassRequest } from '../../../models/class';
import { Grade } from '../../../models/grade';
import { ClassService } from '../../../service/class.service';
import { GradeService } from '../../../service/grade.service';

@Component({
  selector: 'app-class-create',
  templateUrl: './class-create.component.html',
})
export class ClassCreateComponent implements OnInit {
  classForm!: FormGroup;
  grades: Grade[] = [];
  courses: any[] = []; // Placeholder for courses data
  addClass: string = 'not added';

  constructor(
    private fb: FormBuilder,
    private classService: ClassService,
    private gradeService: GradeService,
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.classForm = this.fb.group({
      name: ['', Validators.required],
      studentLimit: ['', [Validators.required, Validators.min(1)]],
      currentStudents: ['0', [Validators.required, Validators.min(0)]],
      gradeCode: ['', Validators.required],
      courseCodes: [[], Validators.required]
    });

    this.loadGrades();
    this.loadCourses();
    // If you have loadClasse, ensure it is implemented correctly
    // this.loadClasse(); 
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

  loadCourses() {
    const page = 0;
    const size = 100;
    this.courseService.getAllCourse(page, size).subscribe(
      (response: { courses: CourseResponse[], totalElements: number }) => {
        this.courses = response.courses.map(course => ({
          label: course.name,
          value: course.courseCode
        }));
        console.log('Loaded Courses:', this.courses);  // Log the courses to ensure they are loaded correctly
      },
      (error: any) => {
        console.error('Error loading courses:', error);
      }
    );
  }
  
  createClass() {
    console.log('Form valid:', this.classForm.valid);
    console.log('Form errors:', this.classForm.errors);
    console.log('Form controls:', this.classForm.controls);
  
    if (this.classForm.valid) {
      const selectedCourses = this.classForm.get('courseCodes')?.value;
      console.log('Selected Courses:', selectedCourses);  // This is correct and should show course codes
      
      // Directly use the selectedCourses as courseCodes in the payload
      const newClass: ClassRequest = {
        name: this.classForm.get('name')?.value,
        currentStudents: Number(this.classForm.get('currentStudents')?.value),
        studentLimit: Number(this.classForm.get('studentLimit')?.value),
        gradeCode: this.classForm.get('gradeCode')?.value.gradeCode,
        courses: selectedCourses,  // No need to map again since they are already course codes
        classeCode: ''
      };
  
      console.log('Corrected Payload:', newClass);  // This should now show correct course codes
  
      this.classService.addClass(newClass).subscribe(
        (response) => {
          this.classForm.reset();
          this.addClass = 'added';
          this.router.navigate(['class/list'], { queryParams: { addClass: this.addClass } });
          setTimeout(() => {
            this.router.navigate([], { queryParams: { addClass: null }, queryParamsHandling: 'merge' });
          }, 200);
        },
        (error: HttpErrorResponse) => {
          console.error('Error when adding the class:', error);
          console.error('Error details:', error.error);  // Log detailed error response
        }
      );
    } else {
      this.classForm.markAllAsTouched();
    }
  }

  
}  