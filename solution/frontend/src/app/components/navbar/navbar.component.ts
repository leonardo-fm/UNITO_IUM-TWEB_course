import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgbDropdownModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  search = new FormControl('', { nonNullable: true, validators: [Validators.required] });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.search.patchValue('');
      if (params['search'])
        this.search.patchValue(params['search']);
    })
  }

  onSearch() {
    if (this.search.valid)
      this.router.navigate(['/search'], { queryParams: { search: this.search.getRawValue() } });
  }

  onLanguageChange(language: string) {
    this.languageService.selectLanguage(language);
  }
}
