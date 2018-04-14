import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { HomeComponent } from './pages/home/home.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { AdminComponent } from './pages/admin/admin.component';
import { SongsComponent } from './pages/songs/songs.component';
import { SongsDetailComponent } from './pages/songs/songs-detail/songs-detail.component';


const routes: Routes = [{
  path: '',
  component: HomeComponent
},
{
  path: 'callback',
  component: CallbackComponent
},
{
  path: 'admin',
  canActivate: [
    AuthGuard,
    AdminGuard
  ],
  children: [
    {
      path: '',
      component: AdminComponent
    }
  ]
},
{
  path: 'songs',
  canActivate: [
    AuthGuard
  ],
  children: [
    {
      path: '',
      component: SongsComponent
    }
  ]
},
{
  path: 'songs/:id',
  component: SongsDetailComponent,
  canActivate: [
    AuthGuard
  ]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    AdminGuard
  ]
})
export class AppRoutingModule { }
