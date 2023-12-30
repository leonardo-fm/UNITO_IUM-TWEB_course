import { Injectable } from '@angular/core';
import axios from 'axios';
import { GameEventModel, GameHistoryModel, GameLineupModel, GameModel, GroupGameByCompetitionModel } from '../models/game.model';
import { ReplaySubject } from 'rxjs';
import { CompetitionModel } from '../models/competition.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public gameSubject = new ReplaySubject<GameModel>(1);

  constructor() { }

  getGameById(id: number) {
    return axios.get<GameModel[]>('assets/data/games.json').then(res => {
      return axios.get<GameLineupModel[]>('assets/data/game_lineups.json').then(res2 => {
        return axios.get<GameEventModel[]>('assets/data/game_events.json').then(res3 => {
          let game: GameModel = res.data.find(x => x.game_id == id) || new GameModel()
          game.lineups = res2.data.filter(x => x.game_id == id);
          game.events = res3.data.filter(x => x.game_id == id);
          game.events.sort((x, y) => y.minute - x.minute);
          this.gameSubject.next(game);
          return game;
        })
      });
    });
  }

  getGameHistory() {
    return axios.get<GameModel[]>('assets/data/games.json').then(res => {
      let groupByDate: any = {};
      res.data.forEach(game => (groupByDate[game.date] = groupByDate[game.date] || []).push(game));

      let historyGame: GameHistoryModel[] = [];
      for (let [key, historyGames] of Object.entries(groupByDate)) {
        let groupByLeagues: any = {};
        (<GameModel[]>historyGames).forEach(game => (groupByLeagues[game.competition_id] = groupByLeagues[game.competition_id] || []).push(game));

        let competitionGames: GroupGameByCompetitionModel[] = [];
        for (let [competition_id, competition_games] of Object.entries(groupByLeagues))
          competitionGames.push({
            competition_id: competition_id,
            competition: (<GameModel[]>competition_games)[0]?.competition,
            games: <GameModel[]>competition_games
          });
        historyGame.push({ date: key, competitions: competitionGames });
      }

      historyGame.sort((x, y) => x.date >= y.date ? -1 : 1);
      // TO REMOVE: Get last 7 days
      return historyGame.slice(0, 7);
    });
  }

  getClubGameHistory(club_id: number) {
    return axios.get<GameModel[]>('assets/data/games.json').then(res => {
      return axios.get<CompetitionModel[]>('assets/data/competition.json').then(res2 => {
        let games = res.data.filter(x => x.home_club_id == club_id || x.away_club_id == club_id);
        games.forEach(x => x.competition = res2.data.find(y => y.competition_id == x.competition_id) || new CompetitionModel());
        games.sort((x, y) => x.date >= y.date ? -1 : 1);
        return games;
      })
    })
  }

}
