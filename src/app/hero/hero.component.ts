import { Component, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements AfterViewInit {
  ngAfterViewInit() {
    gsap.from('.animate-title', { opacity: 0, y: 50, duration: 1, delay: 0.5 });
    gsap.from('.animate-subtitle', { opacity: 0, y: 50, duration: 1, delay: 0.8 });
  }
}