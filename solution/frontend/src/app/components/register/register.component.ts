import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  host: { class: 'container d-flex flex-column align-items-center h-100 w-100 overflow-auto py-4' },
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordConfirm: new FormControl('', Validators.required),
  });

  constructor(
    public languageService: LanguageService
  ) { }

  ngOnInit(): void {

  }

  onSubmit(){
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    if (this.password?.value != this.passwordConfirm?.value){
      alert(this.languageService.selectedLanguage['register_confirm_invalid'])
      return;
    }
    console.log(this.loginForm.getRawValue());
  }

  get password(){ return this.loginForm.get('password') }
  get passwordConfirm(){ return this.loginForm.get('passwordConfirm') }
}
