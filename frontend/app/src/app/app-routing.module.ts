import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'register',
    loadChildren: () =>
      import('./features/authentication/registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/authentication/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./features/main-page/main-page.module').then(
        (m) => m.MainPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
