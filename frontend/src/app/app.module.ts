import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { httpInterceptor } from '@core/interceptors/http.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './modules/material/material.module';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LayoutsComponent,
    NotFoundComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, MaterialModule],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptors([httpInterceptor]), withFetch()),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
