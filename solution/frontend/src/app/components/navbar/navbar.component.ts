import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import { RouterLink } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgbDropdownModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(
    public languageService: LanguageService
  ) { }

  onSubmit(){}

  onLanguageChange(language: string){
    this.languageService.selectLanguage(language);
  }
}
