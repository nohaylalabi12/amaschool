import {ChangeDetectorRef, Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { TeacherSpecialty } from 'src/app/amaSchool/models/teacher-specialty';
import { TeacherSpecialtyService } from 'src/app/amaSchool/service/teacher-specialty.service';

@Component({
  selector: 'app-specialty-update',
  templateUrl: './specialty-update.component.html',
  styleUrls: ['./specialty-update.component.scss']
})
export class SpecialtyUpdateComponent {
  specialtyCode: any;
  specialtyForm!: FormGroup;
  specialties: TeacherSpecialty[] = [];
  specialtyUpdated: String = "not updated";

  constructor(
    private route: ActivatedRoute, 
    private fb: FormBuilder, 
    private specialtyService: TeacherSpecialtyService, 
    private router: Router, 
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.specialtyForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.route.queryParams.subscribe(params => {
      this.specialtyCode = params['code'];
    });

    this.loadSpecialtyDetails();
  }

  loadSpecialtyDetails() {
    this.specialtyService.getTeacherSpecialtyByCode(this.specialtyCode).subscribe(content => {
      this.specialtyForm = this.fb.group({
        specialtyCode: [content.teacherSpecialties[0].specialtyCode, Validators.required],
        name: [content.teacherSpecialties[0].name, Validators.required],
        description: [content.teacherSpecialties[0].description, Validators.required]
      });
      this.cdr.detectChanges();
    });
  }

  updateSpecialty() {
    if (this.specialtyForm.valid) {
      const updatedSpecialtyData = {
        specialtyCode: this.specialtyForm.get('specialtyCode')?.value,
        name: this.specialtyForm.get('name')?.value,
        description: this.specialtyForm.get('description')?.value,
      };

      this.specialtyService.updateTeacherSpecialty(updatedSpecialtyData).subscribe(
        () => {
          this.specialtyUpdated = "updated";
          this.router.navigate(['teacher-specialty/list'], { queryParams: { teacherSpecialtyUpdated: this.specialtyUpdated } });
          setTimeout(() => {
            this.router.navigate([], { queryParams: { specialtyUpdated: null }, queryParamsHandling: 'merge' });
          }, 200);
        },
        (error) => {
          console.error(`Error during specialty update with code ${this.specialtyCode}`, error);
        }
      );
    } else {
      this.specialtyForm.markAllAsTouched();
    }
  }
}
