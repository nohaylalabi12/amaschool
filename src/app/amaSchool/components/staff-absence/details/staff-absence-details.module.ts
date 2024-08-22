import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { ProgressBarModule } from 'primeng/progressbar';
import { StaffAbsenceDetailsComponent } from './staff-absence-details.component';
import { StaffAbsenceDetailsRoutingModule } from './staff-absence-details-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        StaffAbsenceDetailsRoutingModule,
        ButtonModule,
        RippleModule,
        InputTextModule,
        ReactiveFormsModule,
        DialogModule,
        PaginatorModule,
        TableModule,
        ToastModule,
        TabViewModule,
        ProgressBarModule  
    ],
    declarations: [StaffAbsenceDetailsComponent]
})
export class StaffAbsenceDetailsModule { }
