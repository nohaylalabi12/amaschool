import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialtyCreateComponent } from './specialty-create.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
      { path: '', component: SpecialtyCreateComponent }
  ])],
  exports: [RouterModule]
})
export class SpecialtyCreateRoutingModule { }
