import {ChangeDetectorRef, Component} from '@angular/core';
import {ClassResponse} from "../../../models/class";
import {ActivatedRoute, Router} from "@angular/router";
import {ClassService} from "../../../service/class.service";

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrl: './class-details.component.scss'
})
export class ClassDetailsComponent {
  classeCode: any;
  classe !: ClassResponse;
  totalElements !: number;
  ngOnInit(): void {
    this.loadClasseDetails();
    this.route.queryParams.subscribe(params => {
      this.classeCode= params['code'];
      // console.log(this.userCode)
    });

  }
  constructor(private route: ActivatedRoute,  private classeService: ClassService, private router: Router, private cdr: ChangeDetectorRef) { }

  loadClasseDetails() {
    this.classeService.getClassByCode(this.classeCode).subscribe(data => {
      this.classe= data.classes[0];
    });
  }


}
