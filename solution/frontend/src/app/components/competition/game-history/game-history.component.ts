import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompetitionService } from '../../../services/competition.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  competitionId: string;
  season: number;
  moment = moment;

  seasonSubscription: Subscription;
  scrollSubscription: Subscription;

  constructor(
    public languageService: LanguageService,
    private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService,
    private gameService: GameService,
    private router: Router,
    private competitionService: CompetitionService  
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.competitionId = params['id'];
      if (this.seasonSubscription) this.seasonSubscription.unsubscribe();
      this.seasonSubscription = this.competitionService.competitionSeasonSubject.subscribe(season => {
        this.season = season;
        this.loaderService.show();
        this.gameService.getCompetitionGameHistory(this.competitionId, season)
          .then(games => this.games = games)
          .catch(() => this.router.navigate(['/error']))
          .finally(() => this.loaderService.hide());
      })
    });

    this.scrollSubscription = this.competitionService.gameHistoryScroll.subscribe(() => {
      this.loaderService.show();
        this.gameService.getCompetitionGameHistory(this.competitionId, this.season, this.games.length)
          .then(games => this.games = this.games.concat(games))
          .catch(() => this.router.navigate(['/error']))
          .finally(() => this.loaderService.hide());
      console.log('Load more');
    });
  }

  ngOnDestroy(): void {
    if (this.seasonSubscription) this.seasonSubscription.unsubscribe();
    if (this.scrollSubscription) this.scrollSubscription.unsubscribe();
  }
}
