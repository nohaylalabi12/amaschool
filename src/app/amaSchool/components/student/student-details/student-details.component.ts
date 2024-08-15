import {ChangeDetectorRef, Component} from '@angular/core';
import {Student} from "../../../models/student";
import {ActivatedRoute, Router} from "@angular/router";
import {ClassService} from "../../../service/class.service";
import {StudentService} from "../../../service/student.service";

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.scss'
})
export class StudentDetailsComponent {
    studentCode : any;
    student!: Student;
    totalElements !: number;

    ngOnInit(): void {

        this.route.queryParams.subscribe(params => {
            this.studentCode = params['code'];
            console.log("Studentttttttttt"+this.studentCode);
        });
        this.loadClasseDetails();
    }

    constructor(private route: ActivatedRoute,  private studentService: StudentService, private router: Router, private cdr: ChangeDetectorRef) { }

    loadClasseDetails() {

        this.studentService.getStudentByCode(this.studentCode).subscribe(data => {
            this.student= data.std[0];
            console.log("**************************Studentttttttttt***********************"+this.student);
        });
    }



}
