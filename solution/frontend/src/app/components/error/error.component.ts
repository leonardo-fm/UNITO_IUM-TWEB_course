import { Component } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  host: { class: 'container d-flex flex-column h-100 w-100 overflow-auto py-4' },
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  constructor(
    public languageService: LanguageService
  ) {}
}
