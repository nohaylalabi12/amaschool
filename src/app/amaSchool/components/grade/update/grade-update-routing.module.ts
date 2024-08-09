import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {GradeUpdateComponent} from "./grade-update.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: GradeUpdateComponent}
    ])],
    exports: [RouterModule]
})
export class GradeUpdateRoutingModule { }
