import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from '../../../services/game.service';
import { GameEventType, GameModel } from '../../../models/game.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-event',
  standalone: true,
  imports: [RouterLink],
  host: { class: 'w-100' },
  templateUrl: './game-event.component.html',
  styleUrl: './game-event.component.css'
})
export class GameEventComponent implements OnInit, OnDestroy {
  gameSubscription: Subscription;
  game: GameModel;
  GameEventType = GameEventType;

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.gameSubscription = this.gameService.gameSubject.subscribe(game => this.game = game);
  }

  ngOnDestroy(): void {
    if (this.gameSubscription) this.gameSubscription.unsubscribe();
  }
}