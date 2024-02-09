import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateResponsiblePage } from './update-responsible.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateResponsiblePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateResponsiblePageRoutingModule {}
