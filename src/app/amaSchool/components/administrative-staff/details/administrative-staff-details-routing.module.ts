import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdministrativeStaffDetailsComponent } from './administrative-staff-details.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: AdministrativeStaffDetailsComponent }
    ])],
    exports: [RouterModule]
})
export class AdministrativeStaffDetailsRoutingModule { }
