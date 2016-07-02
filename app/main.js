import './home/home.js';
import './projects/projects.js';
import './photography/photography.js';
import './about/about.js';

class Main {
  constructor () {
    this.lazyLoadImages();
  }

  lazyLoadImages () {
    [].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
      img.setAttribute('src', img.getAttribute('data-src'));
      img.onload = function() {
        img.removeAttribute('data-src');
      };
    });
  }
}

window.addEventListener('load', () => new Main());

