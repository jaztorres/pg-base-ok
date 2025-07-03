import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { gsap } from 'gsap';
import { NavbarComponent } from './navbar/navbar.component';
import { SliderComponent } from "./slider/slider.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChildren('navItem') navItems!: QueryList<ElementRef>;
title = 'pg-base';
  menuItems = [
    { label: 'Home', link: '#' },
    { label: 'Products', link: '#' },
    { label: 'About', link: '#' },
    { label: 'Contact', link: '#' }
  ];

  ngAfterViewInit() {
    // Initial fade-in animation for the navbar
    gsap.from('.navbar', {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: 'power2.inOut'
    });

    // Hover animations for menu items
    this.navItems.forEach((item) => {
      const element = item.nativeElement;
      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          scale: 1.1,
          color: '#ffcc00',
          duration: 0.3,
          ease: 'power1.out'
        });
      });
      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          scale: 1,
          color: '#ffffff',
          duration: 0.3,
          ease: 'power1.out'
        });
      });
    });
  }
}