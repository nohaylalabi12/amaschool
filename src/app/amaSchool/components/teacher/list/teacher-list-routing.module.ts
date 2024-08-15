import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeacherListComponent } from './teacher-list.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: TeacherListComponent }
    ])],
    exports: [RouterModule]
})
export class TeacherListRoutingModule { }
