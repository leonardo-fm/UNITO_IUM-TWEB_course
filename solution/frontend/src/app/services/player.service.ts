import { Injectable } from '@angular/core';
import axios from 'axios';
import { PlayerDto, PlayerDetailDto } from '../models/player.dto.model';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  
  public gameHistoryScroll = new Subject();

  constructor() { }

  getPlayerById(playerId: number) {
    return axios.get<PlayerDetailDto>(environment.apiUrl + '/getPlayerById', { params: { playerId: playerId } }).then(res => {
      return res.data;
    })
  }

  getPlayersByClubId(clubId: number) {
    return axios.get<PlayerDto[]>(environment.apiUrl + '/getPlayersByClub', { params: { clubId: clubId } }).then(res => {
      return res.data;
    })
  }
}
