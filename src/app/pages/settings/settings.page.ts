import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {  map, of } from 'rxjs';
import { IAppState} from 'src/app/store/app.state';
import { Router } from '@angular/router';
import { resetActions } from 'src/app/store/resetActions';
import { ConductorService } from 'src/app/services/conductor/conductor.service';
import { conductortActions } from 'src/app/store/conductorActions';

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
    private conductorService: ConductorService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.store.dispatch(conductortActions.loadConductorAction())
  }

  exit() {
    localStorage.clear();
    this.store.dispatch(resetActions.reset());
    window.localStorage.clear()
    window.location.reload()
  }

  redirectUpdateConductor() {
    this.router.navigate(['/update-conductor'])
  }

}
