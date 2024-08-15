import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ClassService } from "../../../service/class.service";

@Component({
  selector: 'app-class-delete',
  templateUrl: './class-delete.component.html',
  styleUrls: ['./class-delete.component.scss']
})
export class ClassDeleteComponent {
  classeForm!: FormGroup;
  deleteStatus: string = "not deleted";

  constructor(
    private fb: FormBuilder,
    private classeService: ClassService,
    private router: Router
  ) {}

  ngOnInit() {
    this.classeForm = this.fb.group({
      code: ['', Validators.required],  // Only require the class code for deletion
    });
  }

  deleteclasse() {
    if (this.classeForm.valid) {
      const code = this.classeForm.get('code')?.value;
      console.log(`Deleting class with code: ${code}`);
      
      this.classeService.deleteClass(code).subscribe(
        () => {
          this.classeForm.reset();
          this.deleteStatus = "deleted";
          this.router.navigate(['class/list'], { queryParams: { deleteStatus: this.deleteStatus } });
          setTimeout(() => {
            this.router.navigate([], { queryParams: { deleteStatus: null }, queryParamsHandling: 'merge' });
          }, 200);
        },
        (error) => {
          console.error('Error while deleting the class:', error);
        }
      );
    }
  }
}
