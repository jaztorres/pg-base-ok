import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.css']
})
export class Navbar2Component implements AfterViewInit {
  ngAfterViewInit(): void {
    // GSAP Animation for Logo
    gsap.fromTo(
      '.logo',
      { opacity: 0, scale: 0, x: '50vw', rotation: 0 },
      { opacity: 1, scale: 1, x: 'calc(100vw - 100px)', rotation: 360, duration: 1.5, ease: 'power2.out' }
    );

    // GSAP Animation for Menu Items
    gsap.fromTo(
      '.menu-item',
      { opacity: 0, x: '50vw' },
      { opacity: 1, x: 0, duration: 1, stagger: 0.2, ease: 'power2.out', delay: 0.5 }
    );
  }
}