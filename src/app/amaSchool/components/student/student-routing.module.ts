import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {StudentListModule} from "./student-list/student-list.module";

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'list', data: {breadcrumb: 'List'}, loadChildren: () => import('./student-list/student-list.module').then(m => m.StudentListModule) },
        { path: 'create', data: {breadcrumb: 'Create'}, loadChildren: () => import('./student-create/student-create.module').then(m => m.StudentCreateModule) },
        { path: 'update', data: {breadcrumb: 'Update'}, loadChildren: () => import('./student-update/student-update.module').then(m => m.StudentUpdateModule) },
        { path: 'details', data: {breadcrumb: 'Details'}, loadChildren: () => import('./student-details/student-details.module').then(m => m.StudentDetailsModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class StudentRoutingModule { }
