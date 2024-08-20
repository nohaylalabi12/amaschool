import { Component, OnInit } from '@angular/core';
import { StaffAbsenceResponse } from "../../../models/staff-absence";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Message, MessageService } from "primeng/api";
import { ActivatedRoute, Router } from "@angular/router";
import { StaffAbsenceService } from "../../../service/staff-absence.service";

@Component({
  selector: 'app-staff-absence-list',
  providers: [MessageService],
  templateUrl: './staff-absence-list.component.html',
  styleUrls: ['./staff-absence-list.component.scss']
})
export class StaffAbsenceListComponent implements OnInit {
  absences: StaffAbsenceResponse[] = [];
  searchForm!: FormGroup;
  totalElements: number = 0;
  display: boolean = false;
  addAbsence!: string;
  absenceUpdated!: string;
  msgs: Message[] = [];
  displayDialog: { [key: string]: boolean } = {};

  // Define the search options for the dropdown
  searchOptions = [
    { label: 'Staff Code', value: 'staffCode' },
    { label: 'Staff Name', value: 'staffName' },
    { label: 'Absence Code', value: 'absenceCode' },
    { label: 'Absence Date', value: 'absenceDate' }
  ];

  // Property to hold the selected search type
  selectedSearchType: string = 'staffCode';

  constructor(
    private route: ActivatedRoute,
    private absenceService: StaffAbsenceService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.addAbsence = params['addAbsence'];
      this.absenceUpdated = params['absenceUpdated'];
    });

    if (this.addAbsence === 'added') {
      this.showSuccessViaMessages('add');
    }
    if (this.absenceUpdated === 'updated') {
      this.showSuccessViaMessages('update');
    }

    this.loadAbsences(0, 10);

    // Initialize searchForm with all necessary controls
    this.searchForm = this.fb.group({
      searchType: [this.selectedSearchType],
      searchValue: ['']
    });

    // Update the selected search type when the dropdown changes
    this.searchForm.get('searchType')?.valueChanges.subscribe(value => {
      this.selectedSearchType = value;
    });
  }

  showSuccessViaToast() {
    this.messageService.add({ key: 'tst2', severity: 'success', summary: 'Success', detail: 'Absence successfully deleted' });
  }

  showErrorViaToast() {
    this.messageService.add({ key: 'tst3', severity: 'error', summary: 'Error', detail: 'Absence not deleted' });
  }

  showSuccessViaMessages(action: string) {
    this.msgs = []; // Clear the previous messages
    if (action === 'add') {
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Absence successfully added' });
    }
    if (action === 'update') {
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Absence successfully updated' });
    }
  }

  loadAbsences(page: number, rows: number): void {
    this.absenceService.getAllStaffAbsences(page, rows).subscribe(data => {
      this.absences = data.staffAbsences;
      this.totalElements = data.totalElements;

      // Initialize displayDialog object for each absence
      this.absences.forEach(absence => {
        this.displayDialog[absence.staffAbsenceCode] = false;
      });
    });
  }

  navigateToCreateAbsence() {
    this.router.navigate(['staff-absence/create']);
  }

  navigateToUpdateAbsence(staffAbsenceCode: string) {
    this.router.navigate(['staff-absence/update'], { queryParams: { code: staffAbsenceCode } });
  }

  onPageChange(event: any): void {
    const page = event.page;
    const size = event.rows;
    this.loadAbsences(page, size);
  }

  deleteAbsence(absenceCode: string): void {
    this.displayDialog[absenceCode] = false;
    this.absenceService.deleteStaffAbsence(absenceCode).subscribe(
      () => {
        const index = this.absences.findIndex(absence => absence.staffAbsenceCode === absenceCode);
        if (index !== -1) {
          this.absences.splice(index, 1);
          this.loadAbsences(0, 10);
          this.showSuccessViaToast();
        }
      },
      (error) => {
        console.error(`Error when deleting absence with code ${absenceCode}`, error);
        this.showErrorViaToast();
      }
    );
  }

  applySearch(): void {
    const searchType = this.searchForm.get('searchType')?.value;
    const searchValue = this.searchForm.get('searchValue')?.value || '';

    // If no search value is provided, load all absences
    if (!searchValue) {
      this.loadAbsences(0, 10); 
      return;
    }

    let criteria: any = {};
    if (searchType === 'absenceDate') {
      const date = new Date(searchValue);
      // Adjusting the date by converting to UTC to avoid timezone-related issues
      const adjustedDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      criteria[searchType] = adjustedDate.toISOString().split('T')[0];
    } else {
      criteria[searchType] = searchValue;
    }

    console.log('Search criteria:', criteria);

    this.absenceService.getStaffAbsencesByCriteria(criteria).subscribe(response => {
      this.absences = response.staffAbsences;
      console.log(response.staffAbsences);
      
      this.totalElements = response.totalElements;
    }, error => {
      console.error('Error fetching filtered absences:', error);
    });
  }

  formatTimeToHoursAndMinutes(time: string): string {
    if (!time) return ''; // Return an empty string if no time is provided
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  }

  downloadExcelFile() {
    this.absenceService.downloadExcel().subscribe(
      (blob) => {
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'staff-absences.xlsx';  // Change to the desired file name
        anchor.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error downloading the file', error);
      }
    );
  }
}
