import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports:[],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {
  slides = [
    { src: 'https://picsum.photos/id/1/800/400', alt: 'Slide 1' },
    { src: 'https://picsum.photos/id/2/800/400', alt: 'Slide 2' },
    { src: 'https://picsum.photos/id/3/800/400', alt: 'Slide 3' },
  ];
  currentSlide = 0;
  transformStyle = 'translateX(0px)';

  ngOnInit(): void {
    this.updateSlider();
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.updateSlider();
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.updateSlider();
  }

  private updateSlider(): void {
    const slideWidth = 800; // Ancho de cada diapositiva (ajusta según tu diseño)
    //this.transformStyle = translateX(-${this.currentSlide * slideWidth}px);
  }
}