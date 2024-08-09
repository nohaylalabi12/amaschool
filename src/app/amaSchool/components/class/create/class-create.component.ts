import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ClassRequest} from "../../../models/class";
import {ClassService} from "../../../service/class.service";
import {GradeService} from "../../../service/grade.service";
import {GradeCreateComponent} from "../../grade/create/grade-create.component";
import {Grade} from "../../../models/grade";
import {forkJoin, switchMap} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-class-create',
  templateUrl: './class-create.component.html',
  styleUrl: './class-create.component.scss'
})
export class ClassCreateComponent {
  classeForm!: FormGroup;
  classe !: ClassRequest;
  grades : Grade[]=[];
  addClasse : String= "not added";
  totalElements : number = 0;
  items : Grade[]=[];
    totalPages : number = 0;
  constructor(private fb: FormBuilder,private classeService: ClassService,private gradeService: GradeService, private router: Router) {
  }
  ngOnInit() {
      this.classeForm = this.fb.group({
          name: ['', Validators.required],
          studentLimit: ['', Validators.required],
          currentStudents: ['0', Validators.required],
          grade: [''],
      });


      this.loadGrades(0,10);
  }
    loadGrades(page: number, size: number): void {
        this.gradeService.getAllGrade(page, size).pipe(
            switchMap(initialData => {
                this.totalPages = initialData.totalPages;
                this.grades.push(...initialData.grades);
                this.totalElements = initialData.totalElements;
                const pagesToLoad = Array.from({ length: this.totalPages - 1 }, (_, i) => page + i + 1);
                return forkJoin(pagesToLoad.map(p => this.gradeService.getAllGrade(p, size)));
            }),
            map(results => {
                results.forEach(data => {
                    this.grades.push(...data.grades);
                });
                return this.grades;
            })
        ).subscribe({
            next: (allGrades) => {
                console.log(allGrades);
            },
            error: (err) => {
                console.error('Error while recovering the data :', err);
            },
            complete: () => {
                console.log('loading is complete');
            }
        });
    }

    createclasse() {
    if (this.classeForm.valid) {
        console.log("test")
        const newClasse: ClassRequest = { ...this.classeForm.value };
        newClasse.gradeCode = this.classeForm.get('grade')?.value.gradeCode;
        console.log(newClasse)
      this.classeService.addClass(newClasse).subscribe(
          (response) => {
            this.classeForm.reset();
            this.addClasse= "added";
            this.router.navigate(['classe/list'], { queryParams: { addClasse: this.addClasse } })
            setTimeout(() => {
              this.router.navigate([], { queryParams: { addClasse: null }, queryParamsHandling: 'merge' });
            }, 200);

          },
          (error) => {
            console.error('Error while adding the class:', error);
          }
      );
    }
  }
}
