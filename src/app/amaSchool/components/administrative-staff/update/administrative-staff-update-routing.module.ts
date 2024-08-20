import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdministrativeStaffUpdateComponent } from './administrative-staff-update.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: AdministrativeStaffUpdateComponent }
    ])],
    exports: [RouterModule]
})
export class AdministrativeStaffUpdateRoutingModule { }
