import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompetitionService } from '../../../services/competition.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GameModel } from '../../../models/game.model';
import moment from 'moment';
import { LanguageService } from '../../../services/language.service';
import { Subscription } from 'rxjs';
import { GameDto } from '../../../models/game.dto.model';
import { LoaderService } from '../../../services/loader.service';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-game-history',
  standalone: true,
  imports: [RouterLink],
  host: { class: 'w-100' },
  templateUrl: './game-history.component.html',
  styleUrl: './game-history.component.css'
})
export class GameHistoryComponent implements OnInit, OnDestroy {

  games: GameDto[];
  moment = moment;

  seasonSubscription: Subscription;

  constructor(
    public languageService: LanguageService,
    private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService,
    private gameService: GameService,
    private competitionService: CompetitionService  
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let competitionId = params['id'];
      if (this.seasonSubscription) this.seasonSubscription.unsubscribe();
      this.seasonSubscription = this.competitionService.competitionSeasonSubject.subscribe(season => {
        this.loaderService.show();
        this.gameService.getCompetitionGameHistory(competitionId, season)
          .then(games => this.games = games)
          .finally(() => this.loaderService.hide());
      })
    })
  }

  ngOnDestroy(): void {
    if (this.seasonSubscription) this.seasonSubscription.unsubscribe();
  }
}
