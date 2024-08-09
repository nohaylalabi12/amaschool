import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ClassDetailsComponent} from "./class-details.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ClassDetailsComponent }
    ])],
    exports: [RouterModule]
})
export class ClassDetailsRoutingModule { }
