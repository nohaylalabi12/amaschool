import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {GradeCreateComponent} from "./grade-create.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: GradeCreateComponent }
    ])],
    exports: [RouterModule]
})
export class GradeCreateRoutingModule { }
