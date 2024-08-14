import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialtyUpdateRoutingModule } from './specialty-update-routing.module';
import { SpecialtyUpdateComponent } from './specialty-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SpecialtyUpdateRoutingModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    DropdownModule,
    FileUploadModule,
    InputTextareaModule,
    InputGroupModule,
    InputGroupAddonModule,
    ReactiveFormsModule
  ],
  declarations: [
    SpecialtyUpdateComponent
  ]
})
export class SpecialtyUpdateModule { }
