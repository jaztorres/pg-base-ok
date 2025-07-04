
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isMenuOpen = false;

  ngOnInit(): void {
    // GSAP animations for logo and menu items
    gsap.from('.navbar-brand img', {
      duration: 1,
      x: '50vw',
      rotation: 360,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to('.navbar-brand img', {
          x: 0,
          duration: 0.5,
          ease: 'power2.in'
        });
      }
    });

    gsap.from('.nav-item', {
      duration: 1,
      x: '50vw',
      opacity: 0,
      stagger: 0.2,
      ease: 'power2.out',
      delay: 0.5,
      onComplete: () => {
        gsap.to('.nav-item', {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.in'
        });
      }
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}