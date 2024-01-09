import { Injectable } from '@angular/core';
import axios from 'axios';
import { SearchDto } from '../models/search.dto.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  siteSearch(search: string, take: number = 10) {
    return axios.get<SearchDto[]>(environment.apiUrl + '/siteSearch', { params: { src: search, take: take } }).then(res => {
      return res.data;
    });
  }
}
