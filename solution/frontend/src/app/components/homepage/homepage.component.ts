import { Component } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  host: { class: 'container d-flex flex-row h-100 w-100 py-4' },
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  constructor(
    public languageService: LanguageService
  ) { }
}
