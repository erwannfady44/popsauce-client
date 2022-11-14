import {Component, Input, OnInit} from '@angular/core';
import {GameService} from "../services/game.service";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  input!:string;
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getInput().subscribe(input => {
      this.input = input;
    })
  }

  onSubmit() {
    this.gameService.sendInput(this.input);
  }

}
