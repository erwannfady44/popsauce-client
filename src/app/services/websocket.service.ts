import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private ws!: WebSocket
  constructor() { }

  connect(): Observable<any> {
    this.ws = new WebSocket(`${environment.WS}`);
    return new Observable<any>(observer => {
      this.ws.onmessage = observer.next.bind((observer))
      this.ws.onerror = observer.error.bind(observer)
      this.ws.onclose = observer.complete.bind(observer)
      return this.ws.close.bind(this.ws);
    })
  }

  async send(data:any) {
    this.ws.send(JSON.stringify(data));
  }

  async close() {
    console.log("close");
    this.ws.close();
  }
}
