import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { CpfValidationService } from 'src/app/services/cpf-validation/cpf-validation.service';
import { ConductorService } from 'src/app/services/conductor/conductor.service';
import { loginResponse } from 'src/app/services/conductor/response/loginResponse';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.state';
import { setConductorAction } from 'src/app/store/conductorAdtions';
import { conductor } from 'src/app/entities/conductor';

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

  constructor(private store: Store<{app: IAppState}>, private conductorService: ConductorService, private router: Router) { }

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
      (result: loginResponse) => {
        window.localStorage.setItem('token', `Bearer ${result.token}`);
        window.localStorage.setItem('conductorId', result.conductor.id);
        this.formLogin = {
          login: '',
          password: ''
        }
        this.store.dispatch(setConductorAction({conductor: result.conductor}))
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