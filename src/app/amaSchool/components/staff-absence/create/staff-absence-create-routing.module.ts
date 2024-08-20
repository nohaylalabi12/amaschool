import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StaffAbsenceCreateComponent } from './staff-absence-create.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: StaffAbsenceCreateComponent }
    ])],
    exports: [RouterModule]
})
export class StaffAbsenceCreateRoutingModule { }
