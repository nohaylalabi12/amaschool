import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StaffAbsenceDetailsComponent } from './staff-absence-details.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: StaffAbsenceDetailsComponent }
    ])],
    exports: [RouterModule]
})
export class StaffAbsenceDetailsRoutingModule { }
