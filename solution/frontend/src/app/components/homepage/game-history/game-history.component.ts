import { Component, OnDestroy, OnInit } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { GameService } from '../../../services/game.service';
import moment from 'moment';
import { Router, RouterLink } from '@angular/router';
import { LoaderService } from '../../../services/loader.service';
import { GameDto } from '../../../models/game.dto.model';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { DateInputComponent } from '../../shared/date-input/date-input.component';
import { SvgDirective } from '../../../directives/svg.directive';

@Component({
  selector: 'app-game-history',
  standalone: true,
  imports: [RouterLink, DateInputComponent, SvgDirective],
  host: { class: 'd-flex flex-column' },
  templateUrl: './game-history.component.html',
  styleUrl: './game-history.component.css'
})
export class GameHistoryComponent implements OnInit, OnDestroy {

  scrollSubscription: Subscription;

  gameHistory: GroupGameByDate[];
  games: GameDto[];
  moment = moment;

  dateInput = new FormControl(new Date(), { nonNullable: true });

  constructor(
    private gameService: GameService,
    private loaderService: LoaderService,
    private router: Router,
    public languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.searchGames(this.dateInput.value);

    this.dateInput.valueChanges.subscribe(date => {
      this.searchGames(date);
    })

    this.scrollSubscription = this.gameService.gameHistoryScroll.subscribe(() => {
      this.loadMore();
    });
  }

  loadMore(){
    this.loaderService.show();
    this.gameService.getGameHistory(this.dateInput.value, this.games?.length)
      .then(games => {
        this.games = this.games.concat(games);
        this.gameHistory = this.groupGameData(this.games);
      })
      .catch(() => this.router.navigate(['/error']))
      .finally(() => this.loaderService.hide());
    console.log('Load more');
  }

  searchGames(date: Date, offset?: number, take?: number) {
    this.loaderService.show();
    this.gameService.getGameHistory(date, offset, take)
      .then(games => {
        this.games = games;
        this.gameHistory = this.groupGameData(this.games);
      })
      .catch(() => this.router.navigate(['/error']))
      .finally(() => this.loaderService.hide());
  }

  onDateFromChange(date: Date) {
    this.dateInput.patchValue(date);
  }

  ngOnDestroy(): void {
    if (this.scrollSubscription) this.scrollSubscription.unsubscribe();
  }

  groupGameData(games: GameDto[]) {
    let groupByDate: any = {};
    games.forEach(game => (groupByDate[game.date] = groupByDate[game.date] || []).push(game));

    let historyGame: GroupGameByDate[] = [];
    for (let [key, historyGames] of Object.entries(groupByDate)) {
      let groupByLeagues: any = {};
      (<GameDto[]>historyGames).forEach(game => (groupByLeagues[game.competitionId] = groupByLeagues[game.competitionId] || []).push(game));

      let competitionGames: GroupGameByCompetition[] = [];
      for (let [competitionId, games] of Object.entries(groupByLeagues))
        competitionGames.push({
          competitionId: competitionId,
          games: <GameDto[]>games
        });
      historyGame.push({ date: key, competitions: competitionGames });
    }

    historyGame.sort((x, y) => x.date >= y.date ? -1 : 1);
    return historyGame;
  }
}

class GroupGameByCompetition {
  competitionId: string;
  games: GameDto[];
}

class GroupGameByDate {
  date: string;
  competitions: GroupGameByCompetition[]
}