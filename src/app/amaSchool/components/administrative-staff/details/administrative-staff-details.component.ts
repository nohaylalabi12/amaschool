import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministrativeStaffService } from '../../../service/administrative-staff.service';
import { AdministrativeStaffResponse } from '../../../models/administrative-staff';
import { StaffAbsenceService } from '../../../service/staff-absence.service';
@Component({
    selector: 'app-administrative-staff-details',
    templateUrl: './administrative-staff-details.component.html',
    styleUrls: ['./administrative-staff-details.component.scss'],
})
export class AdministrativeStaffDetailsComponent implements OnInit {
    administrativeStaffCode: any;
    administrativeStaff!: AdministrativeStaffResponse;
  

    constructor(
        private route: ActivatedRoute,
        private administrativeStaffService: AdministrativeStaffService,
        private staffAbsenceService: StaffAbsenceService,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.administrativeStaffCode = params['code'];
            this.loadAdministrativeStaffDetails();
        });
    }
     
      navigateToList() {
        this.router.navigate(['administrative-staff/list']); 
      }
      
    loadAdministrativeStaffDetails() {
        this.administrativeStaffService
            .getStaffByCode(this.administrativeStaffCode)
            .subscribe((data) => {
                console.log('Data received:', data); // Ajouter un log ici
                this.administrativeStaff = data.staff[0];
                this.cdr.detectChanges();
            });
    }
}
