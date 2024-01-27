import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConductorService } from 'src/app/services/conductor/conductor.service';
import { CpfValidationService } from 'src/app/services/cpf-validation/cpf-validation.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formRegister = {
    name: '',
    email: '',
    cpf: '',
    password: ''
  }

  invalidEmailSpanError = false;
  requiredInputsError = false;
  invalidPasswordSpanError = false;
  invalidCPFSpanError = false;

  constructor(private conductorService: ConductorService, private router: Router, private validateCpf: CpfValidationService) { }

  ngOnInit() {
  }

  resetForm() {
    this.formRegister = {
      name: '',
      email: '',
      cpf: '',
      password: ''
    }
  }

  register() {
    // validacoes
    this.invalidEmailSpanError = false;
    this.requiredInputsError = false;
    this.invalidPasswordSpanError = false;
    this.invalidCPFSpanError = false;
    if (
      this.formRegister.name === '' ||
      this.formRegister.email === '' ||
      this.formRegister.password === '' ||
      this.formRegister.cpf === ''
    ) {
      this.requiredInputsError = true;
      return;
    }
    if (!this.validateCpf.execute(this.formRegister.cpf)) {
      this.invalidCPFSpanError = true;
      return;
    }
    const expressionEmail: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const resultRegexEmail: boolean = expressionEmail.test(this.formRegister.email);
    if(!resultRegexEmail) {
      this.invalidEmailSpanError = true;
      return
    }
    if(this.formRegister.password.length < 6) {
      this.invalidPasswordSpanError = true
      return
    }

    // submissao
    
    this.conductorService.register(this.formRegister).subscribe(
      () => {
        this.router.navigate(['/login']);
        this.resetForm()
      },
      (error: any) => {
        this.resetForm()
        console.log(error)
      }
    );
  }

}
