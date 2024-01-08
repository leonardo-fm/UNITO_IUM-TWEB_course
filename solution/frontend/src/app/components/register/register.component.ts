import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { UserDto } from '../../models/user.dto.model';
import { AuthenticationService } from '../../services/authentication.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  host: { class: 'container d-flex flex-column align-items-center h-100 w-100 overflow-auto py-4' },
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  loginForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    passwordConfirm: new FormControl('', Validators.required),
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
    if (this.password?.value != this.passwordConfirm?.value) {
      alert(this.languageService.selectedLanguage['register_confirm_invalid'])
      return;
    }

    let user: UserDto = this.loginForm.getRawValue();
    this.loaderService.show();
    this.authenticationService.register(user).then(res => {
      if (res) alert(this.languageService.selectedLanguage['register_error_duplicate']);
    }).catch(err => {
      alert(this.languageService.selectedLanguage['register_error']);
    }).finally(() => this.loaderService.hide());
  }

  get password() { return this.loginForm.get('password') }
  get passwordConfirm() { return this.loginForm.get('passwordConfirm') }
}
