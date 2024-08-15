import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {TeacherCreateComponent} from "./teacher-create.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: TeacherCreateComponent }
    ])],
    exports: [RouterModule]
})
export class TeacherCreateRoutingModule { }
