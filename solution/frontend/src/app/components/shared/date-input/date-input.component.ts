import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import moment from 'moment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-date-input',
  standalone: true,
  imports: [],
  templateUrl: './date-input.component.html',
  styleUrl: './date-input.component.css'
})
export class DateInputComponent implements OnInit, OnDestroy {
  @Input() dateInput: Date;
  @Output() dateChange = new EventEmitter<Date>();
  dateText: string = "";
  languageSubscription: Subscription;

  constructor(
    private languageService: LanguageService
  ){}

  ngOnInit(): void {
    this.languageSubscription = this.languageService.languageSubject.subscribe(lng => {
      this.ngOnChanges();
    })
  }

  onDateChange(target: any){
    let date = new Date(target.value);
    this.dateText = moment(date).format(this.languageService.selectedLanguage['date_format']);
    this.dateChange.emit(date);
  }

  ngOnChanges() {
    this.dateText = moment(this.dateInput).format(this.languageService.selectedLanguage['date_format']);
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) this.languageSubscription.unsubscribe();
  }
}
