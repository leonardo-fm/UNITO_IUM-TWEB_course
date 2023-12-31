import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { Subscription } from 'rxjs';
import { GameLineupModel, LineupPositionType } from '../../../models/game.model';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-lineup',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink],
  host: { class: 'd-flex justify-content-between' },
  templateUrl: './game-lineup.component.html',
  styleUrl: './game-lineup.component.css'
})
export class GameLineupComponent implements OnInit, OnDestroy {
  gameSubscription: Subscription;
  startingHomeLineup: any;
  startingAwayLineup: any;
  substituteHomeLineup: GameLineupModel[];
  substituteAwayLineup: GameLineupModel[];
  LineupPositionType = LineupPositionType;

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.gameSubscription = this.gameService.gameSubject.subscribe(game => {
      this.startingHomeLineup = game.lineups.filter(x => x.type == 'starting_lineup' && x.club_id == game.home_club_id);
      this.startingHomeLineup = this.mapLineup(this.startingHomeLineup);
      this.startingAwayLineup = game.lineups.filter(x => x.type == 'starting_lineup' && x.club_id == game.away_club_id);
      this.startingAwayLineup = this.mapLineup(this.startingAwayLineup);
      this.substituteHomeLineup = game.lineups.filter(x => x.type == 'substitutes' && x.club_id == game.home_club_id);
      this.substituteAwayLineup = game.lineups.filter(x => x.type == 'substitutes' && x.club_id == game.away_club_id);
    })
  }

  mapLineup(lineups: GameLineupModel[]) {
    let mapped: any = {};
    lineups.forEach(x => {
      (mapped[x.position] = mapped[x.position] || []).push(x);
    });
    return mapped;
  }

  ngOnDestroy(): void {
    if (this.gameSubscription) this.gameSubscription.unsubscribe();
  }
}
