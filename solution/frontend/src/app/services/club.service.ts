import { Injectable } from '@angular/core';
import axios from 'axios';
import { AvgGoalsStatisticsDto, ClubDto, WinDrawLoseStatisticsDto } from '../models/club.dto.model';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  public gameHistoryScroll = new Subject();

  constructor() { }

  getClubById(clubId: number) {
    return axios.get<ClubDto>(environment.apiUrl + '/getClubById', { params: { clubId: clubId } }).then(res => {
      return res.data;
    });
  }

  getClubWinStatistics(clubId: number) {
    return axios.get<WinDrawLoseStatisticsDto[]>(environment.apiUrl + '/getClubWinStatistics', { params: { clubId: clubId } }).then(res => {
      return res.data;
    })
  }

  getClubGoalStatistics(clubId: number) {
    return axios.get<AvgGoalsStatisticsDto[]>(environment.apiUrl + '/getClubGoalStatistics', { params: { clubId: clubId } }).then(res => {
      return res.data;
    })
  }
}
