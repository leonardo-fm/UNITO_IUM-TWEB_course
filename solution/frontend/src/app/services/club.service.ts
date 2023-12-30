import { Injectable } from '@angular/core';
import axios from 'axios';
import { ClubModel } from '../models/club.model';
import { CompetitionModel } from '../models/competition.model';
import { PlayerModel } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor() { }

  getClubById(clubId: number){
    return axios.get<ClubModel[]>('assets/data/clubs.json').then(res => {
      return axios.get<CompetitionModel[]>('assets/data/competition.json').then(res2 => {
        let club = res.data.find(x => x.club_id == clubId) || new ClubModel();
        club.competition = res2.data.find(x => x.competition_id == club.domestic_competition_id) || new CompetitionModel();
        return club;
      })
    });
  }

  getPlayersByClubId(clubId: number){
    return axios.get<PlayerModel[]>('assets/data/players.json').then(res => {
      return res.data.filter(x => x.current_club_id == clubId);
    })
  }
}
