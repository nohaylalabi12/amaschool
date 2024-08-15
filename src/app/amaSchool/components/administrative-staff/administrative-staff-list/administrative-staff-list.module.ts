import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { AdministrativeStaffListComponent } from './administrative-staff-list.component';
import { AdministrativeStaffListRoutingModule } from './administrative-staff-list-routing.module';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AdministrativeStaffListRoutingModule,
        ButtonModule,
        RippleModule,
        InputTextModule,
        DropdownModule,
        FileUploadModule,
        InputTextareaModule,
        InputGroupModule,
        InputGroupAddonModule,
        ReactiveFormsModule,
        DialogModule,
        PaginatorModule,
        TableModule,
        ToastModule
    ],
    declarations: [AdministrativeStaffListComponent]
})
export class AdministrativeStaffListModule { }
