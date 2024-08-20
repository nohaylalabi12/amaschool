import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdministrativeStaffCreateComponent } from './administrative-staff-create.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: AdministrativeStaffCreateComponent }
    ])],
    exports: [RouterModule]
})
export class AdministrativeStaffCreateRoutingModule { }
