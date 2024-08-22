import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'list', data: { breadcrumb: 'List' }, loadChildren: () => import('./list/staff-absence-list.module').then(m => m.StaffAbsenceListModule) },
        { path: 'create', data: { breadcrumb: 'Create' }, loadChildren: () => import('./create/staff-absence-create.module').then(m => m.StaffAbsenceCreateModule) },
        { path: 'update', data: { breadcrumb: 'Update' }, loadChildren: () => import('./update/staff-absence-update.module').then(m => m.StaffAbsenceUpdateModule) },
        { path: 'details', data: { breadcrumb: 'Deatils' }, loadChildren: () => import('./details/staff-absence-details.module').then(m => m.StaffAbsenceDetailsModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class StaffAbsenceRoutingModule { }
