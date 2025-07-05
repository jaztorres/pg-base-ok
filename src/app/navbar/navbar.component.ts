import { Component, OnInit, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl:'./navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMenuOpen = false;

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