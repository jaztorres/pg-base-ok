import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { gsap } from 'gsap';
import { Navbar2Component } from './navbar2/navbar2.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SliderComponent } from "./slider/slider.component";
import { MenuComponent } from './menu/menu.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeroComponent } from './hero/hero.component';

import { FooterComponent } from './footer/footer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent, ],
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent  {
  

  
}