import { Component, OnInit } from '@angular/core';
import { AdministrativeStaffResponse } from "../../../models/administrative-staff";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MessageService } from "primeng/api";
import { ActivatedRoute, Router } from "@angular/router";
import { AdministrativeStaffService } from "../../../service/administrative-staff.service";
import { Message } from 'primeng/api';


@Component({
  selector: 'app-administrative-staff-list',
  providers: [MessageService],
  templateUrl: './administrative-staff-list.component.html',
  styleUrls: ['./administrative-staff-list.component.scss']
})
export class AdministrativeStaffListComponent implements OnInit {
  staffList: AdministrativeStaffResponse[] = [];
  searchForm!: FormGroup;
  totalElements: number = 0;
  addStaff!: string;
  staffUpdated!: string;
  msgs: Message[] = [];
  displayDialog: { [key: string]: boolean } = {};

  constructor(
    private route: ActivatedRoute,
    private administrativeStaffService: AdministrativeStaffService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.addStaff = params['addStaff'];
      this.staffUpdated = params['staffUpdated'];
    });

    if (this.addStaff === 'added') {
      this.showSuccessViaMessages('add');
    }
    if (this.staffUpdated === 'updated') {
      this.showSuccessViaMessages('update');
    }
    
    this.loadStaffList(0, 10);

    this.searchForm = this.fb.group({
      staffCode: [''],
      firstName: [''],
      lastName: [''],
    });
  }

  applySearch(): void {
    const staffCode = this.searchForm.get('staffCode')?.value || '';
    const firstName = this.searchForm.get('firstName')?.value || '';
    const lastName = this.searchForm.get('lastName')?.value || '';

    this.administrativeStaffService.searchStaff(staffCode, firstName, lastName).subscribe(content => {
      this.staffList = content.staff;
      this.totalElements = content.totalElements;
    });
  }

  loadStaffList(page: number, rows: number): void {
    this.administrativeStaffService.getAllStaff(page, rows).subscribe(data => {
      this.staffList = data.staff;
      this.totalElements = data.totalElements;
      this.staffList.forEach(staff => {
        this.displayDialog[staff.administrativeStaffCode] = false;
      });
    });
  }

  showSuccessViaMessages(action: string): void {
    if (action === 'add') {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Staff successfully added' });
    }
    if (action === 'update') {
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Staff successfully updated' });
    }
  }

  navigateToCreateStaff() {
    this.router.navigate(['administrative-staff/create']);
  }

  navigateToUpdateStaff(staffCode: any) {
    this.router.navigate(['administrative-staff/update'], { queryParams: { code: staffCode } });
  }

  navigateToDetails(staffCode: any) {
    this.router.navigate(['administrative-staff/details'], { queryParams: { code: staffCode } });
  }

  onPageChange(event: any): void {
    const page = event.page;
    const size = event.rows;
    this.loadStaffList(page, size);
  }

  deleteStaff(staffCode: any): void {
    this.displayDialog[staffCode] = false;
    this.administrativeStaffService.deleteStaff(staffCode).subscribe(
      () => {
        const index = this.staffList.findIndex(staff => staff.administrativeStaffCode === staffCode);
        if (index !== -1) {
          this.staffList.splice(index, 1);
          this.loadStaffList(0, 10);
          this.showSuccessViaMessages('delete');
        }
      },
      (error) => {
        console.error(`Error when deleting staff with code ${staffCode}`, error);
      }
    );
  }

  
  downloadExcelFile() {
    this.administrativeStaffService.downloadExcel().subscribe(
      (blob) => {
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'administrative-staff.xlsx';  // Change to the desired file name
        anchor.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error downloading the file', error);
      }
    );
  }
}
