import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';
import { UtilsService } from './core/utils.service';
import { AuthService } from './auth/auth.service';
import { ApiService } from './core/api.service';
import { FilterSortService } from './core/filter-sort.service';
import { environment } from '../environments/environment';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { LoadingComponent } from './core/loading.component';
import { AdminComponent } from './pages/admin/admin.component';
import { SongsComponent } from './pages/songs/songs.component';
import { SongsDetailComponent } from './pages/songs/songs-detail/songs-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CallbackComponent,
    LoadingComponent,
    AdminComponent,
    SongsComponent,
    SongsDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AuthService, ApiService, DatePipe, UtilsService, FilterSortService, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
