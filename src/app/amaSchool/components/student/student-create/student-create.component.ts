import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Student} from "../../../models/student";
import {Router} from "@angular/router";
import {GradeService} from "../../../service/grade.service";
import {StudentService} from "../../../service/student.service";
import {catchError, map} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrl: './student-create.component.scss'
})
export class StudentCreateComponent {

    studentForm!: FormGroup;
    student !:Student;
    addStudent: String="not added";
    uploadedFile: File | null = null;


    constructor(private fb:FormBuilder,private studentService: StudentService,private router: Router) {
    }

    ngOnInit(): void {  // Ajout du type de retour
        console.log('ngOnInit ');
        this.studentForm = this.fb.group({
            cne: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            dateOfBirth: ['', Validators.required],
            birthPlace: ['', Validators.required],
            photo: [''],
            email: ['', [Validators.required, Validators.email]]
        });
    }

    cneUniqueValidator(control: AbstractControl): ValidationErrors | null {
        return this.studentService.checkCneUnique(control.value).pipe(
            map(isUnique => isUnique ? null : { cneNotUnique: true }),
            catchError(() => of(null))
        );
    }

    onUpload(event: any) {
        console.log('Files received:', event.files);
        if (event.files.length > 0) {
            this.uploadedFile = event.files[0];
            console.log('File assigned:', this.uploadedFile);
        }
    }

    createStudent() {
        console.log('Start to create');
        console.log('Form Valid:', this.studentForm.valid);
        console.log('Uploaded File:', this.uploadedFile);

        if(this.studentForm.valid && this.uploadedFile) {
            console.log('2 test');
            const newStudent: Student = { ...this.studentForm.value, photo: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg" };
            this.studentService.addStudent(newStudent).subscribe(
                (response) => {
                    this.studentForm.reset();
                    this.addStudent = "added";
                    this.router.navigate(['student/list'], { queryParams: { addStudent: this.addStudent } })
                    setTimeout(() => {
                        this.router.navigate([],{ queryParams: { addStudent: null }, queryParamsHandling: 'merge' });
                    },200);
                },
                (error) => {
                    if (error.status === 409) { // Assume 409 Conflict for CNE already exists
                        this.studentForm.get('cne')?.setErrors({ cneNotUnique: true });
                    } else {
                        console.error('Error when adding the student :', error);
                    }
                }
            )
        } else {
            console.log('Form is invalid or no file uploaded');
        }
    }



}
