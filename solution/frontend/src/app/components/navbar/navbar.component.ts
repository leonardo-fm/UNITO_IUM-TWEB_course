import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import { Router, RouterLink } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgbDropdownModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  search = new FormControl('', { nonNullable: true, validators: [Validators.required] });

  constructor(
    private router: Router,
    public languageService: LanguageService
  ) { }

  onSearch() {
    if (this.search.valid)
      this.router.navigate(['/search'], { queryParams: { search: this.search.getRawValue() } });
  }

  onLanguageChange(language: string) {
    this.languageService.selectLanguage(language);
  }
}
