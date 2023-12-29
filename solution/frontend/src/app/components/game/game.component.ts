import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { GameModel } from '../../models/game.model';
import { GameLineupComponent } from './game-lineup/game-lineup.component';
import { GameEventComponent } from './game-event/game-event.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [GameLineupComponent, GameEventComponent],
  host: { class: 'container d-flex flex-column h-100 w-100 overflow-auto gap-3 py-4' },
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit{
  game: GameModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let gameId = params['id'];
      this.spinner.show();
      this.gameService.getGameById(gameId)
        .then(game => {
          console.log('Game', game);
          this.game = game;
        })
        .finally(() => this.spinner.hide());
    })    
  }
}