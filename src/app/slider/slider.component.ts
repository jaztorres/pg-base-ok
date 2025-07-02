import { Component, AfterViewInit, OnDestroy, inject, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para directivas como ngFor, aunque no se usa aquí directamente.
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(Observer);

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private observerInstance: Observer | null = null;
  private keydownListener: any;

  private sections: HTMLElement[] = [];
  private images: HTMLElement[] = [];
  private slideImages: HTMLElement[] = [];
  private outerWrappers: HTMLElement[] = [];
  private innerWrappers: HTMLElement[] = [];
  private countElement: HTMLElement | null = null;

  private animating: boolean = false;
  private currentIndex: number = 0;
  private wrap: Function;

  constructor() {
    // Inicializa wrap aquí para que esté disponible en ngAfterViewInit
    this.wrap = gsap.utils.wrap(0, 0); // Se actualizará con la longitud correcta en ngAfterViewInit
  }

  ngAfterViewInit(): void {
    this.initializeGSAP();
    this.setupObservers();
  }

  ngOnDestroy(): void {
    if (this.observerInstance) {
      this.observerInstance.kill();
    }
    if (this.keydownListener) {
      document.removeEventListener("keydown", this.keydownListener);
    }
    // Opcional: Limpiar animaciones de GSAP si quedan activas
    gsap.killTweensOf(this.sections);
    gsap.killTweensOf(this.images);
    gsap.killTweensOf(this.outerWrappers);
    gsap.killTweensOf(this.innerWrappers);
  }

  private initializeGSAP(): void {
    this.sections = gsap.utils.toArray(".slide", this.el.nativeElement) as HTMLElement[];
    this.images = gsap.utils.toArray(".image", this.el.nativeElement).reverse() as HTMLElement[];
    this.slideImages = gsap.utils.toArray(".slide__img", this.el.nativeElement) as HTMLElement[];
    this.outerWrappers = gsap.utils.toArray(".slide__outer", this.el.nativeElement) as HTMLElement[];
    this.innerWrappers = gsap.utils.toArray(".slide__inner", this.el.nativeElement) as HTMLElement[];
    this.countElement = this.el.nativeElement.querySelector(".count");

    this.wrap = gsap.utils.wrap(0, this.sections.length);

    gsap.set(this.outerWrappers, { xPercent: 100 });
    gsap.set(this.innerWrappers, { xPercent: -100 });
    gsap.set(this.sections[0].querySelector(".slide__outer"), { xPercent: 0 });
    gsap.set(this.sections[0].querySelector(".slide__inner"), { xPercent: 0 });

    gsap.set([this.sections, this.images], { zIndex: 0, autoAlpha: 0 });
    gsap.set([this.sections[0], this.images[0]], { zIndex: 1, autoAlpha: 1 });
  }

  private gotoSection(index: number, direction: number): void {
    this.animating = true;
    index = this.wrap(index);

    let tl = gsap.timeline({
      defaults: { duration: 1, ease: "expo.inOut" },
      onComplete: () => {
        this.animating = false;
      }
    });

    let currentSection = this.sections[this.currentIndex];
    let heading = currentSection.querySelector(".slide__heading");
    let nextSection = this.sections[index];
    let nextHeading = nextSection.querySelector(".slide__heading");

    gsap.set([this.sections, this.images], { zIndex: 0, autoAlpha: 0 });
    gsap.set([this.sections[this.currentIndex], this.images[index]], { zIndex: 1, autoAlpha: 1 });
    gsap.set([this.sections[index], this.images[this.currentIndex]], { zIndex: 2, autoAlpha: 1 });


    tl
      .set(this.countElement, { tex: index + 1 }, 0.32)
      .fromTo(
        this.outerWrappers[index],
        {
          xPercent: 100 * direction
        },
        { xPercent: 0 },
        0
      )
      .fromTo(
        this.innerWrappers[index],
        {
          xPercent: -100 * direction
        },
        { xPercent: 0 },
        0
      )
      .to(
        heading,
        {
          "--width": 800,
          xPercent: 30 * direction
        },
        0
      )
      .fromTo(
        nextHeading,
        {
          "--width": 800,
          xPercent: -30 * direction
        },
        {
          "--width": 200,
          xPercent: 0
        },
        0
      )
      .fromTo(
        this.images[index],
        {
          xPercent: 125 * direction,
          scaleX: 1.5,
          scaleY: 1.3
        },
        { xPercent: 0, scaleX: 1, scaleY: 1, duration: 1 },
        0
      )
      .fromTo(
        this.images[this.currentIndex],
        { xPercent: 0, scaleX: 1, scaleY: 1 },
        {
          xPercent: -125 * direction,
          scaleX: 1.5,
          scaleY: 1.3
        },
        0
      )
      .fromTo(
        this.slideImages[index],
        {
          scale: 2
        },
        { scale: 1 },
        0
      )
      .timeScale(0.8);

    this.currentIndex = index;
  }

  private setupObservers(): void {
    this.observerInstance = Observer.create({
      type: "wheel,touch,pointer",
      preventDefault: true,
      wheelSpeed: -1,
      onUp: () => {
        if (this.animating) return;
        this.gotoSection(this.currentIndex + 1, +1);
      },
      onDown: () => {
        if (this.animating) return;
        this.gotoSection(this.currentIndex - 1, -1);
      },
      tolerance: 10
    });

    this.keydownListener = (e: KeyboardEvent) => this.logKey(e);
    document.addEventListener("keydown", this.keydownListener);
  }

  private logKey(e: KeyboardEvent): void {
    console.log(e.code);
    if ((e.code === "ArrowUp" || e.code === "ArrowLeft") && !this.animating) {
      this.gotoSection(this.currentIndex - 1, -1);
    }
    if (
      (e.code === "ArrowDown" ||
        e.code === "ArrowRight" ||
        e.code === "Space" ||
        e.code === "Enter") &&
      !this.animating
    ) {
      this.gotoSection(this.currentIndex + 1, 1);
    }
  }
}