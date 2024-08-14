import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeacherUpdateComponent } from './teacher-update.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: TeacherUpdateComponent }
    ])],
    exports: [RouterModule]
})
export class TeacherUpdateRoutingModule { }
