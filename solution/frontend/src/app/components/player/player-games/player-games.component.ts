import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoaderService } from '../../../services/loader.service';
import { GameService } from '../../../services/game.service';
import moment from 'moment';
import { LanguageService } from '../../../services/language.service';
import { GameDto } from '../../../models/game.dto.model';
import { Subscription } from 'rxjs';
import { PlayerService } from '../../../services/player.service';

@Component({
  selector: 'app-player-games',
  standalone: true,
  imports: [RouterLink],
  host: { class: 'd-flex flex-column' },
  templateUrl: './player-games.component.html',
  styleUrl: './player-games.component.css'
})
export class PlayerGamesComponent implements OnInit, OnDestroy {

  playerId: number;
  games: GameDto[];
  groupedGames: GameDto[][];
  moment = moment;

  scrollSubscription: Subscription;

  constructor(
    public languageService: LanguageService,
    private activatedRoute: ActivatedRoute,
    private gameService: GameService,
    private playerService: PlayerService,
    private router: Router,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.playerId = params['id'];
      this.loaderService.show();
      this.gameService.getPlayerGameHistory(this.playerId)
        .then(games => {
          this.games = games;
          this.groupedGames = this.gameService.groupConsequentCompetitionGame(games);
        })
        .catch(() => this.router.navigate(['/error']))
        .finally(() => this.loaderService.hide());
    });

    this.scrollSubscription = this.playerService.gameHistoryScroll.subscribe(() => {
      this.loaderService.show();
      this.gameService.getPlayerGameHistory(this.playerId, this.games.length)
        .then(games =>  {
          this.games = this.games.concat(games);
          this.groupedGames = this.gameService.groupConsequentCompetitionGame(this.games);
        })
        .catch(() => this.router.navigate(['/error']))
        .finally(() => this.loaderService.hide());
      console.log('Load more');
    });
  }

  ngOnDestroy(): void {
    if (this.scrollSubscription) this.scrollSubscription.unsubscribe();   
  }
}
