import { Injectable } from '@angular/core';
import axios from 'axios';
import { PlayerModel } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor() { }

  getPlayerById(playerId: number){
    return axios.get<PlayerModel[]>('assets/data/players.json').then(res => {
      return res.data.find(x => x.player_id == playerId) || new PlayerModel();
    })
  }
}
