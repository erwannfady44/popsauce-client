import { Component, OnInit } from '@angular/core';
import {GameService} from "../services/game.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  status!: number;
  image!:string;

  constructor(private gameService: GameService,
              public dialog: MatDialog,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.gameService.getStatus().subscribe(status => {
      this.status = status;
    });

    this.gameService.getImage().subscribe(image => {
      this.image = image
    });
  }

  connect() {
    this.gameService.connect();
    const pseudoDialog = this.dialog.open(PseudoDialog);
    pseudoDialog.afterClosed().subscribe(async data => {
      if (data) {
        try {
          this.gameService.sendPseudo(data.value.pseudo)
          this.status = 1;
        } catch (e: any) {
          this.toastr.error(e.response.data.error, 'Erreur')
        }
      }
    })
  }

  onSubmit() {

  }
}

@Component({
  selector: 'app-home',
  templateUrl: './pseudo.dialog.html',
  styleUrls: ['./game.component.css']
})
export class PseudoDialog implements OnInit {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private pseudoDialog: MatDialogRef<PseudoDialog>) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      pseudo: [null, Validators.required]
    });
  }

  onCancel() {
    this.pseudoDialog.close();
  }
}
