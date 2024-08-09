import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'list', data: {breadcrumb: 'List'}, loadChildren: () => import('./list/grade-list.module').then(m => m.GradeListModule) },
        { path: 'create', data: {breadcrumb: 'Create'}, loadChildren: () => import('./create/grade-create.module').then(m => m.GradeCreateModule) },
        { path: 'update', data: {breadcrumb: 'Update'}, loadChildren: () => import('./update/grade-update.module').then(m => m.GradeUpdateModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class GradeRoutingModule { }
