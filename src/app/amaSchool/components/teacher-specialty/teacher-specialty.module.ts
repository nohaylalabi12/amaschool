import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';


@NgModule({
  imports: [RouterModule.forChild([
    { path: 'list', data: {breadcrumb: 'List'}, loadChildren: () => import('./specialty-list/specialty-list.module').then(m => m.SpecialtyListModule) },
    { path: 'create', data: {breadcrumb: 'Create'}, loadChildren: () => import('./specialty-create/specialty-create.module').then(m => m.SpecialtyCreateModule) },
    { path: 'update', data: {breadcrumb: 'Update'}, loadChildren: () => import('./specialty-update/specialty-update.module').then(m => m.SpecialtyUpdateModule) },
    { path: '**', redirectTo: '/notfound' }
  ])],
  exports: [RouterModule] 
})
export class TeacherSpecialtyModule { }
