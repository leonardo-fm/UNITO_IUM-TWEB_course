import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GameService } from '../../services/game.service';
import { GameLineupComponent } from './game-lineup/game-lineup.component';
import { GameEventComponent } from './game-event/game-event.component';
import { LoaderService } from '../../services/loader.service';
import { GameDto } from '../../models/game.dto.model';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [GameLineupComponent, GameEventComponent, RouterLink],
  host: { class: 'container d-flex flex-column h-100 w-100 overflow-auto gap-3 py-4' },
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit{
  game: GameDto;

  constructor(
    private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService,
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let gameId = params['id'];
      this.loaderService.show();
      this.gameService.getGameById(gameId)
        .then(game => {
          console.log('Game', game);
          this.game = game;
          this.gameService.getGameDetails(gameId).then(res => {
            this.game.events = res.events;
            this.game.lineups = res.lineups;
            this.gameService.gameSubject.next(this.game);
          })
        })
        .finally(() => this.loaderService.hide());
    })    
  }
}