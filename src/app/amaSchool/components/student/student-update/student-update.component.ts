import {ChangeDetectorRef, Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Student} from "../../../models/student";
import {ActivatedRoute, Router} from "@angular/router";
import {GradeService} from "../../../service/grade.service";
import {StudentService} from "../../../service/student.service";

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrl: './student-update.component.scss'
})
export class StudentUpdateComponent {

    studentForm!: FormGroup;
    studentCode: any;
    students:Student[]=[];
    studentUpdated: String="not updated";

    constructor(private route: ActivatedRoute, private fb: FormBuilder, private studentService: StudentService, private router: Router, private cdr: ChangeDetectorRef) { }

    ngOnInit(): void {  // Ajout du type de retour
        this.studentForm = this.fb.group({
            cne: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            dateOfBirth: ['', Validators.required],
            birthPlace: ['', Validators.required],
            photo: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]]
        });
        this.route.queryParams.subscribe(params => {
            this.studentCode = params['code'];
        });
        this.loadStudentDetails();
    }

    loadStudentDetails() {
        this.studentService.getStudentByCode(this.studentCode).subscribe(content => {
            this.studentForm = this.fb.group({
                studentCode: [content.std[0].studentCode, Validators.required],
                cne: [content.std[0].cne, Validators.required],
                firstName: [content.std[0].firstName, Validators.required],
                lastName: [content.std[0].lastName, Validators.required],
                dateOfBirth: [content.std[0].dateOfBirth, Validators.required],
                birthPlace: [content.std[0].birthPlace, Validators.required],
                photo: [content.std[0].photo, Validators.required],
                email: [content.std[0].email, [Validators.required, Validators.email]]
            });
            this.cdr.detectChanges();
        });

    }
    updateStudent() {
        if (this.studentForm.valid) {
            const updatedData = {
                studentCode: this.studentForm.get('studentCode')?.value,
                cne: this.studentForm.get('cne')?.value,
                firstName: this.studentForm.get('firstName')?.value,
                lastName: this.studentForm.get('lastName')?.value,
                dateOfBirth: this.studentForm.get('dateOfBirth')?.value,
                birthPlace: this.studentForm.get('birthPlace')?.value,
                photo: this.studentForm.get('photo')?.value,
                email: this.studentForm.get('email')?.value,
            };

            this.studentService.updateStudent(updatedData).subscribe(
                () => {
                    this.studentUpdated = "updated";
                    this.router.navigate(['student/list'], { queryParams: { studentUpdated: this.studentUpdated  } })
                    setTimeout(() => {
                        this.router.navigate([], { queryParams: { studentUpdated: null }, queryParamsHandling: 'merge' });
                    }, 200);
                },
                (error) => {
                    console.error(`Error during grade update with code ${this.studentCode}`, error);
                }
            );
        } else {
            this.studentForm.markAllAsTouched();
        }

    }
}

