import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter([
{ path:'', component: NavbarComponent},
 {path:'**', redirectTo:''}
  ]) 
  ]
};
