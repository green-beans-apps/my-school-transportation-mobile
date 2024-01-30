import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { CpfValidationService } from 'src/app/services/cpf-validation/cpf-validation.service';
import { ConductorService } from 'src/app/services/conductor/conductor.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin = {
    login: '',
    password: ''
  }

  requiredInput = false

  invalidCredentials = false

  constructor(private conductorService: ConductorService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.invalidCredentials = false;
    this.requiredInput = false;
    if (
      this.formLogin.login === '' ||
      this.formLogin.password === ''
    ) {
      this.requiredInput = true;
      return;
    }

    //remove os caracteres especiais do cpf
    this.formLogin.login = this.formLogin.login.replace(/[.-]/g, '')

    this.conductorService.login(this.formLogin).subscribe(
      (result: { token: string; conductorId: string }) => {
        window.localStorage.setItem('token', `Bearer ${result.token}`);
        window.localStorage.setItem('conductorId', result.conductorId);
        this.formLogin = {
          login: '',
          password: ''
        }
        this.router.navigate(['']);
      },
      (error: any) => {
        this.invalidCredentials = true;
        this.formLogin = {
          login: '',
          password: ''
        }
      }
    );
  }
}