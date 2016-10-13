import './common/base.js';
import './header/header.js';
import './home/home.js';
import './projects/projects.js';
import './photography/photography.js';
import './about/about.js';
import './contact/contact.js';

class Main {
  constructor() { this.lazyLoadImages(); }

  lazyLoadImages() {
    Array.from(document.querySelectorAll('img[data-src]'))
        .forEach((img) => {
          if (!img.hasAttribute('lazy')) {
            img.setAttribute('src', img.getAttribute('data-src'));
            img.onload = function() { img.removeAttribute('data-src'); };
          }
        });
  }
}

window.addEventListener('load', () => new Main());
