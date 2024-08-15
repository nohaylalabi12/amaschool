import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../../../service/teacher.service';
import { TeacherResponse } from '../../../models/teacher';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrl: './teacher-details.component.scss'
})
export class TeacherDetailsComponent implements OnInit {
  teacherCode: any;
  teacher!: TeacherResponse;

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.teacherCode = params['code'];
      this.loadTeacherDetails();
    });
  }

  loadTeacherDetails(): void {
    this.teacherService.getTeacherByCode(this.teacherCode).subscribe(data => {
      this.teacher = data.teachers[0];
      console.log('Teacher Details:', this.teacher); // Check the console output
      this.cdr.detectChanges();
    });
  }

}
