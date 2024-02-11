import { Component, OnInit, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaskitoElementPredicate, MaskitoOptions } from '@maskito/core';
import { ConductorService } from 'src/app/services/conductor/conductor.service';
import { cpfValidator } from 'src/app/validators/cpfValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  readonly maskPredicate: MaskitoElementPredicate = async (el) => (el as HTMLIonInputElement).getInputElement();
  readonly maskCpf: MaskitoOptions = {
    mask: [/\d/,/\d/,/\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
  };

  private formBuilderService = inject(NonNullableFormBuilder)

  protected registerForm = this.formBuilderService.group({
    name: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s']+$/u)]],
    email: ['', [Validators.required, Validators.email]],
    cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/), cpfValidator]],
    password: ['', [Validators.required, Validators.minLength(7)]]
  })

  constructor(private conductorService: ConductorService, private router: Router) { }

  ngOnInit() {
    this.registerForm.reset()
  }

  register() {
    if(this.registerForm.invalid) return

    const registerConductorRequest = {
      name: this.registerForm.value.name ?? "",
      email: this.registerForm.value.email ?? "",
      cpf: this.registerForm.value.cpf ?? "",
      password: this.registerForm.value.password ?? ""
    }
    
    this.conductorService.register(registerConductorRequest).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.log(error)
      }
    );
  }

}
