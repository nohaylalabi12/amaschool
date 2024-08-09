import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ClassListComponent} from "./class-list.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ClassListComponent }
    ])],
    exports: [RouterModule]
})
export class ClassListRoutingModule { }
