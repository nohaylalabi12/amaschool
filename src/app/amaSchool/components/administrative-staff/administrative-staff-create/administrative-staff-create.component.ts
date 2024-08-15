import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdministrativeStaffRequest } from '../../../models/administrative-staff';
import { AdministrativeStaffService } from '../../../service/administrative-staff.service';

@Component({
  selector: 'app-administrative-staff-create',
  templateUrl: './administrative-staff-create.component.html',
  styleUrls: ['./administrative-staff-create.component.scss']
})
export class AdministrativeStaffCreateComponent {
  administrativeStaffForm!: FormGroup;
  addAdministrativeStaff: string = "not added";

  constructor(private fb: FormBuilder, private administrativeStaffService: AdministrativeStaffService, private router: Router) {}

  ngOnInit() {
      this.administrativeStaffForm = this.fb.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          phone: ['', Validators.required],
          role: ['', Validators.required]
      });
  }

  createAdministrativeStaff() {
    if (this.administrativeStaffForm.valid) {
        const newAdministrativeStaff: AdministrativeStaffRequest = { ...this.administrativeStaffForm.value };
        this.administrativeStaffService.addStaff(newAdministrativeStaff).subscribe(
            (response) => {
              this.administrativeStaffForm.reset();
              this.addAdministrativeStaff = "added";
              this.router.navigate(['administrative-staff/list'], { queryParams: { addAdministrativeStaff: this.addAdministrativeStaff } });
              setTimeout(() => {
                this.router.navigate([], { queryParams: { addAdministrativeStaff: null }, queryParamsHandling: 'merge' });
              }, 200);
            },
            (error) => {
              console.error('Error while adding the administrative staff:', error);
            }
        );
    }
  }
}
