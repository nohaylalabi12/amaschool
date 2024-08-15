import {ChangeDetectorRef, Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Grade} from "../../../models/grade";
import {ActivatedRoute, Router} from "@angular/router";
import {ClassService} from "../../../service/class.service";
import {GradeService} from "../../../service/grade.service";
import {ClassRequest} from "../../../models/class";

@Component({
    selector: 'app-class-update',
    templateUrl: './class-update.component.html',
    styleUrl: './class-update.component.scss'
})
export class ClassUpdateComponent {
    classeCode: any;
    classeForm!: FormGroup;
    grades : Grade[]= [];
    totalElements !: number;
    constructor(private route: ActivatedRoute, private fb: FormBuilder, private classeService: ClassService,private gradeService: GradeService, private router: Router, private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.classeForm= this.fb.group({
            classeCode : ['', Validators.required],
            name: ['', Validators.required],
            studentLimit: ['', Validators.required],
            currentStudents: ['0', Validators.required],
            grade: [''],
        });
        this.route.queryParams.subscribe(params => {
            this.classeCode = params['code'];
        });

        this.loadGrades(0,10);
        this.loadClasseDetails();
    }
    loadGrades(page: number, size: number): void {
        this.gradeService.getAllGrade(page,size).subscribe(data => {
            this.grades = data.grades;
            this.totalElements = data.totalElements;
        });
    }
    loadClasseDetails() {
        this.classeService.getClassByCode(this.classeCode).subscribe(data => {
            this.classeForm = this.fb.group({
                classeCode: [data.classes[0].classeCode, Validators.required],
                name: [data.classes[0].name, Validators.required],
                studentLimit: [data.classes[0].studentLimit, Validators.required],
                currentStudents: [data.classes[0].currentStudents, Validators.required],
                grade: [data.classes[0].grade],
            });
            this.cdr.detectChanges();
        });

    }
    updateClasse() {
        if (this.classeForm.valid) {
            const updatedClasseData: { studentLimit: any; currentStudents: any; name: any; classeCode: any } = {
                classeCode: this.classeForm.get('classeCode')?.value,
                name: this.classeForm.get('name')?.value,
                studentLimit: this.classeForm.get('studentLimit')?.value,
                currentStudents: this.classeForm.get('currentStudents')?.value,
            };

            this.classeService.updateClass(updatedClasseData).subscribe(
                () => {
                    this.router.navigate(['classe/list'])
                },
                (error) => {
                    console.error(`Error while updating class with code ${this.classeCode}`, error);
                }
            );
        } else {
            this.classeForm.markAllAsTouched();
        }

    }
}
