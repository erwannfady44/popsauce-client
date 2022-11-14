import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

import {WebSocketService} from "./websocket.service";
import {BehaviorSubject, connect, Observable} from "rxjs";
import {resolve} from "@angular/compiler-cli";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private status!: BehaviorSubject<number>;
  private players!: BehaviorSubject<Array<Object>>
  private image!:BehaviorSubject<string>
  private input !: BehaviorSubject<string>

  constructor(private ws: WebSocketService) {
    this.status = new BehaviorSubject<number>(-1);
    this.players = new BehaviorSubject<Array<Object>>([{}])
    this.image = new BehaviorSubject<string>('');
    this.input = new BehaviorSubject<string>('');
  }


  connect() {
    return new Promise(resolve => {
      resolve(this.ws.connect().subscribe({
        next: res => {
          this.dataReceived(JSON.parse(res.data))
        }, error: err => {
          console.log(err.data)
        }, complete() {
          console.log("complete")
        }
      }))
    })
  }

  sendPseudo(pseudo: string) {
    this.ws.send({pseudo: pseudo})
  }

  sendInput(input:string): void {
    this.ws.send({answer: input});
  }

  private dataReceived(data: any) {
    console.log(data);
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

  getStatus(): Observable<number> {
    return this.status.asObservable();
  }

  getImage(): Observable<string> {
    return this.image.asObservable();
  }

  getPlayers(): Observable<Array<Object>> {
    return this.players.asObservable();
  }

  getInput(): Observable<string> {
    return this.input.asObservable();
  }
}
