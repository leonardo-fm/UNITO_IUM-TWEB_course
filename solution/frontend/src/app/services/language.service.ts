import { Injectable } from '@angular/core';
import axios from 'axios';
import moment from 'moment';
import 'moment/min/locales';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  public selectedLanguage: any = {};
  public activeLanguage: string;
  public languageSubject = new Subject<string>();

  constructor() { }

  selectLanguage(language: string) {
    return axios.get(`assets/languages/${language}.json`).then(res => {
      this.selectedLanguage = res.data;
      this.activeLanguage = language;
      localStorage.setItem('language', language);
      moment.locale(this.selectedLanguage['date_lan']);
      this.languageSubject.next(language);
      console.info(`Loaded language: ${this.activeLanguage}`);
    })
  }
}
