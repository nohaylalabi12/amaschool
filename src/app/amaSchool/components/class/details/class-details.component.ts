import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ClassResponse } from "../../../models/class";
import { ClassService } from "../../../service/class.service";

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss']
})
export class ClassDetailsComponent {
  classeCode: any;
  classe!: ClassResponse;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.classeCode = params['code'];
    });
    this.loadClasseDetails();
  }

  constructor(private route: ActivatedRoute, private classeService: ClassService, private router: Router, private cdr: ChangeDetectorRef) {}

  loadClasseDetails() {
    this.classeService.getClassByCode(this.classeCode).subscribe(data => {
      this.classe = data.classes[0];
    });
  }
}
