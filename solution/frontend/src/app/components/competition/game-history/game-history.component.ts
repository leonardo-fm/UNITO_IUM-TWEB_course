import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompetitionService } from '../../../services/competition.service';
import { ActivatedRoute } from '@angular/router';
import { GameModel } from '../../../models/game.model';
import moment from 'moment';
import { LanguageService } from '../../../services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-history',
  standalone: true,
  imports: [],
  host: { class: 'w-100' },
  templateUrl: './game-history.component.html',
  styleUrl: './game-history.component.css'
})
export class GameHistoryComponent implements OnInit, OnDestroy {

  gameHistory: GameModel[];
  moment = moment;

  seasonSubscription: Subscription;

  constructor(
    public languageService: LanguageService,
    private competitionService: CompetitionService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let comp_id = params['id'];
      this.seasonSubscription = this.competitionService.seasonSubject.subscribe(season => {
        this.competitionService.getGameHistoryByCompetition(comp_id, season).then(x => this.gameHistory = x);
      })
    })
  }

  ngOnDestroy(): void {
    if (this.seasonSubscription) this.seasonSubscription.unsubscribe();
  }
}
