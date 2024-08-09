import {ChangeDetectorRef, Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Grade} from "../../../models/grade";
import {ActivatedRoute, Router} from "@angular/router";
import {GradeService} from "../../../service/grade.service";

@Component({
  selector: 'app-grade-update',
  templateUrl: './grade-update.component.html',
  styleUrl: './grade-update.component.scss'
})
export class GradeUpdateComponent {
  gradeCode: any;
  gradeForm!: FormGroup;
  grades : Grade[]= [];
  gradeUpdated : String= "not updated";
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private gradeService: GradeService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.gradeForm= this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.route.queryParams.subscribe(params => {
      this.gradeCode = params['code'];
    });


    this.loadGradeDetails();
  }
  loadGradeDetails() {
    this.gradeService.getGradeByCode(this.gradeCode).subscribe(content => {
      this.gradeForm = this.fb.group({
        gradeCode: [content.grades[0].gradeCode, Validators.required],
        name: [content.grades[0].name, Validators.required],
        description: [content.grades[0].description, Validators.required],
      });
      this.cdr.detectChanges();
    });

  }
  updateGrade() {
    if (this.gradeForm.valid) {
      const updatedGradeData = {
        gradeCode: this.gradeForm.get('gradeCode')?.value,
        name: this.gradeForm.get('name')?.value,
        description: this.gradeForm.get('description')?.value,
      };

      this.gradeService.updateGrade(updatedGradeData).subscribe(
          () => {
            this.gradeUpdated = "updated";
            this.router.navigate(['grades/list'], { queryParams: { gradeUpdated: this.gradeUpdated  } })
            setTimeout(() => {
              this.router.navigate([], { queryParams: { gradeUpdated: null }, queryParamsHandling: 'merge' });
            }, 200);
          },
          (error) => {
            console.error(`Error during grade update with code ${this.gradeCode}`, error);
          }
      );
    } else {
      this.gradeForm.markAllAsTouched();
    }

  }
}
