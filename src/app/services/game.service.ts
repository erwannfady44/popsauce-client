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
  private image!:BehaviorSubject<string>
  private input !: BehaviorSubject<string>

  constructor(private ws: WebSocketService) {
    this.status = new BehaviorSubject<number>(0)
    this.players = new BehaviorSubject<Array<Object>>([{}])
    this.image = new BehaviorSubject<string>('');
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
    if (data.url) {
      this.image.next(data.url);
    } else if (data.state === 'win') {
      this.input.next('');
    } else if (data instanceof Array) {
      let tab = this.players.getValue();
      for (const d of data) {
        tab.push({pseudo: d.pseudo, score: d.score})
      }
      this.players.next(tab);
    }
  }
}
