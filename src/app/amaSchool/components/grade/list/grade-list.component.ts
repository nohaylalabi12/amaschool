import { Component } from '@angular/core';
import {Grade} from "../../../models/grade";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Message, MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {GradeService} from "../../../service/grade.service";

@Component({
  selector: 'app-grade-list',
  providers: [MessageService],
  templateUrl: './grade-list.component.html',
  styleUrl: './grade-list.component.scss'
})
export class GradeListComponent {
  grades : Grade[]= [];
  searchForm !: FormGroup;
  // first : number =0;
  // rows : number = 10;
  totalElements : number = 0;
  display: boolean = false;
  addGrade !: string;
  gradeUpdated !: string;
  msgs: Message[] = [];
  displayDialog: { [key: string]: boolean } = {};

  constructor(private route: ActivatedRoute,private gradeService: GradeService,private messageService : MessageService,private fb: FormBuilder, private router: Router) {
    this.grades.forEach(grade => {
      this.displayDialog[grade.gradeCode] = false;
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.addGrade= params['addGrade'];
    });
    this.route.queryParams.subscribe(params => {
      this.gradeUpdated= params['gradeUpdated'];

    });
    if (this.addGrade === 'added') {
      this.showSuccessViaMessages('add')
    }
    if (this.gradeUpdated === 'updated') {
      this.showSuccessViaMessages('update')
    }
    this.loadGrades(0,10);
    this.searchForm = this.fb.group({
      gradeCode: [''],
    });
  }
  showSuccessViaToast() {
      this.messageService.add({ key: 'tst2', severity: 'success', summary: 'Success', detail: 'Grade successfully deleted' });
  }
  showErrorViaToast() {
    this.messageService.add({ key: 'tst3', severity: 'error', summary: 'Error', detail: 'Grade not deleted' });
  }
  showSuccessViaMessages(action : string) {
    if (action === 'add'){
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Grade successfully added' });
    }
    if (action === 'update'){
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Grade successfully updated' });
    }



  }

  loadGrades(page : number , rows : number): void {
    this.gradeService.getAllGrade(page,rows).subscribe(data => {
      this.grades = data.grades;
      this.totalElements = data.totalElements;
      console.log(this.totalElements)
      console.log(this.grades);
    });
  }
  navigateToCreateGrade(){
    this.router.navigate(['grades/create'])
  }
  navigateToUpdateGrade(gradeCode: any){
    this.router.navigate(['grades/update'], { queryParams: { code: gradeCode} })
  }
  onPageChange(event: any): void {
    const page = event.page ;
    const size = event.rows;
    this.loadGrades(page, size);
  }
  deleteGrade(gradeCode: any): void {
    this.displayDialog[gradeCode] = false;
    this.gradeService.deleteGrade(gradeCode).subscribe(
        () => {
          const index = this.grades.findIndex(grade => grade.gradeCode === gradeCode);
          if (index !== -1) {
            this.grades.splice(index, 1);
            this.loadGrades(0,10);
            this.showSuccessViaToast();
          }
        },
        (error) => {
          console.error(`Error when deleting category with code ${gradeCode}`, error);
        }
    );
  }

  searchGradeByCode(): void {
    this.grades = [];
    this.gradeService.getGradeByCode(this.searchForm.get('gradeCode')?.value).subscribe(content => {
      this.grades = content.grades;
      this.totalElements = content.totalElements;
      // console.log(content.grades)
    });
  }

}
