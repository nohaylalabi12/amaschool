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
import { AdministrativeStaffDetailsComponent } from './administrative-staff-details.component';
import { AdministrativeStaffDetailsRoutingModule } from './administrative-staff-details-routing.module';
import { ProgressBarModule } from 'primeng/progressbar';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AdministrativeStaffDetailsRoutingModule,
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
    declarations: [AdministrativeStaffDetailsComponent]
})
export class AdministrativeStaffDetailsModule { }
