import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(
    public languageService: LanguageService
  ) { }
  onSubmit() { }
}
