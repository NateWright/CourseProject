import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error?: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if(form.invalid){
      return;
    }
    const email = form.value.email;
    const passowrd = form.value.password;
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if(this.isLoginMode){
      authObs = this.authService.login(email, passowrd);
    } else {
      authObs = this.authService.signup(email, passowrd);
    }

    authObs.subscribe({
      next: (value) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    });

    form.reset();
  }

  onCloseError(){
    this.error = null;
  }

}
