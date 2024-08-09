import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ClassCreateComponent} from "./class-create.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ClassCreateComponent }
    ])],
    exports: [RouterModule]
})
export class ClassCreateRoutingModule { }
