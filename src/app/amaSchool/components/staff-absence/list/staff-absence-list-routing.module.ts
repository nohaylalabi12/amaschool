import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StaffAbsenceListComponent } from './staff-absence-list.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: StaffAbsenceListComponent }
    ])],
    exports: [RouterModule]
})
export class StaffAbsenceListRoutingModule { }
