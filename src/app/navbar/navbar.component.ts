import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports:[CommonModule, NgClass],
  templateUrl:'./navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  {
  isMenuOpen = false;
  private offcanvas: any;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const offcanvas = document.querySelector('.offcanvas');
    
    if (this.isMenuOpen) {
      gsap.to(offcanvas, {
        x: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    } else {
      gsap.to(offcanvas, {
        x: '100%',
        duration: 0.5,
        ease: 'power2.in'
      });
    }
  }
}