import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StaffAbsenceRequest } from '../../../models/staff-absence';
import { StaffAbsenceService } from '../../../service/staff-absence.service';
import { AdministrativeStaffService } from '../../../service/administrative-staff.service';  // Use AdministrativeStaffService
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdministrativeStaffResponse } from '../../../models/administrative-staff';


@Component({
  selector: 'app-staff-absence-create',
  templateUrl: './staff-absence-create.component.html',
  styleUrls: ['./staff-absence-create.component.scss'],
  providers: [MessageService]
})
export class StaffAbsenceCreateComponent implements OnInit {
  staffAbsenceForm!: FormGroup;
  addStaffAbsence: string = 'not added';
  staffs: any[] = [];  // Array for staff dropdown options

  absenceStatusOptions = [
    { label: 'Justified', value: 'Justified' },
    { label: 'Unjustified', value: 'Unjustified' }
  ];

  constructor(
    private fb: FormBuilder,
    private staffAbsenceService: StaffAbsenceService,
    private administrativeStaffService: AdministrativeStaffService,  // Inject AdministrativeStaffService
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.loadStaffs();  // Load the staff data when the component initializes
  }

  // Initialize the form group
  initializeForm() {
    this.staffAbsenceForm = this.fb.group({
      administrativeStaffCode: ['', Validators.required],
      absenceDate: ['', Validators.required],
      absenceCause: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      absenceStatus: ['', Validators.required],
    });
  }

  // Load the staff options for the dropdown
  loadStaffs() {
    this.administrativeStaffService.getAllStaff(0, 100).subscribe(
      data => {
        this.staffs = data.staff.map((staff: AdministrativeStaffResponse) => ({
          label: `${staff.firstName} ${staff.lastName}`,
          value: staff.administrativeStaffCode
        }));
      },
      error => {
        console.error('Error loading staff', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load staff.' });
      }
    );
  }
  

  // Create the staff absence
  createStaffAbsence() {
    if (this.staffAbsenceForm.valid) {
      const formattedAbsenceData = this.formatAbsenceData();
      this.staffAbsenceService.addStaffAbsence(formattedAbsenceData).subscribe(
        () => {
          this.onSuccess();
        },
        (error) => {
          this.onError(error);
        }
      );
    } else {
      this.staffAbsenceForm.markAllAsTouched();
      this.messageService.add({ severity: 'warn', summary: 'Validation Error', detail: 'Please fill in all required fields.' });
    }
  }

  // Format the absence data for submission
  formatAbsenceData(): StaffAbsenceRequest {
    const absenceDate = this.formatDateToUTC(this.staffAbsenceForm.value.absenceDate);
    const startTime = this.formatTime(this.staffAbsenceForm.value.startTime);
    const endTime = this.formatTime(this.staffAbsenceForm.value.endTime);

    return {
      ...this.staffAbsenceForm.value,
      absenceDate: absenceDate,
      startTime: startTime,
      endTime: endTime,
    };
  }

  // Convert the date to UTC format
  formatDateToUTC(date: Date): string {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];
  }

  // Format the time to 'HH:mm:ss'
  formatTime(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  // Success handler
  onSuccess() {
    this.staffAbsenceForm.reset();
    this.addStaffAbsence = 'added';
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Staff Absence successfully added' });
    this.router.navigate(['staff-absence/list'], { queryParams: { addStaffAbsence: this.addStaffAbsence } });
    setTimeout(() => {
      this.router.navigate([], { queryParams: { addStaffAbsence: null }, queryParamsHandling: 'merge' });
    }, 200);
  }

  // Error handler
  onError(error: any) {
    const errorMsg = error?.error?.message || 'An error occurred while adding the staff absence.';
    this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMsg });
  }
}
