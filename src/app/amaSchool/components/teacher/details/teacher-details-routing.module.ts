import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeacherDetailsComponent } from './teacher-details.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: TeacherDetailsComponent } // This should be the correct path
    ])],
    exports: [RouterModule]
})
export class TeacherDetailsRoutingModule { }
