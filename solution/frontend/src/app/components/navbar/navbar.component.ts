import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { UserDto } from '../../models/user.dto.model';
import { SvgDirective } from '../../directives/svg.directive';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgbDropdownModule, SvgDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {

  search = new FormControl('', { nonNullable: true, validators: [Validators.required] });
  loggedUser: UserDto;
  loggedUserSubscription: Subscription;
  themeMode: string = 'light';
  themeSvg: string = 'dark_mode';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private utilsService: UtilsService,
    public languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.loggedUserSubscription = this.authenticationService.loggedUserSubject.subscribe(user => {
      if (user)
        this.loggedUser = user;
    });

    this.activatedRoute.queryParams.subscribe(params => {
      if (params['search'])
        this.search.patchValue(params['search']);
      else
        this.search.patchValue('');
    });

    this.search.valueChanges.subscribe(val => {
      if (val.length >= 3)
        this.onSearch();
      else if (val.length == 0 && this.router.url.indexOf('/search') > -1)
        this.router.navigate(['']);
    });

    let theme = localStorage.getItem('theme');
    if (theme && theme == 'dark') {
      this.themeMode = 'dark';
      this.themeSvg = 'light_mode';
    }
  }

  onSearch() {
    if (this.search.valid)
      this.router.navigate(['/search'], { queryParams: { search: this.search.getRawValue() } });
  }

  onLanguageChange(language: string) {
    this.languageService.selectLanguage(language);
  }

  onThemeChange() {
    switch (this.themeMode) {
      case 'light':
        this.themeMode = 'dark';
        this.themeSvg = 'light_mode';
        break;
      case 'dark':
        this.themeMode = 'light';
        this.themeSvg = 'dark_mode';
        break;
    }
    this.utilsService.themeSubject.next(this.themeMode);
  }

  ngOnDestroy(): void {
    if (this.loggedUserSubscription) this.loggedUserSubscription.unsubscribe();
  }
}
