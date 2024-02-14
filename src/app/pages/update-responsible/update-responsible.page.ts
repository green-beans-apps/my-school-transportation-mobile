import { Component, OnInit, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaskitoElementPredicate, MaskitoOptions, maskitoTransform } from '@maskito/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { IAppState } from 'src/app/store/app.state';
import { studentActions } from 'src/app/store/studentActions';


@Component({
  selector: 'app-update-responsible',
  templateUrl: './update-responsible.page.html',
  styleUrls: ['./update-responsible.page.scss'],
})
export class UpdateResponsiblePage implements OnInit {

  protected popUpIsOpen = false;

  protected titlePopUp = "Deseja confirmar as alterações?"

  readonly maskPredicate: MaskitoElementPredicate = async (el) => (el as HTMLIonInputElement).getInputElement();

  readonly maskPhone: MaskitoOptions = {
    mask: ['(', /\d/,/\d/, ')' , ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  };

  student$ = this.store.select('app').pipe(
    map(e => e.students),
    map(students => students.find(student => student.id === this.studentId))
  );

  private studentId = ""

  private formBuilderService = inject(NonNullableFormBuilder)

  protected updateResponsibleForm = this.formBuilderService.group({
    name: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s']+$/u)]],
    email: ['', [Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
  })

  constructor(private activatedRouter: ActivatedRoute, private router: Router, private store: Store<{ app: IAppState }>,) { }

  ngOnInit() {
    this.studentId = this.activatedRouter.snapshot.paramMap.get('id') ?? '';
    this.student$.subscribe((student) => {
      this.updateResponsibleForm.setValue({
        name:student?.responsible.name ?? "",
        email:student?.responsible.email ?? "",
        phone: this.applyPhoneMask(student?.responsible.phone ?? "")
      })
    })
  }


  return(): void {
    this.router.navigate(['/student-detail', this.studentId]);
  }

  submitForm() {
    if(this.updateResponsibleForm.invalid) return

    this.store.dispatch(studentActions.updateResponsibleAction({
      name: this.updateResponsibleForm.value.name ?? "",
      email: this.updateResponsibleForm.value.email ?? "",
      phone: this.updateResponsibleForm.value.phone ?? "",
      studentId: this.studentId
    }))

    this.closeConfirmPopUp()
    this.return()
  }

  private applyPhoneMask(phone: string | undefined): string {
    if (!phone) {
      return "";
    }
    const maskedPhone = maskitoTransform( phone, this.maskPhone);
    return maskedPhone;
  }

  openConfirmPopUp() {
    this.popUpIsOpen = true
  }

  closeConfirmPopUp() {
    this.popUpIsOpen = false
  }
}
