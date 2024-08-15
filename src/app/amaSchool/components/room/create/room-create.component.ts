import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Room} from "../../../models/room";
import {RoomService} from "../../../service/room.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrl: './room-create.component.scss'
})
export class RoomCreateComponent {
  roomForm!: FormGroup;
  room !: Room;
  addRoom : String= "not added";
  constructor(private fb: FormBuilder,private roomService: RoomService, private router: Router) {
  }
  ngOnInit() {
    this.roomForm= this.fb.group({
      name: ['', Validators.required],
      capacity: ['', Validators.required],
    });
  }
  createRoom() {
    if (this.roomForm.valid) {
      const newRoom: Room = { ...this.roomForm.value };
      this.roomService.addRoom(newRoom).subscribe(
          (response) => {
            this.roomForm.reset();
            this.addRoom = "added";
            this.router.navigate(['rooms/list'], { queryParams: { addRoom: this.addRoom  } })
            setTimeout(() => {
              this.router.navigate([], { queryParams: { addRoom: null }, queryParamsHandling: 'merge' });
            }, 200);

          },
          (error) => {
            console.error('Error when adding the room :', error);
          }
      );
    }
  }
}
