import { Injectable } from '@angular/core';
import axios from 'axios';
import { ClubDto } from '../models/club.dto.model';
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
}
