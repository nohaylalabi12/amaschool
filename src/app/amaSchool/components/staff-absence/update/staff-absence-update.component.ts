import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffAbsenceService } from '../../../service/staff-absence.service';
import {
    StaffAbsenceRequest,
    StaffAbsenceResponse,
} from '../../../models/staff-absence';
import { AdministrativeStaffService } from '../../../service/administrative-staff.service';
import { AdministrativeStaffResponse } from '../../../models/administrative-staff';

@Component({
    selector: 'app-staff-absence-update',
    templateUrl: './staff-absence-update.component.html',
    styleUrls: ['./staff-absence-update.component.scss'],
})
export class StaffAbsenceUpdateComponent implements OnInit {
    absenceCode: string | null = null;
    absenceForm!: FormGroup;
    absences: StaffAbsenceResponse[] = [];
    staffList: AdministrativeStaffResponse[] = []; // Array to hold staff data
  
    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private absenceService: StaffAbsenceService,
        private staffService: AdministrativeStaffService,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) {}
    absenceStatusOptions = [
        { label: 'Justified', value: 'Justified' },
        { label: 'Unjustified', value: 'Unjustified' }
      ];
      
      ngOnInit() {
        this.absenceForm = this.fb.group({
            staffAbsenceCode:  [{value: '', disabled: true}, Validators.required],
            administrativeStaffCode: ['', Validators.required],
            absenceDate: ['', Validators.required],
            startTime: ['', Validators.required],
            endTime: ['', Validators.required],
            absenceCause: ['', Validators.required],
            absenceStatus: ['', Validators.required],
        });
    
        this.route.queryParams.subscribe((params) => {
            this.absenceCode = params['code'];
            if (this.absenceCode) {
                this.loadAbsenceDetails();
            }
        });
    
        this.loadStaff(); // Load administrative staff for selection
    }
    

    loadAbsenceDetails() {
        if (!this.absenceCode) return;

        this.absenceService.getStaffAbsenceByCode(this.absenceCode).subscribe(
            data => {
                if (data.staffAbsences && data.staffAbsences.length > 0) {
                    // Extraction du premier élément du tableau 'staffAbsences'
                    const absence = data.staffAbsences[0];

                    if (absence) {
                        const absenceDate = absence.absenceDate ? new Date(absence.absenceDate) : null;
                        const startTime = absence.startTime ? this.convertTimeToDate(absence.startTime) : null;
                        const endTime = absence.endTime ? this.convertTimeToDate(absence.endTime) : null;

                        this.absenceForm.patchValue({
                           staffAbsenceCode: absence.staffAbsenceCode,
                            administrativeStaffCode: absence.administrativeStaff?.administrativeStaffCode || '',
                            absenceDate: absenceDate,
                            startTime: startTime,
                            endTime: endTime,
                            absenceCause: absence.absenceCause || '',
                            absenceStatus: absence.absenceStatus || ''
                        });
                    }
                } else {
                    console.error('No matching absence found for the provided absenceCode.');
                }

                this.cdr.detectChanges();
            },
            error => {
                console.error(`Error loading absence details with code ${this.absenceCode}`, error);
            }
        );
    }

    // Load the list of administrative staff
    loadStaff() {
        this.staffService.getAllStaff(0, 100).subscribe(
            (data) => {
                this.staffList = data.staff;
            },
            (error) => {
                console.error('Error loading administrative staff', error);
            }
        );
    }

   
    updateAbsence() {
        if (this.absenceForm.valid) {
          // Format start and end times before sending to backend
          const formattedStartTime = this.formatTime(this.absenceForm.get('startTime')?.value);
          const formattedEndTime = this.formatTime(this.absenceForm.get('endTime')?.value);
    
          const updatedAbsenceData:StaffAbsenceRequest= {
            id: 0,  // Adjust based on your logic
            staffAbsenceCode: this.absenceForm.get('staffAbsenceCode')?.value,
            administrativeStaffCode: this.absenceForm.get('administrativeStaffCode')?.value,
            absenceDate: this.absenceForm.get('absenceDate')?.value.toISOString().split('T')[0],  // Format to 'YYYY-MM-DD'
            startTime: formattedStartTime,  // Use formatted time here
            endTime: formattedEndTime,      // Use formatted time here
            absenceCause: this.absenceForm.get('absenceCause')?.value,
            absenceStatus: this.absenceForm.get('absenceStatus')?.value
          };
    
          this.absenceService.updateStaffAbsence(updatedAbsenceData).subscribe(
            () => {
              this.router.navigate(['staff-absence/list']);
            },
            error => {
              console.error(`Error while updating absence with code ${this.absenceCode}`, error);
            }
          );
        } else {
          this.absenceForm.markAllAsTouched();
        }
      }

  
  

    // Utility function to format time in 'HH:mm:ss' format
    private formatTime(date: Date): string {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    // Convert 'HH:mm:ss' string to a Date object
    convertTimeToDate(timeString: string): Date {
        const [hours, minutes, seconds] = timeString.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, seconds || 0);
        return date;
    }
}