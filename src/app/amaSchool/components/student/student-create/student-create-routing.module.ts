import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {StudentCreateComponent} from "./student-create.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: StudentCreateComponent }
    ])],
    exports: [RouterModule]
})
export class StudentCreateRoutingModule { }
