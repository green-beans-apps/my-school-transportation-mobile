import { Component, OnInit, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { IAppState } from 'src/app/store/app.state';
import { conductortActions } from 'src/app/store/conductorActions';

@Component({
  selector: 'app-update-conductor',
  templateUrl: './update-conductor.page.html',
  styleUrls: ['./update-conductor.page.scss'],
})
export class UpdateConductorPage implements OnInit {

  protected popUpIsOpen = false;

  protected titlePopUp = "Deseja confirmar as alterações?"

  conductor$ = this.store.select('app').pipe(
    map(e => e.conductor)
  )

  private formBuilderService = inject(NonNullableFormBuilder)

  protected updateConductorForm = this.formBuilderService.group({
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s']+$/u)]],
    email: ['', [Validators.required, Validators.email]]
  })

  constructor(private activatedRouter: ActivatedRoute, private router: Router, private store: Store<{ app: IAppState }>,) { }

  ngOnInit() {
    this.store.dispatch(conductortActions.loadConductorAction())
    this.conductor$.subscribe((conductor) => {
      this.updateConductorForm.patchValue({
        name: conductor.name,
        email: conductor.email
      })
    })
  }


  return(): void {
    this.router.navigate(['/home/settings']);
  }

  submitForm() {
    if (this.updateConductorForm.invalid) return

    this.store.dispatch(conductortActions.updateConductorAction({
      name: this.updateConductorForm.value.name ?? "",
      email: this.updateConductorForm.value.email ?? "",
      id: localStorage.getItem("conductorId") ?? ""
    }))

    this.closeConfirmPopUp()
    this.return()
  }

  openConfirmPopUp() {
    this.popUpIsOpen = true
  }

  closeConfirmPopUp() {
    this.popUpIsOpen = false
  }
}
