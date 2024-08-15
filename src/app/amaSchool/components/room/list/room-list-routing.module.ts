import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {RoomListComponent} from "./room-list.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RoomListComponent }
    ])],
    exports: [RouterModule]
})
export class RoomListRoutingModule { }
