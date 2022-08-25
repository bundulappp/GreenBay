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
  {
    path: 'invoice',
    loadChildren: () =>
      import('./features/main-page/invoice/invoice.module').then(
        (m) => m.InvoiceModule
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./features/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
