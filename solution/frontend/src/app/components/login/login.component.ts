import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { AuthenticationService } from '../../services/authentication.service';
import { UserDto } from '../../models/user.dto.model';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  host: { class: 'container d-flex flex-column align-items-center h-100 w-100 overflow-auto py-4' },
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  constructor(
    private authenticationService: AuthenticationService,
    private loaderService: LoaderService,
    public languageService: LanguageService
  ) { }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    let user: UserDto = this.loginForm.getRawValue();
    this.loaderService.show();
    this.authenticationService.login(user).then(res => {
      if (!res) alert(this.languageService.selectedLanguage['login_error_not_valid']);
    }).catch(err => {
      alert(this.languageService.selectedLanguage['login_error'])
    }).finally(() => this.loaderService.hide());
  }
}
