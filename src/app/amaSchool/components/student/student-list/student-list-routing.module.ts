import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {StudentListComponent} from "./student-list.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: StudentListComponent }
    ])],
    exports: [RouterModule]
})
export class StudentListRoutingModule { }
