// ═══════════════ HOME · scroll choreography ═══════════════
// GSAP ScrollTrigger (pin, parallax, scrub) + Draggable shapes,
// WebGL hero atmosphere, floating book. All gated on reduced motion.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { lenis, reduceMotion, finePointer } from './core.js';

if (!reduceMotion) {
  gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);

  // drive ScrollTrigger from Lenis
  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);
  }

  /* ── hero intro: name glyphs rise after the loader peels ── */
  const heroGlyphs = document.querySelectorAll('.hero__name .g');
  const heroRoles = document.querySelectorAll('.hero__role');
  const heroShapes = document.querySelectorAll('.hero__shapes .shape');
  gsap.set(heroGlyphs, { yPercent: 115 });
  gsap.set(heroRoles, { opacity: 0, y: 24 });
  gsap.set(heroShapes, { scale: 0, transformOrigin: '50% 50%' });
  document.addEventListener('loader:done', () => {
    gsap.timeline({ defaults: { ease: 'expo.out' } })
      .to(heroGlyphs, { yPercent: 0, duration: 1.35, stagger: 0.07 }, 0.05)
      .to(heroRoles, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, 0.55)
      .to(heroShapes, { scale: 1, duration: 1.1, ease: 'elastic.out(1, 0.55)', stagger: 0.07 }, 0.7);
  }, { once: true });

  /* ── hero exit: name splits apart, backdrop sinks (scrubbed) ── */
  const hero = document.querySelector('.hero');
  if (hero) {
    const words = hero.querySelectorAll('.hero__name .w');
    const dir = document.documentElement.dir === 'rtl' ? -1 : 1;
    gsap.timeline({
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    })
      .to(words[0], { xPercent: -18 * dir, ease: 'none' }, 0)
      .to(words[1], { xPercent: 18 * dir, ease: 'none' }, 0)
      .to(hero.querySelector('.hero__backdrop img'), { yPercent: 12, scale: 1.12, ease: 'none' }, 0)
      .to(hero.querySelector('.hero__scrollcue'), { opacity: 0, ease: 'none' }, 0);
  }

  /* ── draggable hero shapes: idle float + grab physics ── */
  heroShapes.forEach((shape, i) => {
    gsap.to(shape, {
      y: `+=${10 + i * 4}`,
      x: `+=${i % 2 ? -8 : 8}`,
      duration: 2.6 + i * 0.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
    Draggable.create(shape, {
      type: 'x,y',
      bounds: document.querySelector('.hero'),
      inertia: true,
      edgeResistance: 0.82,
      zIndexBoost: true,
      onPress() { gsap.to(shape, { scale: 1.08, duration: 0.25 }); },
      onRelease() { gsap.to(shape, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' }); },
    });
  });

  /* ── statement: pinned beat — words build, shapes drift ── */
  const statement = document.querySelector('.statement');
  if (statement) {
    const words = statement.querySelectorAll('.statement__line .word');
    gsap.set(words, { yPercent: 140 });
    gsap.timeline({
      scrollTrigger: {
        trigger: statement,
        start: 'top top',
        end: '+=70%',
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
      },
    })
      .to(words, { yPercent: 0, stagger: 0.06, ease: 'power3.out', duration: 0.55 }, 0)
      .fromTo('.statement__asterisk', { rotate: -40, scale: 0.7 }, { rotate: 50, scale: 1, ease: 'none', duration: 1 }, 0)
      .fromTo('.statement__rect--a', { yPercent: 60 }, { yPercent: -6, ease: 'none', duration: 1 }, 0)
      .fromTo('.statement__rect--b', { yPercent: 90 }, { yPercent: 0, ease: 'none', duration: 1 }, 0);
  }

  /* ── promise ring slow spin ── */
  gsap.to('.promise__ring', {
    rotate: 360,
    duration: 50,
    ease: 'none',
    repeat: -1,
    transformOrigin: '50% 50%',
  });

  /* ── proof rail: hot index follows scroll ── */
  const rail = document.querySelectorAll('.proof__rail span');
  const proof = document.querySelector('.proof');
  if (rail.length && proof) {
    ScrollTrigger.create({
      trigger: proof,
      start: 'top 70%',
      end: 'bottom 30%',
      onUpdate(self) {
        const hot = Math.min(rail.length - 1, Math.floor(self.progress * rail.length));
        rail.forEach((r, i) => r.classList.toggle('is-hot', i === hot));
      },
    });
  }

  /* ── testimonials: draggable strip on fine pointers ── */
  const strip = document.querySelector('.testimonials__strip');
  if (strip && finePointer && matchMedia('(min-width: 901px)').matches) {
    const clamp = () => Math.min(0, strip.parentElement.clientWidth - strip.scrollWidth - 32);
    const dir = document.documentElement.dir === 'rtl' ? -1 : 1;
    Draggable.create(strip, {
      type: 'x',
      bounds: { minX: dir === 1 ? clamp() : 0, maxX: dir === 1 ? 0 : -clamp() },
      inertia: true,
      edgeResistance: 0.85,
      cursor: 'grab',
      onPress() { strip.classList.add('is-dragging'); },
      onRelease() { strip.classList.remove('is-dragging'); },
    });
  }

  /* ── consulting ghost numeral drifts ── */
  const ghost = document.querySelector('.consulting__ghost');
  if (ghost) {
    gsap.fromTo(ghost, { yPercent: 18 }, {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: { trigger: '.consulting', start: 'top bottom', end: 'bottom top', scrub: true },
    });
  }

  /* ── floating book: levitation + scroll tilt ── */
  const book = document.querySelector('.bookteaser__book');
  if (book) {
    gsap.set(book, { rotateY: -16, rotateX: 4, rotateZ: -2 });
    gsap.to(book, { y: -16, duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    gsap.to('.bookteaser__shadow', {
      scaleX: 0.84,
      opacity: 0.6,
      duration: 2.8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
    gsap.fromTo(book, { rotateY: -28 }, {
      rotateY: 2,
      ease: 'none',
      scrollTrigger: { trigger: '.bookteaser', start: 'top bottom', end: 'bottom top', scrub: 0.8 },
    });
  }

  /* ── statement rects + asterisk get a gentle idle wobble too ── */
  gsap.to('.statement__asterisk', { y: 14, duration: 3.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
}

/* ── WebGL atmosphere (hero) — brand-tuned warm blobs ── */
(function initAtmosphere() {
  if (reduceMotion) return;
  const canvas = document.getElementById('atmoCanvas');
  if (!canvas) return;
  const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false, antialias: false });
  if (!gl) return;

  const vertSrc = `attribute vec2 a_position;varying vec2 v_uv;void main(){v_uv=a_position*0.5+0.5;gl_Position=vec4(a_position,0.0,1.0);}`;
  const fragSrc = `
    precision highp float;varying vec2 v_uv;uniform vec2 u_resolution;uniform float u_time;
    float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
    float noise(vec2 p){vec2 i=floor(p);vec2 f=fract(p);vec2 u=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),u.x),mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),u.x),u.y);}
    float fbm(vec2 p){float v=0.0;float a=0.5;for(int i=0;i<4;i++){v+=a*noise(p);p*=2.0;a*=0.5;}return v;}
    float smin(float a,float b,float k){float h=max(k-abs(a-b),0.0)/k;return min(a,b)-h*h*k*0.25;}
    float blob(vec2 p,vec2 c,float r){return length(p-c)-r;}
    void main(){
      vec2 aspect=vec2(u_resolution.x/u_resolution.y,1.0);
      vec2 uv=v_uv*aspect;float t=u_time*0.18;
      vec2 warp=vec2(fbm(uv*1.8+vec2(t*0.4,0.0)),fbm(uv*1.8+vec2(0.0,t*0.4)+5.7));
      vec2 wuv=uv+(warp-0.5)*0.55;
      vec2 c1=vec2(0.18+sin(t*0.42)*0.18,0.32+cos(t*0.31)*0.14)*aspect;
      vec2 c2=vec2(1.28+sin(t*0.35+1.7)*0.14,0.72+cos(t*0.46)*0.13)*aspect;
      vec2 c3=vec2(0.85+sin(t*0.27+3.1)*0.22,0.42+cos(t*0.38+1.2)*0.18)*aspect;
      float d1=blob(wuv,c1,0.18),d2=blob(wuv,c2,0.20),d3=blob(wuv,c3,0.16);
      float dMin=smin(smin(d1,d2,0.30),d3,0.30);
      float intensity=1.0-smoothstep(-0.05,0.40,dMin);
      float i1=exp(-d1*5.0),i2=exp(-d2*5.0),i3=exp(-d3*5.0);
      float sum=i1+i2+i3+0.0001;
      vec3 carmine=vec3(0.95,0.18,0.14);vec3 brass=vec3(1.00,0.72,0.28);vec3 amber=vec3(1.00,0.85,0.55);
      vec3 color=(carmine*i1+brass*i2+amber*i3)/sum;
      color*=0.85+fbm(uv*6.0+t*0.5)*0.25;
      gl_FragColor=vec4(color,intensity*0.85);
    }`;
  const compile = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  };
  const vs = compile(gl.VERTEX_SHADER, vertSrc);
  const fs = compile(gl.FRAGMENT_SHADER, fragSrc);
  if (!vs || !fs) return;
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const posLoc = gl.getAttribLocation(prog, 'a_position');
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
  const uRes = gl.getUniformLocation(prog, 'u_resolution');
  const uTime = gl.getUniformLocation(prog, 'u_time');
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);
  };
  resize();
  addEventListener('resize', resize);
  const start = performance.now();
  let raf = 0;
  const tick = () => {
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, (performance.now() - start) * 0.001);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    raf = requestAnimationFrame(tick);
  };
  tick();
  const hero = document.querySelector('.hero');
  if (hero) {
    new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !raf) raf = requestAnimationFrame(tick);
        else if (!e.isIntersecting && raf) { cancelAnimationFrame(raf); raf = 0; }
      });
    }, { threshold: 0 }).observe(hero);
  }
})();
