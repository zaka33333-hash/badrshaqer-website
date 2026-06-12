// ═══════════════ INNER PAGES · light choreography ═══════════════
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { lenis, reduceMotion } from './core.js';

if (!reduceMotion) {
  gsap.registerPlugin(ScrollTrigger);
  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);
  }
}

let activeTweens = [];

function cleanupInner() {
  activeTweens.forEach((t) => t.kill());
  activeTweens = [];
  ScrollTrigger.getAll().forEach((t) => t.kill());
}

document.addEventListener('astro:page-load', () => {
  const isInner = document.querySelector('.bookteaser__book');
  if (!isInner) return;

  cleanupInner();

  if (!reduceMotion) {
    const book = document.querySelector('.bookteaser__book');
    if (book) {
      gsap.set(book, { rotateY: -16, rotateX: 4, rotateZ: -2 });
      const floatTween = gsap.to(book, { y: -16, duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      activeTweens.push(floatTween);

      const shadowTween = gsap.to('.bookteaser__shadow', { scaleX: 0.84, opacity: 0.6, duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      activeTweens.push(shadowTween);

      const tiltTween = gsap.fromTo(book, { rotateY: -26 }, {
        rotateY: 0,
        ease: 'none',
        scrollTrigger: { trigger: book, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
      });
      activeTweens.push(tiltTween);
    }
  }

  document.addEventListener('astro:after-swap', cleanupInner, { once: true });
});
