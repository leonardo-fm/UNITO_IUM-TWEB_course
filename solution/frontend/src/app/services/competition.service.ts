import { Injectable } from '@angular/core';
import axios from 'axios';
import { CompetitionModel } from '../models/competition.model';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  constructor() { }

  getAllCompetitions() {
    return axios.get<CompetitionModel[]>('assets/data/competition.json');
  }
}
