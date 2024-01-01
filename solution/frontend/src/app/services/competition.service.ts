import { Injectable } from '@angular/core';
import axios from 'axios';
import { CompetitionModel } from '../models/competition.model';
import { GameModel } from '../models/game.model';
import { ReplaySubject } from 'rxjs';
import { CompetitionDto } from '../models/competition.dto.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  public gameHistorySubject = new ReplaySubject<GameModel[]>(1);

  constructor() { }

  getCompetitionById(id: string) {
    return axios.get<CompetitionModel[]>('assets/data/competition.json').then(res => {
      return res.data.find(x => x.competition_id == id);
    })
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
