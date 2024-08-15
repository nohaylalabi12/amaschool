import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialtyCreateRoutingModule } from './specialty-create-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { SpecialtyCreateComponent } from './specialty-create.component';


@NgModule({
  imports: [
    CommonModule,
    SpecialtyCreateRoutingModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    DropdownModule,
    FileUploadModule,
    InputTextareaModule,
    InputGroupModule,
    InputGroupAddonModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  declarations: [SpecialtyCreateComponent]
})
export class SpecialtyCreateModule { }
