import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StaffAbsenceUpdateComponent } from './staff-absence-update.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: StaffAbsenceUpdateComponent }
  ])],
  exports: [RouterModule]
})
export class StaffAbsenceUpdateRoutingModule { }
