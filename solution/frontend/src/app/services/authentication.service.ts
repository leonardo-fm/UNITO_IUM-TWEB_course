import { Injectable } from '@angular/core';
import { UserDto } from '../models/user.dto.model';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loggedUserSubject = new BehaviorSubject<UserDto | null>(null);

  constructor() { }

  login(user: UserDto) {
    return axios.post<UserDto>(environment.apiUrl + '/login', user).then(res => {
      if (res.data)
        this.loggedUserSubject.next(res.data);
      return res.data;
    });
  }

  register(user: UserDto) {
    return axios.post<boolean>(environment.apiUrl + '/register', user).then(res => {
      return res.data;
    });
  }

  logout() {
    this.loggedUserSubject.next(null);
  }
}
