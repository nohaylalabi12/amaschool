import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialtyUpdateComponent } from './specialty-update.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(
    [{ path: '', component: SpecialtyUpdateComponent }]
  )],
  exports: [RouterModule]
})
export class SpecialtyUpdateRoutingModule { }
