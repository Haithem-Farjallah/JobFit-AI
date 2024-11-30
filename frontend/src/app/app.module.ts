import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { LayoutsComponent } from './layouts/candidatLayout/layouts.component';
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
import { RhNavbarComponent } from './shared/components/rh-navbar/rh-navbar.component';
import { RhLayoutComponent } from './layouts/rh-layout/rh-layout.component';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { userReducer } from './store/user/user.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';

function localStorageSyncReducer(reducer: any) {
  return localStorageSync({
    keys: ['user'],
    rehydrate: true,
  })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RhNavbarComponent,
    FooterComponent,
    LayoutsComponent,
    NotFoundComponent,
    RhLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    StoreModule.forRoot({ user: userReducer }, { metaReducers }),
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptors([httpInterceptor]), withFetch()),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
