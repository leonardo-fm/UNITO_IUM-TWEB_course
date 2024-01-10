import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgxSpinnerModule],
  host: { class: 'main-container' },
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  title = 'frontend';
  theme: string;

  constructor(
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.theme = localStorage.getItem('theme') || 'light';
    this.utilsService.themeSubject.subscribe(theme => {
      console.log('Change theme', theme)
      this.theme = theme;
      localStorage.setItem('theme', theme);
    });
  }
}
