import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { note } from 'src/app/entities/note';
import { IAppState } from 'src/app/store/app.state';
import { studentActions } from 'src/app/store/studentActions';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private store: Store<{app: IAppState}>) {}


  ngOnInit() {
   this.store.dispatch(studentActions.loadStudentsAction())
  }


  logOut() {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('conductorId')
    window.location.reload()
  }
}
