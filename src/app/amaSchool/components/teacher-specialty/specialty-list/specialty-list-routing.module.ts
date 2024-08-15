import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeacherSpecialtyListComponent } from './specialty-list.component';

@NgModule({
  imports: [RouterModule.forChild([
      { path: '', component: TeacherSpecialtyListComponent }
  ])],
  exports: [RouterModule]
})
export class SpecialtyListRoutingModule { }
