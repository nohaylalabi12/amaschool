import {ChangeDetectorRef, Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Room} from "../../../models/room";
import {ActivatedRoute, Router} from "@angular/router";
import {RoomService} from "../../../service/room.service";

@Component({
  selector: 'app-room-update',
  templateUrl: './room-update.component.html',
  styleUrl: './room-update.component.scss'
})
export class RoomUpdateComponent {
  roomCode: any;
  roomForm!: FormGroup;
  room : Room[]= [];
  roomUpdated : String= "not updated";
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private roomService: RoomService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.roomForm= this.fb.group({
      name: ['', Validators.required],
      capacity: ['', Validators.required],
      available: [true, Validators.required] ,
    });
    this.route.queryParams.subscribe(params => {
      this.roomCode = params['code'];
    });


    this.loadRoomDetails();
  }
  loadRoomDetails() {
    this.roomService.getRoomByCode(this.roomCode).subscribe(content => {
      this.roomForm = this.fb.group({
        roomCode: [content.rooms[0].roomCode, Validators.required],
        name: [content.rooms[0].name, Validators.required],
        capacity: [content.rooms[0].capacity, Validators.required],
        available: [content.rooms[0].available, Validators.required]
      });
      this.cdr.detectChanges();
    });

  }
  updateRoom() {
    if (this.roomForm.valid) {
      const updatedRoomData = {
        roomCode: this.roomForm.get('roomCode')?.value,
        name: this.roomForm.get('name')?.value,
        capacity: this.roomForm.get('capacity')?.value,
        available: this.roomForm.get('available')?.value
      };

      this.roomService.updateRoom(updatedRoomData).subscribe(
          () => {
            this.roomUpdated = "updated";
            this.router.navigate(['rooms/list'], { queryParams: { roomUpdated: this.roomUpdated  } })
            setTimeout(() => {
              this.router.navigate([], { queryParams: { roomUpdated: null }, queryParamsHandling: 'merge' });
            }, 200);
          },
          (error) => {
            console.error(`Error during room update with code ${this.roomCode}`, error);
          }
      );
    } else {
      this.roomForm.markAllAsTouched();
    }

  }
}
