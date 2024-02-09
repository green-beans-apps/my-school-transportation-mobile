import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'student-detail/:id',
    loadChildren: () => import('./pages/student-detail/student-detail.module').then( m => m.StudentDetailPageModule)
  },
  {
    path: 'payment-detail/:id',
    loadChildren: () => import('./pages/payment-datail/payment-detail.module').then( m => m.PaymentDetailPageModule)
  },
  {
    path: 'register-student',
    loadChildren: () => import('./pages/register-student/register-student.module').then( m => m.RegisterStudentPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'update-responsible/:id',
    loadChildren: () => import('./pages/update-responsible/update-responsible.module').then( m => m.UpdateResponsiblePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'update-address/:id',
    loadChildren: () => import('./pages/update-address/update-address.module').then( m => m.UpdateAddressPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'update-student/:id',
    loadChildren: () => import('./pages/update-student/update-student.module').then( m => m.UpdateStudentPageModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
