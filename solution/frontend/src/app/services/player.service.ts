import { Injectable } from '@angular/core';
import axios from 'axios';
import { PlayerDto, PlayerDetailDto } from '../models/player.dto.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor() { }

  getPlayerById(playerId: number) {
    return axios.get<PlayerDetailDto>('getPlayerById', { params: { playerId: playerId } }).then(res => {
      return res.data;
    })
  }

  getPlayersByClubId(clubId: number) {
    return axios.get<PlayerDto[]>('getPlayersByClub', { params: { clubId: clubId } }).then(res => {
      return res.data;
    })
  }
}
