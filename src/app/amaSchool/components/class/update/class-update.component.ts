import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { forkJoin } from 'rxjs';
import { CourseService } from 'src/app/amaSchool/service/course.service';
import { ClassRequest } from "../../../models/class";
import { ClassService } from "../../../service/class.service";
import { GradeService } from "../../../service/grade.service";

@Component({
  selector: 'app-class-update',
  templateUrl: './class-update.component.html',
  styleUrls: ['./class-update.component.scss']
})
export class ClassUpdateComponent {
  classeCode: any;
  classeForm!: FormGroup;
  grades: any[] = [];
  courses: any[] = [];
  totalElements!: number;

  constructor(
    private courseService: CourseService, 
    private route: ActivatedRoute, 
    private fb: FormBuilder, 
    private classeService: ClassService,
    private gradeService: GradeService, 
    private router: Router, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.classeForm = this.fb.group({
      classeCode: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      studentLimit: ['', Validators.required],
      currentStudents: ['0', Validators.required],
      grade: ['', Validators.required],
      courseCodes: [[], Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      this.classeCode = params['code'];
    });

    this.loadData();
  }

  loadData() {
    forkJoin({
      grades: this.gradeService.getAllGrade(0, 100),
      courses: this.courseService.getAllCourse(0, 100),
      classe: this.classeService.getClassByCode(this.classeCode)
    }).subscribe(({ grades, courses, classe }) => {
      // Handle grades
      this.grades = grades.grades.map((grade: any) => ({
        label: grade.name,
        value: grade.gradeCode
      }));

      // Handle courses
      this.courses = courses.courses.map((course: any) => ({
        label: course.name,
        value: course.courseCode
      }));

      // Handle classe details
      const selectedClasse = classe.classes[0];
      this.classeForm.patchValue({
        classeCode: selectedClasse.classeCode,
        name: selectedClasse.name,
        studentLimit: selectedClasse.studentLimit,
        currentStudents: selectedClasse.currentStudents,
        grade: selectedClasse.grade.gradeCode,
        courseCodes: selectedClasse.courses.map((course: any) => course.courseCode)
      });

      // Trigger change detection to update the view
      this.cdr.detectChanges();
    }, error => {
      console.error('Error loading data:', error);
    });
  }

  updateClasse() {
    if (this.classeForm.valid) {
      const updatedClasseData: ClassRequest = {
        classeCode: this.classeCode,
        name: this.classeForm.get('name')?.value,
        studentLimit: Number(this.classeForm.get('studentLimit')?.value),
        currentStudents: Number(this.classeForm.get('currentStudents')?.value),
        gradeCode: this.classeForm.get('grade')?.value,
        courses: this.classeForm.get('courseCodes')?.value
      };

      this.classeService.updateClass(updatedClasseData).subscribe(
        () => {
          this.router.navigate(['class/list']);
        },
        (error) => {
          console.error(`Error while updating class with code ${updatedClasseData.classeCode}`, error);
        }
      );
    } else {
      this.classeForm.markAllAsTouched();
    }
  }
}
