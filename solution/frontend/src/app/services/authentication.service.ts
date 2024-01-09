import { Injectable } from '@angular/core';
import { UserDto } from '../models/user.dto.model';
import { ReplaySubject } from 'rxjs';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loggedUserSubject = new ReplaySubject<UserDto>(1);

  constructor() { }

  login(user: UserDto){
    return axios.post<boolean>(environment.apiUrl + '/login', user).then(res => {
      if (res.data)
        this.loggedUserSubject.next(user);
      return res.data;
    });
  }

  register(user: UserDto){
    return axios.post<boolean>(environment.apiUrl + '/register', user).then(res => {
      return res.data;
    });
  }
}
