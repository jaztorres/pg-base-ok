import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { routes } from './app.routes';
import { SliderComponent } from './slider/slider.component';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter([
{ path:'', component: SliderComponent},
 {path:'**', redirectTo:''}
  ]) 
  ]
};
