import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {StudentUpdateComponent} from "./student-update.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: StudentUpdateComponent }
    ])],
    exports: [RouterModule]
})
export class StudentUpdateRoutingModule { }
