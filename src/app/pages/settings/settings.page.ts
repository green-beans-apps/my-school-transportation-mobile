import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {  map } from 'rxjs';
import { IAppState} from 'src/app/store/app.state';
import { Router } from '@angular/router';
import { resetActions } from 'src/app/store/resetActions';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})

export class SettingsPage implements OnInit {

  conductor$ = this.store.select('app').pipe(
    map(e => e.conductor)
  )

  constructor(
    private store: Store<{ app: IAppState }>,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  exit() {
    localStorage.clear();
    this.store.dispatch(resetActions.reset());
    this.router.navigate(['/login']);
  }

}
