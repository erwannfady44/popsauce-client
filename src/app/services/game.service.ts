import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

import {WebSocketService} from "./websocket.service";
import {BehaviorSubject, connect, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private selectedColumn!: BehaviorSubject<number>;
  private status!: BehaviorSubject<number>;
  private winner!: BehaviorSubject<number>;
  private players!: BehaviorSubject<Array<Object>>

  constructor(private ws: WebSocketService) {
    this.status = new BehaviorSubject<number>(0)
    this.players = new BehaviorSubject<Array<Object>>([{}])
  }

  joinGame(pseudo: string):void {
    this.connect();
    this.ws.send(pseudo);
  }
  private connect() {
    return this.ws.connect().subscribe({
      next: res => {
        this.dataReceived(JSON.parse(res.data))
      }, error: err => {
        console.log(err.data)
      }, complete() {
        console.log("complete")
      }
    })
  }

  private dataReceived(data: any) {
  }
}
