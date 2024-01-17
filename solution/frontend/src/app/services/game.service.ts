import { Injectable } from '@angular/core';
import axios from 'axios';
import { ReplaySubject, Subject } from 'rxjs';
import { GameDto, GameEventModel, GameLineupModel } from '../models/game.dto.model';
import { environment } from '../../environments/environment';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public gameSubject = new ReplaySubject<GameDto>(1);
  public gameHistoryScroll = new Subject();

  constructor() { }

  getGameById(gameId: number) {
    return axios.get<GameDto>(environment.apiUrl + '/getGameById', { params: { gameId: gameId } }).then(res => {
      return res.data;
    });
  }

  getGameDetails(gameId: number) {
    return axios.get<{ events: GameEventModel[], lineups: GameLineupModel[] }>(environment.apiUrl + '/getGameDetail', { params: { gameId: gameId } }).then(res => {
      return res.data;
    })
  }

  getGameHistory(date: Date, offset: number = 0, take: number = 25) {
    return axios.get<GameDto[]>(environment.apiUrl + '/getGameHistory', {
      params: {
        take: take,
        offset: offset,
        date: moment(date).format('DD-MM-yyyy')
      }
    }).then(res => res.data);
  }

  getCompetitionGameHistory(competitionId: string, season: number, offset: number = 0, take: number = 25) {
    return axios.get<GameDto[]>(environment.apiUrl + '/getCompetitionGameHistory', {
      params: {
        competitionId: competitionId,
        season: season,
        take: take,
        offset: offset
      }
    }).then(res => res.data);
  }

  getClubGameHistory(clubId: number, offset: number = 0, season: number = 2023, take: number = 25) {
    return axios.get<GameDto[]>(environment.apiUrl + '/getClubGameHistory', {
      params: {
        clubId: clubId,
        season: season,
        take: take,
        offset: offset
      }
    }).then(res => res.data);
  }

  getPlayerGameHistory(playerId: number, offset: number = 0, take: number = 25) {
    return axios.get<GameDto[]>(environment.apiUrl + '/getPlayerGameHistory', {
      params: {
        playerId: playerId,
        take: take,
        offset: offset
      }
    }).then(res => {
      res.data.sort((x, y) => x.date >= y.date ? -1 : 1);
      return res.data;
    })
    // return axios.get<GameModel[]>('assets/data/games.json').then(res => {
    //   return axios.get<GameLineupModel[]>('assets/data/game_lineups.json').then(res2 => {
    //     return axios.get<CompetitionModel[]>('assets/data/competition.json').then(res3 => {
    //       let gameIds = res2.data.filter(x => x.player_id == playerId).map(x => x.game_id);
    //       let games = res.data.filter(x => gameIds.includes(x.game_id));
    //       games.forEach(x => x.competition = res3.data.find(y => y.competition_id == x.competition_id) || new CompetitionModel());
    //       games.sort((x, y) => x.date >= y.date ? -1 : 1);
    //       return games;
    //     })
    //   })
    // })
  }

  groupConsequentCompetitionGame(games: GameDto[]) {
    let grouped: GameDto[][] = [];
    let count = 0;
    let lastCompetition: string;
    games.forEach(game => {
      if (!lastCompetition || lastCompetition == game.competitionId) {
        (grouped[count] = grouped[count] || []).push(game);
      }
      else {
        count++;
        (grouped[count] = grouped[count] || []).push(game);
      }
      lastCompetition = game.competitionId;
    });
    return grouped;
  }

}
