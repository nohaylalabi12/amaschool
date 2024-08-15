import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {RoomUpdateComponent} from "./room-update.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RoomUpdateComponent}
    ])],
    exports: [RouterModule]
})
export class RoomUpdateRoutingModule { }
