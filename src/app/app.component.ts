import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { gsap } from 'gsap';
import { Navbar2Component } from './navbar2/navbar2.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  
title = 'pg-base';
  

  ngAfterViewInit() {
    // Initial fade-in animation for the navbar
    gsap.from('.navbar', {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: 'power2.inOut'
    });

    
  }
}