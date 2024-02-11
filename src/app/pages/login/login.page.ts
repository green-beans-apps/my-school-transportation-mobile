import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { CpfValidationService } from 'src/app/services/cpf-validation/cpf-validation.service';
import { ConductorService } from 'src/app/services/conductor/conductor.service';
import { loginResponse } from 'src/app/services/conductor/response/loginResponse';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.state';
import { setConductorAction } from 'src/app/store/conductorAdtions';
import { conductor } from 'src/app/entities/conductor';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MaskitoElementPredicate, MaskitoOptions } from '@maskito/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  readonly maskPredicate: MaskitoElementPredicate = async (el) => (el as HTMLIonInputElement).getInputElement();
  readonly maskCpf: MaskitoOptions = {
    mask: [/\d/,/\d/,/\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
  };

  invalidCredentials = false

  private formBuilderService = inject(NonNullableFormBuilder)

  protected loginForm = this.formBuilderService.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  constructor(private store: Store<{app: IAppState}>, private conductorService: ConductorService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    if(this.loginForm.invalid) return

    const loginRequest = {
      login: this.loginForm.value.login?.replace(/[.-]/g, '') ?? "",
      password: this.loginForm.value.password ?? ""
    }

    this.conductorService.login(loginRequest).subscribe(
      (result: loginResponse) => {
        window.localStorage.setItem('token', `Bearer ${result.token}`);
        window.localStorage.setItem('conductorId', result.conductor.id);
        this.loginForm.reset()
        this.store.dispatch(setConductorAction({conductor: result.conductor}))
        this.router.navigate(['']);
      },
      (error: any) => {
        this.invalidCredentials = true;
        this.loginForm.reset()
      }
    );
  }
}