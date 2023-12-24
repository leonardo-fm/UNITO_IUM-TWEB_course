import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  constructor() { }

  getAllCompetitions() {
    return axios.get('assets/data/competition.json');
  }
}
