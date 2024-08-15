import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Room} from "../models/room";
import {ClassRequest, ClassResponse} from "../models/class";


@Injectable({
  providedIn: 'root'
})
export class RoomService {
    private apiUrl = `${environment.apiBaseUrl}rooms`;
        constructor(private http: HttpClient) {
        }
    page : number = 0;
    size : number = 10;
    getAllRoom(page: number,size:number): Observable<any> {
            let params : any = new HttpParams();
            params = params.append('page', page.toString());
            params = params.append('size', size.toString());

            return this.http.get<any>(`${this.apiUrl}`,{params}).pipe(
                map(response => {
                    const rooms: Room[] = response.content;
                    const totalElements: number = response.totalElements;
                    const totalPages : number = response.totalPages;
                    return { rooms, totalElements,totalPages };
                })
            );
        }
        getRoomByCode(roomCode: string) {
            let params : any = new HttpParams();
            if( roomCode !== undefined && roomCode !== null && roomCode !== '') {
                params = params.append("roomCode",roomCode);
                console.log(params)
            }


            return this.http.get<any>(`${this.apiUrl}`,{params}).pipe(
                map(response => {
                    const rooms: Room[] = response.content;
                    const totalElements: number = response.totalElements;
                    console.log(response.content)
                    return { rooms, totalElements };
                })
            );
        }

        search(roomCode: string,name:string) {
                    let params : any = new HttpParams();
                    if( roomCode !== undefined && roomCode !== null && roomCode !== '') {
                        params = params.append("roomCode",roomCode);
                        console.log(params)
                    }
                    if( name !== undefined && name !== null && name !== '') {
                                    params = params.append("name",name);
                                    console.log(params)
                                }


                    return this.http.get<any>(`${this.apiUrl}`,{params}).pipe(
                        map(response => {
                            const rooms: Room[] = response.content;
                            const totalElements: number = response.totalElements;
                            console.log(response.content)
                            return { rooms, totalElements };
                        })
                    );
                }



        addRoom(room: Room): Observable<Room> {
            return this.http.post<Room>(this.apiUrl, room);

        }
        updateRoom(room: Room): Observable<Room> {
            return this.http.put<Room>(this.apiUrl, room);

        }
        deleteRoom(code:any) {
            return this.http.delete<void>(this.apiUrl+"?roomCode="+code);
        }
    }
