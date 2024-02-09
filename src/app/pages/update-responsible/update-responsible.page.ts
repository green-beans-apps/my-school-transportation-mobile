import { Component, OnInit, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { IAppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-update-responsible',
  templateUrl: './update-responsible.page.html',
  styleUrls: ['./update-responsible.page.scss'],
})
export class UpdateResponsiblePage implements OnInit {

  student$ = this.store.select('app').pipe(
    map(e => e.students),
    map(students => students.find(student => student.id === this.studentId))
  );

  private studentId = ""

  private formBuilderService = inject(NonNullableFormBuilder)

  protected updateResponsibleForm = this.formBuilderService.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.email, Validators.required]],
    phone: ['', [Validators.required]],
  })

  constructor(private activatedRouter: ActivatedRoute, private router: Router, private store: Store<{ app: IAppState }>,) { }

  ngOnInit() {
    this.studentId = this.activatedRouter.snapshot.paramMap.get('id') ?? '';
    this.student$.subscribe((student) => {
      this.updateResponsibleForm.setValue({
        name:student?.responsible.name ?? "",
        email:student?.responsible.email ?? "",
        phone:student?.responsible.phone ?? ""
      })
    })
  }


  return(): void {
    this.router.navigate(['/student-detail', this.studentId]);
  }

  submitForm() {
    
  }
}
