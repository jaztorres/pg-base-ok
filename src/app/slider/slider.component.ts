import { Component, OnInit } from '@angular/core';
import { NgStyle, NgFor } from '@angular/common'; // Importa NgStyle y NgFor

@Component({
  selector: 'app-slider',
  standalone: true,
  imports:[NgStyle, NgFor], // Agrega NgStyle y NgFor aquí
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {
  slides = [
    //{ src: 'https://picsum.photos/id/1/800/400', alt: 'Slide 1' },
   // { src: 'https://picsum.photos/id/2/800/400', alt: 'Slide 2' },
    //{ src: 'https://picsum.photos/id/3/800/400', alt: 'Slide 3' },
    { src: 'assets/img/ima1.jpg', alt: 'Slide 4' },
    { src: 'assets/img/ima2.jpg', alt: 'Slide 5' },
    { src: 'assets/img/ima3.jpg', alt: 'Slide 6' },
  ];
  currentSlide = 0;
  transformStyle = 'translateX(0px)'; // Esto se actualizará dinámicamente

  // Define el ancho de la diapositiva para usarlo en el cálculo
  slideWidth = 1600; // Asegúrate de que esto coincida con el ancho de tus imágenes o contenedor

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
    // Calcula el desplazamiento horizontal necesario
    this.transformStyle = `translateX(-${this.currentSlide * this.slideWidth}px)`;
  }
}