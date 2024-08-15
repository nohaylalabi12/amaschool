import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministrativeStaffService } from '../../../service/administrative-staff.service';

@Component({
  selector: 'app-administrative-staff-update',
  templateUrl: './administrative-staff-update.component.html',
  styleUrls: ['./administrative-staff-update.component.scss']
})
export class AdministrativeStaffUpdateComponent {

    staffForm!: FormGroup;
    staffCode: any;
    staffUpdated: String = "not updated";

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private administrativeStaffService: AdministrativeStaffService,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.staffForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            role: ['', Validators.required]
        });

        this.route.queryParams.subscribe(params => {
            this.staffCode = params['code'];
        });

        this.loadStaffDetails();
    }

    loadStaffDetails() {
      this.administrativeStaffService.getStaffByCode(this.staffCode).subscribe(data => {
          console.log('Data received:', data); // Log pour vérifier les données
          const staff = data.staff[0]; // Extraction du premier élément de `data.staff`
          
          // Mettre à jour le formulaire avec les données extraites
          this.staffForm.setValue({
              firstName: staff.firstName,
              lastName: staff.lastName,
              email: staff.email,
              phone: staff.phone,
              role: staff.role
          });
  
          this.cdr.detectChanges(); // Forcer la détection des changements
      });
  }
  
    updateStaff() {
        if (this.staffForm.valid) {
            const updatedData = {
                administrativeStaffCode: this.staffCode,
                firstName: this.staffForm.get('firstName')?.value,
                lastName: this.staffForm.get('lastName')?.value,
                email: this.staffForm.get('email')?.value,
                phone: this.staffForm.get('phone')?.value,
                role: this.staffForm.get('role')?.value
            };

            this.administrativeStaffService.updateStaff(updatedData).subscribe(
                () => {
                    this.staffUpdated = "updated";
                    this.router.navigate(['administrative-staff/list'], { queryParams: { staffUpdated: this.staffUpdated } });
                    setTimeout(() => {
                        this.router.navigate([], { queryParams: { staffUpdated: null }, queryParamsHandling: 'merge' });
                    }, 200);
                },
                (error) => {
                    console.error(`Error during staff update with code ${this.staffCode}`, error);
                }
            );
        } else {
            this.staffForm.markAllAsTouched();
        }
    }
}
