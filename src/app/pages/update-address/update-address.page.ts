import { Component, OnInit, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { IAppState } from 'src/app/store/app.state';
import { studentActions } from 'src/app/store/studentActions';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.page.html',
  styleUrls: ['./update-address.page.scss'],
})
export class UpdateAddressPage implements OnInit {

  protected popUpIsOpen = false;

  protected titlePopUp = "Deseja confirmar as alterações?"

  student$ = this.store.select('app').pipe(
    map(e => e.students),
    map(students => students.find(student => student.id === this.studentId))
  );

  private studentId = ""

  private formBuilderService = inject(NonNullableFormBuilder)

  protected updateAddressForm = this.formBuilderService.group({
    city: ['', [Validators.required]],
    district: ['', [Validators.required]],
    street: ['', [Validators.required]],
    houseNumber: ['', [Validators.required]],
    referencePoint: ['', [Validators.required]]
  })

  constructor(private activatedRouter: ActivatedRoute, private router: Router, private store: Store<{ app: IAppState }>,) { }

  ngOnInit() {
    this.studentId = this.activatedRouter.snapshot.paramMap.get('id') ?? '';
    this.student$.subscribe((student) => {
      this.updateAddressForm.setValue({
        city: student?.address.city ?? "",
        district: student?.address.district ?? "",
        street: student?.address.street ?? "",
        houseNumber: student?.address.houseNumber ?? "",
        referencePoint: student?.address.referencePoint ?? ""
      })
    })
  }


  return(): void {
    this.router.navigate(['/student-detail', this.studentId]);
  }

  submitForm() {
    if (this.updateAddressForm.invalid) return

    this.store.dispatch(studentActions.updateAddressAction({
      city: this.updateAddressForm.value.city ?? "",
      district: this.updateAddressForm.value.district ?? "",
      street: this.updateAddressForm.value.street ?? "",
      houseNumber: this.updateAddressForm.value.houseNumber ?? "",
      referencePoint: this.updateAddressForm.value.referencePoint ?? "",
      studentId: this.studentId
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
