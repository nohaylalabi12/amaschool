import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {RoomCreateComponent} from "./room-create.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RoomCreateComponent }
    ])],
    exports: [RouterModule]
})
export class RoomCreateRoutingModule { }
