import { gsap } from 'gsap';

export function animateBlocks(selector, interval = 0.2) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element, index) => {
    gsap.fromTo(element, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, delay: index * interval, duration: 0.5 }
    );
  });
}

export function animateMapAppearance(selector) {
  gsap.fromTo(selector, 
    { opacity: 0 }, 
    { opacity: 1, duration: 1 }
  );
}

export function animateFormOverlay(selector) {
  gsap.fromTo(selector, 
    { opacity: 0 }, 
    { opacity: 1, duration: 0.5 }
  );
}

export function hideElement(selector) {
  gsap.to(selector, 
    { opacity: 0, duration: 0.5 }
  );
}

export function animateDropdownOpen(selector) {
  gsap.fromTo(selector, 
    { opacity: 0, y: -10 }, 
    { opacity: 1, y: 0, duration: 0.3 }
  );
}

export function animateDropdownClose(selector) {
  gsap.to(selector, 
    { opacity: 0, y: -10, duration: 0.3, onComplete: () => {
      document.querySelector(selector).style.display = 'none';
    }}
  );
}
