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

  // ghost numerals drift
  document.querySelectorAll('.pagehero__ghost, .consulting__ghost').forEach((ghost) => {
    gsap.fromTo(ghost, { yPercent: 14 }, {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: { trigger: ghost.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  // floating book (book page)
  const book = document.querySelector('.bookteaser__book');
  if (book) {
    gsap.set(book, { rotateY: -16, rotateX: 4, rotateZ: -2 });
    gsap.to(book, { y: -16, duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    gsap.to('.bookteaser__shadow', { scaleX: 0.84, opacity: 0.6, duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    gsap.fromTo(book, { rotateY: -26 }, {
      rotateY: 0,
      ease: 'none',
      scrollTrigger: { trigger: book, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
    });
  }
}
