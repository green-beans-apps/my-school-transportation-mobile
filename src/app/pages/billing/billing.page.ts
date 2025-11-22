import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConductorService } from 'src/app/services/conductor/conductor.service';
import { loginResponse } from 'src/app/services/conductor/response/loginResponse';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.state';
import { conductortActions } from 'src/app/store/conductorActions';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { maskitoTransform, MaskitoElementPredicate, MaskitoOptions } from '@maskito/core';
import { billingResumoResponse } from 'src/app/services/conductor/response/billingResumeResponse';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.page.html',
  styleUrls: ['./billing.page.scss'],
})
export class BillingPage implements OnInit {

  invalidCredentials = false

  private formBuilderService = inject(NonNullableFormBuilder)

  protected billingForm = this.formBuilderService.group({
    ano: ['', [Validators.required]],
    mes: ['', [Validators.required]]
  })

  constructor(private store: Store<{app: IAppState}>, private conductorService: ConductorService, private router: Router) { }

  ngOnInit() {
  }

  gerarResumo() {
    if(this.billingForm.invalid) return

    const loginRequest = {
      login: this.billingForm.value.ano?.replace(/[.-]/g, '') ?? "",
      password: this.billingForm.value.mes ?? ""
    }

    this.conductorService.login(loginRequest).subscribe(
      (result: billingResumoResponse) => {
        this.billingForm.reset()
      },
      (error: any) => {
        this.invalidCredentials = true;
        this.billingForm.reset()
      }
    );
  }

}
