import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdministrativeStaffListComponent } from './administrative-staff-list.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: AdministrativeStaffListComponent }
    ])],
    exports: [RouterModule]
})
export class AdministrativeStaffListRoutingModule { }
