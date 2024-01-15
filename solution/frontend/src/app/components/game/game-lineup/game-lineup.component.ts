import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { Subscription } from 'rxjs';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GameLineupModel, LineupPositionType } from '../../../models/game.dto.model';
import { SvgDirective } from '../../../directives/svg.directive';

@Component({
  selector: 'app-game-lineup',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, SvgDirective],
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
      this.startingHomeLineup = game.lineups.filter(x => x.type == 'starting_lineup' && x.club_id == game.homeClubId);
      this.startingHomeLineup = this.mapLineup(this.startingHomeLineup);
      this.startingAwayLineup = game.lineups.filter(x => x.type == 'starting_lineup' && x.club_id == game.awayClubId);
      this.startingAwayLineup = this.mapLineup(this.startingAwayLineup);
      this.substituteHomeLineup = game.lineups.filter(x => x.type == 'substitutes' && x.club_id == game.homeClubId);
      this.substituteAwayLineup = game.lineups.filter(x => x.type == 'substitutes' && x.club_id == game.awayClubId);
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
