import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Message, MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {ClassResponse} from "../../../models/class";
import {ClassService} from "../../../service/class.service";

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  providers: [MessageService],
  styleUrl: './class-list.component.scss'
})
export class ClassListComponent {
  classes : ClassResponse[]= [];
  searchForm !: FormGroup;
  totalElements : number = 0;
  display: boolean = false;
  addClasse !: string;
  classUpdated !: string;
  msgs: Message[] = [];
  displayDialog: { [key: string]: boolean } = {};

  constructor(private route: ActivatedRoute,private classService: ClassService,private messageService : MessageService,private fb: FormBuilder, private router: Router) {
    this.classes.forEach(classe => {
      this.displayDialog[classe.classeCode] = false;
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.addClasse= params['addClasse'];
    });
    this.route.queryParams.subscribe(params => {
      this.classUpdated= params['classUpdated'];

    });
    if (this.addClasse === 'added') {
      this.showSuccessViaMessages('add')
    }
    if (this.classUpdated === 'updated') {
      this.showSuccessViaMessages('update')
    }
    this.loadClasses(0,10);
    this.searchForm = this.fb.group({
      classeCode: [''],
    });
  }
  showSuccessViaToast() {
    this.messageService.add({ key: 'tst2', severity: 'success', summary: 'Success', detail: 'Class successfully deleted' });


  }
  showErrorViaToast() {
    this.messageService.add({ key: 'tst3', severity: 'error', summary: 'Error', detail: 'Class not deleted' });
  }
  showSuccessViaMessages(action : string) {
    if (action === 'add'){
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Class successfully added' });
    }
    if (action === 'update'){
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Class successfully updated' });
    }



  }

  loadClasses(page : number , rows : number): void {
    this.classService.getAllClass(page,rows).subscribe(data => {
      this.classes = data.classes;
      this.totalElements = data.totalElements;
      console.log(this.totalElements)
      console.log(this.classes);
    });
  }
  navigateToCreateClasse(){
    this.router.navigate(['classe/create'])
  }
  navigateToDetails(classeCode: any){
    this.router.navigate(['classe/details'], { queryParams: { code: classeCode} })
  }
  navigateToUpdateClasse(classeCode: any){
    this.router.navigate(['classe/update'], { queryParams: { code: classeCode} })
  }
  onPageChange(event: any): void {
    const page = event.page ;
    const size = event.rows;
    this.loadClasses(page, size);
  }
  deleteClasse(classeCode: any): void {
    this.displayDialog[classeCode] = false;
    this.classService.deleteClass(classeCode).subscribe(
        () => {
          const index = this.classes.findIndex(classe => classe.classeCode === classeCode);
          if (index !== -1) {
            this.classes.splice(index, 1);
            this.loadClasses(0,10);
            this.showSuccessViaToast();
          }
        },
        (error) => {
          console.error(`Error when deleting class with code ${classeCode}`, error);
          // this.showErrorViaToast()
        }
    );
  }

  searchClassByCode(): void {
    this.classes = [];
    this.classService.getClassByCode(this.searchForm.get('classeCode')?.value).subscribe(content => {
      this.classes = content.classes;
      this.totalElements = content.totalElements;
    });
  }

}
