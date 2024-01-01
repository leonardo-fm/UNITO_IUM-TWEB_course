import { Injectable } from '@angular/core';
import axios from 'axios';
import { GameEventModel, GameLineupModel, GameModel } from '../models/game.model';
import { ReplaySubject, Subject } from 'rxjs';
import { CompetitionModel } from '../models/competition.model';
import { GameDto } from '../models/game.dto.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public gameSubject = new ReplaySubject<GameModel>(1);
  public gameHistoryScroll = new Subject();

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

  getGameHistory(offset: number = 0, take: number = 25,) {
    return axios.get<GameDto[]>(environment.apiUrl + '/getGameHistory', { 
      params: {
        take: take,
        offset: offset
      }
    }).then(res => res.data);
  }

  getCompetitionGameHistory(competitionId: string, season: number, offset: number = 0, take: number = 25){
    return axios.get<GameDto[]>(environment.apiUrl + '/getCompetitionGameHistory', { 
      params: {
        competitionId: competitionId,
        season: season,
        take: take,
        offset: offset
      }
    }).then(res => res.data);
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

  getPlayerGameHistory(playerId: number) {
    return axios.get<GameModel[]>('assets/data/games.json').then(res => {
      return axios.get<GameLineupModel[]>('assets/data/game_lineups.json').then(res2 => {
        return axios.get<CompetitionModel[]>('assets/data/competition.json').then(res3 => {
          let gameIds = res2.data.filter(x => x.player_id == playerId).map(x => x.game_id);
          let games = res.data.filter(x => gameIds.includes(x.game_id));
          games.forEach(x => x.competition = res3.data.find(y => y.competition_id == x.competition_id) || new CompetitionModel());
          games.sort((x, y) => x.date >= y.date ? -1 : 1);
          return games;
        })
      })
    })
  }

  groupConsequentCompetitionGame(games: GameModel[]) {
    let grouped: GameModel[][] = [];
    let count = 0;
    let lastCompetition: string;
    games.forEach(game => {
      if (!lastCompetition || lastCompetition == game.competition_id) {
        (grouped[count] = grouped[count] || []).push(game);
      }
      else {
        count++;
        (grouped[count] = grouped[count] || []).push(game);
      }
      lastCompetition = game.competition_id;
    });
    return grouped;
  }

}
