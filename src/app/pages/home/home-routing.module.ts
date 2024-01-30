import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'students',
        children:[
          {
            path: '',
            loadChildren: () => import('../students/students.module').then(m => m.StudentsPageModule)
          }
        ]
      },
      {
        path: 'settings',
        children:[
          {
            path: '',
            loadChildren: () => import('../settings/settings-routing.module').then(m => m.SettingsPageRoutingModule)
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/students',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
