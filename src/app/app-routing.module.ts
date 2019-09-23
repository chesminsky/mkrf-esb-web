import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './shared/services/auth.guard';
import { NoderedComponent } from './nodered/nodered.component';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent
}, {
  path: '',
  component: MainComponent,
  canActivate: [ AuthGuard ],
  children: [
    {
      path: 'nodered',
      component: NoderedComponent
    }
  ]
}, {
  path: '**',
  redirectTo: ''
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
