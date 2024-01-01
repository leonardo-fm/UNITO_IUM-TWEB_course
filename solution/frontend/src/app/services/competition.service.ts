import { Injectable } from '@angular/core';
import axios from 'axios';
import { CompetitionModel } from '../models/competition.model';
import { GameModel } from '../models/game.model';
import { ReplaySubject } from 'rxjs';
import { CompetitionDto, CompetitionStatsDto } from '../models/competition.dto.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  public gameHistorySubject = new ReplaySubject<GameModel[]>(1);
  public competitionSeasonSubject = new ReplaySubject<number>(1);

  constructor() { }

  getCompetitionById(id: string) {
    return axios.get<CompetitionDto>(environment.apiUrl + '/getCompetitionById', {
      params: { competitionId: id}
    }).then(res => res.data);
  }

  getCompetitionStats(competitionId: string, season: number){
    return axios.get<CompetitionStatsDto[]>(environment.apiUrl + '/getCompetitionStats', {
      params: {
        competitionId: competitionId,
        season: season
      }
    }).then(res => {
      res.data.forEach(x => x.points = x.wins * 3 + x.draws);
      res.data.sort((x, y) => y.points - x.points);
      return res.data;
    });
  }

  getGameHistoryByCompetition(competitionId: string, season: number | null = null){
    return axios.get<GameModel[]>('assets/data/games.json').then(res => {
      let history = res.data.filter(x => x.competition_id == competitionId && (season ? x.season == season : true));
      history.sort((x, y) => x.date >= y.date ? -1 : 1);
      
      console.log(history);
      this.gameHistorySubject.next(history);
      return history.slice(0, 20);
    })
  }

  getAllCompetitions() {
    return axios.get<CompetitionDto[]>(environment.apiUrl + '/getAllCompetition').then(res => res.data);
  }

  getAllSeason(){
    return axios.get<number[]>('assets/data/seasons.json');
  }
}
