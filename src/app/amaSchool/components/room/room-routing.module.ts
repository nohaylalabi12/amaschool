import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'list', data: {breadcrumb: 'List'}, loadChildren: () => import('./list/room-list.module').then(m => m.RoomListModule) },
        { path: 'create', data: {breadcrumb: 'Create'}, loadChildren: () => import('./create/room-create.module').then(m => m.RoomCreateModule) },
        { path: 'update', data: {breadcrumb: 'Update'}, loadChildren: () => import('./update/room-update.module').then(m => m.RoomUpdateModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class RoomRoutingModule { }
