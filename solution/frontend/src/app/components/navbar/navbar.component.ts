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
      if (params['search'])
        this.search.patchValue(params['search']);
      else
        this.search.patchValue('');
    });

    this.search.valueChanges.subscribe(val => {
      if (val.length >= 3)
        this.onSearch();
      else if (val.length == 0)
        this.router.navigate(['']);
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
