import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TeacherSpecialtyService } from '../../../service/teacher-specialty.service';
import { TeacherSpecialty } from '../../../models/teacher-specialty';

@Component({
  selector: 'app-teacher-specialty-create',
  templateUrl: './specialty-create.component.html',
  styleUrls: ['./specialty-create.component.scss']
})
export class SpecialtyCreateComponent {
  teacherSpecialtyForm!: FormGroup;
  teacherSpecialty!: TeacherSpecialty;
  addSpecialty: string = 'not added';

  constructor(
    private fb: FormBuilder,
    private teacherSpecialtyService: TeacherSpecialtyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.teacherSpecialtyForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  createTeacherSpecialty(): void {
    if (this.teacherSpecialtyForm.valid) {
      const newSpecialty: TeacherSpecialty = { ...this.teacherSpecialtyForm.value };
      
      this.teacherSpecialtyService.addTeacherSpecialty(newSpecialty).subscribe(
        (response) => {
          this.teacherSpecialtyForm.reset();
          this.addSpecialty = 'added';
          
          this.router.navigate(['teacher-specialty/list'], { queryParams: { addTeacherSpecialty: this.addSpecialty } });
          
          setTimeout(() => {
            this.router.navigate([], { queryParams: { addSpecialty: null }, queryParamsHandling: 'merge' });
          }, 200);
        },
        (error) => {
          console.error('Error when adding the teacher specialty:', error);
        }
      );
    }
  }
}
