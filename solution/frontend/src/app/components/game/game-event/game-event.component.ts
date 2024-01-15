import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from '../../../services/game.service';
import { RouterLink } from '@angular/router';
import { GameDto, GameEventType, GameLineupModel } from '../../../models/game.dto.model';
import { SvgDirective } from '../../../directives/svg.directive';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-game-event',
  standalone: true,
  imports: [RouterLink, SvgDirective],
  host: { class: 'w-100' },
  templateUrl: './game-event.component.html',
  styleUrl: './game-event.component.css'
})
export class GameEventComponent implements OnInit, OnDestroy {
  gameSubscription: Subscription;
  game: GameDto;
  playerLineups: GameLineupModel[] | null[];
  GameEventType = GameEventType;

  constructor(
    private gameService: GameService,
    public languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.gameSubscription = this.gameService.gameSubject.subscribe(game => {
      this.game = game;
      this.mapLineup(this.game.lineups);
    });
  }

  // Map lineup for getting player information from player_id
  mapLineup(lineups: GameLineupModel[]) {
    this.playerLineups = [];
    lineups.forEach(x => {
      this.playerLineups[x.player_id] = x;
    });
  }

  ngOnDestroy(): void {
    if (this.gameSubscription) this.gameSubscription.unsubscribe();
  }
}
