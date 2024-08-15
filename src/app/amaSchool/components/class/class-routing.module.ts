import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'list', data: {breadcrumb: 'List'}, loadChildren: () => import('./list/class-list.module').then(m => m.ClassListModule) },
        { path: 'create', data: {breadcrumb: 'Create'}, loadChildren: () => import('./create/class-create.module').then(m => m.ClassCreateModule) },
        { path: 'update', data: {breadcrumb: 'Update'}, loadChildren: () => import('./update/class-update.module').then(m => m.ClassUpdateModule) },
        { path: 'delete', data: {breadcrumb: 'Delete'}, loadChildren: () => import('./delete/class-delete.module').then(m => m.ClassDeleteModule) },
        { path: 'details', data: {breadcrumb: 'Details'}, loadChildren: () => import('./details/class-details.module').then(m => m.ClassDetailsModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ClassRoutingModule { }
