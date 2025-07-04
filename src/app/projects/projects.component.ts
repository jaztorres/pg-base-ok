import { Component, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements AfterViewInit {
  projects = [
    { title: 'Project 1', description: 'A modern residential building.', image: 'public/assets/ima1-900x450.png' },
    { title: 'Project 2', description: 'Commercial office space.', image: 'public/assets/ima1-900x450.png' },
    { title: 'Project 3', description: 'Sustainable urban design.', image: 'public/assets/ima1-900x450.png' }
  ];

  ngAfterViewInit() {
    gsap.from('.animate-card', {
      opacity: 0,
      y: 100,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.projects',
        start: 'top 80%',
      }
    });
  }
}