import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {GameComponent, PseudoDialog} from './game/game.component';
import { HeaderComponent } from './header/header.component';
import {RouterModule, RouterOutlet} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import { ServerDataComponent } from './server-data/server-data.component';
import { ScoresComponent } from './scores/scores.component';
import { InputComponent } from './input/input.component';
import {ToastrModule} from "ngx-toastr";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    HeaderComponent,
    ServerDataComponent,
    ScoresComponent,
    InputComponent,
    PseudoDialog,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3500,
      tapToDismiss: true
    }),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
