import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { StaffAbsenceUpdateComponent } from './staff-absence-update.component';
import { StaffAbsenceUpdateRoutingModule } from './staff-absence-update-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    StaffAbsenceUpdateRoutingModule
  ],
  declarations: [StaffAbsenceUpdateComponent]
})
export class StaffAbsenceUpdateModule {}
