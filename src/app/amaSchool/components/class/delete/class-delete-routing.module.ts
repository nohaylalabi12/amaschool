import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClassDeleteComponent } from "./class-delete.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ClassDeleteComponent }
    ])],
    exports: [RouterModule]
})
export class ClassDeleteRoutingModule { }
