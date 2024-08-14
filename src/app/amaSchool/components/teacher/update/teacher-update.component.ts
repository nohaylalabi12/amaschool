import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../../../service/teacher.service';
import { TeacherRequest, TeacherResponse } from '../../../models/teacher';

@Component({
  selector: 'app-teacher-update',
  templateUrl: './teacher-update.component.html',
  styleUrl: './teacher-update.component.scss'
})
export class TeacherUpdateComponent implements OnInit {
  teacherCode: any;
  teacherForm!: FormGroup;
  specialties: any[] = [];  // Define the specialties array

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private teacherService: TeacherService,  // Use TeacherService to load specialties
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.teacherForm = this.fb.group({
      teacherCode: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cin: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      specialtyCode: ['', Validators.required],
    });

    this.route.queryParams.subscribe(params => {
      this.teacherCode = params['code'];
    });

    this.loadTeacherDetails();
    this.loadSpecialties();  // Load specialties from the backend
  }

  loadTeacherDetails() {
    this.teacherService.getTeacherByCode(this.teacherCode).subscribe(data => {
      const teacher = data.teachers[0]; // Assuming you get an array of teachers
      this.teacherForm.setValue({
        teacherCode: teacher.teacherCode,
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        cin: teacher.cin,
        email: teacher.email,
        phone: teacher.phone,
        specialtyCode: teacher.specialty.specialtyCode  // Set the specialtyCode from the nested object
      });
      this.cdr.detectChanges();
    });
  }

  loadSpecialties() {
    this.teacherService.getAllSpecialties().subscribe(data => {
      this.specialties = data; // Populate the specialties array
    });
  }

  updateTeacher() {
    if (this.teacherForm.valid) {
      const updatedTeacherData: TeacherRequest = {
        teacherCode: this.teacherForm.get('teacherCode')?.value,
        firstName: this.teacherForm.get('firstName')?.value,
        lastName: this.teacherForm.get('lastName')?.value,
        cin: this.teacherForm.get('cin')?.value,
        email: this.teacherForm.get('email')?.value,
        phone: this.teacherForm.get('phone')?.value,
        specialtyCode: this.teacherForm.get('specialtyCode')?.value
      };

      this.teacherService.updateTeacher(updatedTeacherData).subscribe(
        () => {
          this.router.navigate(['teachers/list']);
        },
        (error) => {
          console.error(`Error while updating teacher with code ${this.teacherCode}`, error);
        }
      );
    } else {
      this.teacherForm.markAllAsTouched();
    }
  }
}
