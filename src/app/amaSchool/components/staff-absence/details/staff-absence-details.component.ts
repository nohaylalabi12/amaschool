import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffAbsenceService } from '../../../service/staff-absence.service';
import { StaffAbsenceResponse } from '../../../models/staff-absence';
import { AdministrativeStaffResponse } from 'src/app/amaSchool/models/administrative-staff';

@Component({
    selector: 'app-staff-absence-details',
    templateUrl: './staff-absence-details.component.html',
    styleUrls: ['./staff-absence-details.component.scss'],
})
export class StaffAbsenceDetailsComponent implements OnInit {
    staffAbsenceCode: any;
    staffAbsence!: StaffAbsenceResponse;
    administrativeStaff!: AdministrativeStaffResponse;  // Add this property to hold the staff details

    constructor(
        private route: ActivatedRoute,
        private staffAbsenceService: StaffAbsenceService,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.staffAbsenceCode = params['code'];
            this.loadStaffAbsenceDetails();
        });
    }

    navigateToList() {
        this.router.navigate(['staff-absence/list']); 
    }

    loadStaffAbsenceDetails() {
        this.staffAbsenceService
            .getAbsenceByCode(this.staffAbsenceCode)
            .subscribe((data) => {
                console.log('Data received:', data); 
                this.staffAbsence = data.absences[0];
                this.cdr.detectChanges();
            });
    }
}
