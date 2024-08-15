import { Component } from '@angular/core';
import {Room} from "../../../models/room";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Message, MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {RoomService} from "../../../service/room.service";

@Component({
  selector: 'app-room-list',
  providers: [MessageService],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss',
})
export class RoomListComponent {
  rooms : Room[]= [];
  searchForm !: FormGroup;
  // first : number =0;
  // rows : number = 10;
  totalElements : number = 0;
  display: boolean = false;
  addRoom !: string;
  roomUpdated !: string;
  msgs: Message[] = [];
  displayDialog: { [key: string]: boolean } = {};

  constructor(private route: ActivatedRoute,private roomService: RoomService,private messageService : MessageService,private fb: FormBuilder, private router: Router) {
    this.rooms.forEach(room => {
      this.displayDialog[room.roomCode] = false;
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.addRoom= params['addRoom'];
    });
    this.route.queryParams.subscribe(params => {
      this.roomUpdated= params['roomUpdated'];

    });
    if (this.addRoom === 'added') {
      this.showSuccessViaMessages('add')
    }
    if (this.roomUpdated === 'updated') {
      this.showSuccessViaMessages('update')
    }
    this.loadRooms(0,10);
    this.searchForm = this.fb.group({
      roomCode: [''],
      name: [''],

    });
  }
  showSuccessViaToast() {
      this.messageService.add({ key: 'tst2', severity: 'success', summary: 'Success', detail: 'Room successfully deleted' });


  }
  showErrorViaToast() {
    this.messageService.add({ key: 'tst3', severity: 'error', summary: 'Error', detail: 'Room not deleted' });
  }
  showSuccessViaMessages(action : string) {
    if (action === 'add'){
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Room successfully added' });
    }
    if (action === 'update'){
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Room successfully updated' });
    }



  }

  loadRooms(page : number , rows : number): void {
    this.roomService.getAllRoom(page,rows).subscribe(data => {
      this.rooms = data.rooms;
      this.totalElements = data.totalElements;
      console.log(this.totalElements)
      console.log(this.rooms);
    });
  }
  navigateToCreateRoom(){
    this.router.navigate(['rooms/create'])
  }
  navigateToUpdateRoom(roomCode: any){
    this.router.navigate(['rooms/update'], { queryParams: { code: roomCode} })
  }
  onPageChange(event: any): void {
    const page = event.page ;
    const size = event.rows;
    this.loadRooms(page, size);
  }
  deleteRoom(roomCode: any): void {
    this.displayDialog[roomCode] = false;
    this.roomService.deleteRoom(roomCode).subscribe(
        () => {
          const index = this.rooms.findIndex(room => room.roomCode === roomCode);
          if (index !== -1) {
            this.rooms.splice(index, 1);
            this.loadRooms(0,10);
            this.showSuccessViaToast();
          }
        },
        (error) => {
          console.error(`Error when deleting category with code ${roomCode}`, error);
        }
    );
  }

  search(): void {
    this.rooms = [];
    this.roomService.search(this.searchForm.get('roomCode')?.value,this.searchForm.get('name')?.value).subscribe(content => {
      this.rooms = content.rooms;
      this.totalElements = content.totalElements;
      // console.log(content.rooms)
    });
  }






}
