import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffAbsenceRoutingModule } from './staff-absence-routing.module'; // Le fichier de routage spécifique à ce module

@NgModule({
    imports: [
        CommonModule,
        StaffAbsenceRoutingModule // Le module de routage pour les routes spécifiques des absences
    ],
    declarations: []
})
export class StaffAbsenceModule { }
