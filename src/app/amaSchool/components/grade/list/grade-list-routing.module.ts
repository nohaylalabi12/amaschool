import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {GradeListComponent} from "./grade-list.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: GradeListComponent }
    ])],
    exports: [RouterModule]
})
export class GradeListRoutingModule { }
