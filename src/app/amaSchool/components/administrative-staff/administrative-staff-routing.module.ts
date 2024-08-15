import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'list', data: { breadcrumb: 'List' }, loadChildren: () => import('./administrative-staff-list/administrative-staff-list.module').then(m => m.AdministrativeStaffListModule) },
        { path: 'create', data: { breadcrumb: 'Create' }, loadChildren: () => import('./administrative-staff-create/administrative-staff-create.module').then(m => m.AdministrativeStaffCreateModule) },
        { path: 'update', data: { breadcrumb: 'Update' }, loadChildren: () => import('./administrative-staff-update/administrative-staff-update.module').then(m => m.AdministrativeStaffUpdateModule) },
        { path: 'details', data: { breadcrumb: 'Details' }, loadChildren: () => import('./administrative-staff-details/administrative-staff-details.module').then(m => m.AdministrativeStaffDetailsModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AdministrativeStaffRoutingModule { }
