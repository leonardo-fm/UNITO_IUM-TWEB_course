import { Injectable } from '@angular/core';
import axios from 'axios';
import { GameHistoryModel, GameModel, GroupGameByCompetitionModel } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  getLastGames() {
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

}
