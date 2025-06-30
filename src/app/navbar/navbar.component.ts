import { Component, OnInit, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.animateMenu();
  }

  animateMenu() {
    const overlay = document.querySelector('.menu-overlay');
    const menuItems = document.querySelectorAll('.menu-items li');
    const socialLinks = document.querySelector('.social-links');

    if (this.isMenuOpen) {
      gsap.to(overlay, {
        duration: 0.8,
        height: '100vh',
        ease: 'power3.inOut',
        //onStart: () => (overlay!.style.display = 'flex'),
      });
      gsap.to(menuItems, {
        duration: 0.6,
        y: 0,
        opacity: 1,
        stagger: 0.1,
        delay: 0.3,
        ease: 'power3.out',
      });
      gsap.to(socialLinks, {
        duration: 0.6,
        y: 0,
        opacity: 1,
        delay: 0.5,
        ease: 'power3.out',
      });
    } else {
      gsap.to([menuItems, socialLinks], {
        duration: 0.4,
        y: 20,
        opacity: 0,
        stagger: 0.05,
        ease: 'power3.in',
      });
      gsap.to(overlay, {
        duration: 0.8,
        height: 0,
        ease: 'power3.inOut',
        delay: 0.3,
        //onComplete: () => (overlay!.style.display = 'none'),
      });
    }
  }

  onHover(event: MouseEvent) {
    const target = event.target as HTMLElement;
    gsap.to(target, {
      scale: 1.1,
      duration: 0.3,
      ease: 'power2.out',
    });
    gsap.to(target, {
      scale: 1,
      duration: 0.3,
      delay: 0.3,
      ease: 'power2.out',
    });
  }
}