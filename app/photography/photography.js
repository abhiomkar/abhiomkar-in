import './photography.css';
import Common from '../common/common.js';

class Photography {
  constructor () {
    console.log('Photography');

    this.$el = document.querySelector('.photography-container');

    if (!this.$el) {
      return;
    }

    this.$galleryNav = this.$el.querySelector('.category-nav');
    this.$galleryList = this.$el.querySelector('.gallery-list');

    this.addEventListeners();

    // shows gallery which is currently selected.
    const galleryId = location.hash || 
        this.$galleryNav.querySelector('.is-selected').getAttribute('data-gallery-id');
    this.showGallery = this.showGallery.bind(this);
      
    this.showGallery(galleryId);
  }

  addEventListeners () {
    this.$galleryNav.addEventListener(Common.isTouchDevice() ? 'touchend' : 'click', (e) => this.navigateToGallery(e));
  }

  navigateToGallery (ev) {
    ev.preventDefault();
    const galleryId = ev.target.getAttribute('data-gallery-id');
    location.hash = galleryId;

    this.showGallery(galleryId);
  }

  showGallery (galleryId) {
    if (galleryId.startsWith('#')) {
      galleryId = galleryId.slice(1);
    }

    // select gallery nav link
    const $selectedNavLink = this.$galleryNav.querySelector(`[data-gallery-id="${galleryId}"]`);
    // do nothing if the gallery with the id doesn't exist including no hash.
    if (!$selectedNavLink) { return; }
    this.$galleryNav.querySelectorAll('.category-link').forEach((linkEl) => {
      linkEl.classList.remove('is-selected');
    });
    $selectedNavLink.classList.add('is-selected');

    // show target gallery
    const $selectedGallery = this.$galleryList.querySelector(`[data-gallery-id="${galleryId}"]`);
    this.$galleryList.querySelectorAll('.gallery').forEach((galleryEl) => {
      galleryEl.classList.remove('is-visible');
    });
    $selectedGallery.classList.add('is-visible');

    this.lazyLoadImagesOnGallery($selectedGallery);
  }

  lazyLoadImagesOnGallery ($gallery) {
    $gallery.querySelectorAll('img[data-src]').forEach(($image, i) => {
      if ($image.hasAttribute('lazy')) {
        $image.setAttribute('src', $image.getAttribute('data-src'));
        $image.onload = function() {
          $image.removeAttribute('data-src');
        };
      }
    });
  }
}

window.addEventListener('load', () => new Photography());
