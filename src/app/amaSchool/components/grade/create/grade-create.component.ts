import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Grade } from "../../../models/grade";
import { GradeService } from "../../../service/grade.service";

@Component({
  selector: 'app-grade-create',
  templateUrl: './grade-create.component.html',
  styleUrl: './grade-create.component.scss'
})
export class GradeCreateComponent {
  gradeForm!: FormGroup;
  grade !: Grade;
  addGrade : String= "not added";
  constructor(private fb: FormBuilder,private gradeService: GradeService, private router: Router) {
  }
  ngOnInit() {
    this.gradeForm= this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  createGrade() {
    if (this.gradeForm.valid) {
      const newGrade: Grade = { ...this.gradeForm.value };
      this.gradeService.addGrade(newGrade).subscribe(
          (response) => {
            this.gradeForm.reset();
            this.addGrade = "added";
            this.router.navigate(['grades/list'], { queryParams: { addGrade: this.addGrade  } })
            setTimeout(() => {
              this.router.navigate([], { queryParams: { addGrade: null }, queryParamsHandling: 'merge' });
            }, 200);

          },
          (error) => {
            console.error('Error when adding the grade :', error);
          }
      );
    }
  }
}
