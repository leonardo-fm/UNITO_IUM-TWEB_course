import { Injectable } from '@angular/core';
import axios from 'axios';
import { ReplaySubject } from 'rxjs';
import { CompetitionDto, CompetitionStatsDto } from '../models/competition.dto.model';
import { environment } from '../../environments/environment';
import { GameDto } from '../models/game.dto.model';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  public gameHistorySubject = new ReplaySubject<GameDto[]>(1);
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

  getAllCompetitions() {
    return axios.get<CompetitionDto[]>(environment.apiUrl + '/getAllCompetition').then(res => res.data);
  }

  getAllSeason(){
    return axios.get<number[]>('assets/data/seasons.json');
  }
}
