import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateConductorPage } from './update-conductor.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateConductorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateConductorPageRoutingModule {}
