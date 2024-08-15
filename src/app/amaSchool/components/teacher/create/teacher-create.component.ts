import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherRequest } from '../../../models/teacher';
import { TeacherService } from '../../../service/teacher.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-create',
  templateUrl: './teacher-create.component.html',
  styleUrl: './teacher-create.component.scss'
})
export class TeacherCreateComponent {
  teacherForm!: FormGroup;
  addTeacher: string = 'not added';

  constructor(private fb: FormBuilder, private teacherService: TeacherService, private router: Router) {}

  ngOnInit() {
    this.teacherForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cin: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      specialtyCode: ['', Validators.required],

    });
  }

  createTeacher() {
    if (this.teacherForm.valid) {
      const newTeacher: TeacherRequest = { ...this.teacherForm.value };
      this.teacherService.addTeacher(newTeacher).subscribe(
        (response) => {
          this.teacherForm.reset();
          this.addTeacher = 'added';
          this.router.navigate(['teachers/list'], { queryParams: { addTeacher: this.addTeacher } });
          setTimeout(() => {
            this.router.navigate([], { queryParams: { addTeacher: null }, queryParamsHandling: 'merge' });
          }, 200);
        },
        (error) => {
          console.error('Error when adding the teacher:', error);
        }
      );
    }
  }
}
