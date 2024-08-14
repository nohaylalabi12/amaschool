import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'list', data: {breadcrumb: 'List'}, loadChildren: () => import('./list/teacher-list.module').then(m => m.TeacherListModule) },
        { path: 'create', data: {breadcrumb: 'Create'}, loadChildren: () => import('./create/teacher-create.module').then(m => m.TeacherCreateModule) },
        { path: 'update', data: {breadcrumb: 'Update'}, loadChildren: () => import('./update/teacher-update.module').then(m => m.TeacherUpdateModule) },
        { path: 'details', data: {breadcrumb: 'Details'}, loadChildren: () => import('./details/teacher-details.module').then(m => m.TeacherDetailsModule) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class TeacherRoutingModule { }
