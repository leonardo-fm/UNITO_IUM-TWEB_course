import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UtilsService } from '../../services/utils.service';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { UserDto } from '../../models/user.dto.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgbDropdownModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {

  search = new FormControl('', { nonNullable: true, validators: [Validators.required] });
  loggedUser: UserDto;
  loggedUserSubscription: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
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

  ngOnDestroy(): void {
      if (this.loggedUserSubscription) this.loggedUserSubscription.unsubscribe();
  }
}
