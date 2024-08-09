import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ClassUpdateComponent} from "./class-update.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ClassUpdateComponent }
    ])],
    exports: [RouterModule]
})
export class ClassUpdateRoutingModule { }
