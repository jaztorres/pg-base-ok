/*gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let panels = gsap.utils.toArray(".panel"),
    observer,
    scrollTween;

if (ScrollTrigger.isTouch === 1) {
  observer = ScrollTrigger.normalizeScroll(true);
}

// on touch devices, ignore touchstart events if there's an in-progress tween so that touch-scrolling doesn't interrupt and make it wonky
document.addEventListener("touchstart", e => {
  if (scrollTween) {
    e.preventDefault();
    e.stopImmediatePropagation();
  }
}, {capture: true, passive: false})

function goToSection(i) {
  scrollTween = gsap.to(window, {
    scrollTo: {y: i * innerHeight, autoKill: false},
    onStart: () => {
      if (!observer) return;
      observer.disable(); // for touch devices, as soon as we start forcing scroll it should stop any current touch-scrolling, so we just disable() and enable() the normalizeScroll observer
      observer.enable();
    },
    duration: 1,
    onComplete: () => scrollTween = null,
    overwrite: true
  });
}

panels.forEach((panel, i) => {
  ScrollTrigger.create({
    trigger: panel,
    start: "top bottom",
    end: "+=199%",
    markers: true,
    onToggle: self => self.isActive && !scrollTween && goToSection(i)
  });
});

// just in case the user forces the scroll to an inbetween spot (like a momentum scroll on a Mac that ends AFTER the scrollTo tween finishes):
ScrollTrigger.create({
  start: 0, 
  end: "max",
  snap: 1 / (panels.length - 1)
})



// 💚 This just adds the GSAP link to this pen, don't copy this bit
import { GSAPInfoBar } from "https://codepen.io/GreenSock/pen/vYqpyLg.js"
new GSAPInfoBar({ link: "https://gsap.com/docs/v3/Plugins/ScrollTrigger/"});
// 💚 Happy tweening!*/


console.clear();

const sections = gsap.utils.toArray(".slide");
const images = gsap.utils.toArray(".image").reverse();
const slideImages = gsap.utils.toArray(".slide__img");
const outerWrappers = gsap.utils.toArray(".slide__outer");
const innerWrappers = gsap.utils.toArray(".slide__inner");
const count = document.querySelector(".count");
const wrap = gsap.utils.wrap(0, sections.length);
let animating;
let currentIndex = 0;

gsap.set(outerWrappers, { xPercent: 100 });
gsap.set(innerWrappers, { xPercent: -100 });
gsap.set(".slide:nth-of-type(1) .slide__outer", { xPercent: 0 });
gsap.set(".slide:nth-of-type(1) .slide__inner", { xPercent: 0 });

function gotoSection(index, direction) {
 animating = true;
 index = wrap(index);

 let tl = gsap.timeline({
  defaults: { duration: 1, ease: "expo.inOut" },
  onComplete: () => {
   animating = false;
  }
 });

 let currentSection = sections[currentIndex];
 let heading = currentSection.querySelector(".slide__heading");
 let nextSection = sections[index];
 let nextHeading = nextSection.querySelector(".slide__heading");

 gsap.set([sections, images], { zIndex: 0, autoAlpha: 0 });
 gsap.set([sections[currentIndex], images[index]], { zIndex: 1, autoAlpha: 1 });
 gsap.set([sections[index], images[currentIndex]], { zIndex: 2, autoAlpha: 1 });

 tl
  .set(count, { text: index + 1 }, 0.32)
  .fromTo(
   outerWrappers[index],
   {
    xPercent: 100 * direction
   },
   { xPercent: 0 },
   0
  )
  .fromTo(
   innerWrappers[index],
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
   images[index],
   {
    xPercent: 125 * direction,
    scaleX: 1.5,
    scaleY: 1.3
   },
   { xPercent: 0, scaleX: 1, scaleY: 1, duration: 1 },
   0
  )
  .fromTo(
   images[currentIndex],
   { xPercent: 0, scaleX: 1, scaleY: 1 },
   {
    xPercent: -125 * direction,
    scaleX: 1.5,
    scaleY: 1.3
   },
   0
  )
  .fromTo(
   slideImages[index],
   {
    scale: 2
   },
   { scale: 1 },
   0
  )
  .timeScale(0.8);

 currentIndex = index;
}

Observer.create({
 type: "wheel,touch,pointer",
 preventDefault: true,
 wheelSpeed: -1,
 onUp: () => {
  console.log("down");
  if (animating) return;
  gotoSection(currentIndex + 1, +1);
 },
 onDown: () => {
  console.log("up");
  if (animating) return;
  gotoSection(currentIndex - 1, -1);
 },
 tolerance: 10
});

document.addEventListener("keydown", logKey);

function logKey(e) {
 console.log(e.code);
 if ((e.code === "ArrowUp" || e.code === "ArrowLeft") && !animating) {
  gotoSection(currentIndex - 1, -1);
 }
 if (
  (e.code === "ArrowDown" ||
   e.code === "ArrowRight" ||
   e.code === "Space" ||
   e.code === "Enter") &&
  !animating
 ) {
  gotoSection(currentIndex + 1, 1);
 }
}
