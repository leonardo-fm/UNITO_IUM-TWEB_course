import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoaderService } from '../../../services/loader.service';
import moment from 'moment';
import { LanguageService } from '../../../services/language.service';
import { GameDto } from '../../../models/game.dto.model';
import { Subscription } from 'rxjs';
import { ClubService } from '../../../services/club.service';

@Component({
  selector: 'app-club-games',
  standalone: true,
  imports: [RouterLink],
  host: { class: 'd-flex flex-column' },
  templateUrl: './club-games.component.html',
  styleUrl: './club-games.component.css'
})
export class ClubGamesComponent implements OnInit, OnDestroy {
  clubId: number;
  games: GameDto[];
  groupedGames: GameDto[][];
  moment = moment;

  scrollSubscription: Subscription;

  constructor(
    public languageService: LanguageService,
    private activatedRoute: ActivatedRoute,
    private gameService: GameService,
    private clubService: ClubService,
    private router: Router,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.clubId = params['id'];
      this.loaderService.show();
      this.gameService.getClubGameHistory(this.clubId)
        .then(games => {
          this.games = games;
          this.groupedGames = this.gameService.groupConsequentCompetitionGame(games);
        })
        .catch(() => this.router.navigate(['/error']))
        .finally(() => this.loaderService.hide());
    });

    this.scrollSubscription = this.clubService.gameHistoryScroll.subscribe(() => {
      this.loaderService.show();
      this.gameService.getClubGameHistory(this.clubId, this.games.length)
        .then(games =>  {
          this.games = this.games.concat(games);
          this.groupedGames = this.gameService.groupConsequentCompetitionGame(this.games);
        })
        .catch(() => this.router.navigate(['/error']))
        .finally(() => this.loaderService.hide());
      console.log('Load more');
    });
  }

  winDrawLose(game: GameDto){
  let res;
    if (this.clubId == game.homeClubId)
      res = Number(game.homeClubScore) - Number(game.awayClubScore);
    else 
      res = Number(game.awayClubScore) - Number(game.homeClubScore)
    
    if (res > 0)
      return 'win';
    else if (res < 0)
      return 'lose';
    else return 'draw';
  }

  ngOnDestroy(): void {
      if (this.scrollSubscription) this.scrollSubscription.unsubscribe();
  }
}
