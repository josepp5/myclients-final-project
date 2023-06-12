import { Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';


// Different routes that this app uses, all of them need a verified token unless the login and signup pages
export const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'detail/:group/:id',
    loadComponent: () => import('./pages/detail/detail.page').then(m => m.DetailPage),
    canActivate: [AuthGuardService]
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.page').then(m => m.SignupPage)
  },
  {
    path: 'account',
    loadComponent: () => import('./pages/account/account.page').then(m => m.AccountPage),
    canActivate: [AuthGuardService]
  },
  {
    path: 'update-customer/:group/:id',
    loadComponent: () => import('./pages/update-customer/update-customer.page').then(m => m.UpdateCustomerPage),
    canActivate: [AuthGuardService]
  },
  {
    path: 'home/:username',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
    canActivate: [AuthGuardService]
  },
  {
    path: 'groups',
    loadComponent: () => import('./pages/groups/groups.page').then(m => m.GroupsPage),
    canActivate: [AuthGuardService]
  },
];
