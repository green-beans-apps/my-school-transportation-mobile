import { Component, OnInit, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { IAppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.page.html',
  styleUrls: ['./update-address.page.scss'],
})
export class UpdateAddressPage implements OnInit {
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
    houseNumber: [0, [Validators.required]],
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
        houseNumber: student?.address.houseNumber ?? 0,
        referencePoint: student?.address.referencePoint?? ""
      })
    })
  }


  return(): void {
    this.router.navigate(['/student-detail', this.studentId]);
  }

  submitForm() {
    
  }

}
