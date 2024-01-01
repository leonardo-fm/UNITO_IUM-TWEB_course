import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { GameService } from '../../../services/game.service';
import moment from 'moment';
import { RouterLink } from '@angular/router';
import { LoaderService } from '../../../services/loader.service';
import { GameDto } from '../../../models/game.dto.model';

@Component({
  selector: 'app-game-history',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './game-history.component.html',
  styleUrl: './game-history.component.css'
})
export class GameHistoryComponent implements OnInit {

  public gameHistory: GroupGameByDate[];
  public games: GameDto[];
  public moment = moment;

  constructor(
    private gameService: GameService,
    private loaderService: LoaderService,
    public languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.loaderService.show();
    this.gameService.getGameHistory()
      .then(res => {
        this.games = res;
        this.gameHistory = this.groupGameData(this.games);
      })
      .finally(() => this.loaderService.hide());
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