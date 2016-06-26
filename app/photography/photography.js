import './photography.css';

class Photography {
  constructor () {
    this.$el = document.querySelector('.photography-container');
    this.$galleryNav = this.$el.querySelector('.category-nav');
    this.$galleryList = this.$el.querySelector('.gallery-list');

    this.navigateToGallery = this.navigateToGallery.bind(this);
    this.showGallery = this.showGallery.bind(this);
    this.addEventListeners();

    // shows current gallery based on the url hash
    this.showGallery();
  }

  addEventListeners () {
    this.$galleryNav.addEventListener('click', this.navigateToGallery);
    if (window.location.pathname === '/photography') {
      window.addEventListener('hashchange', this.showGallery);
    }
  }

  navigateToGallery (ev) {
    const galleryId = ev.target.getAttribute('data-gallery-id');
    window.location.hash = galleryId;
  }

  showGallery () {
    let galleryId = window.location.hash;
    if (galleryId.startsWith('#')) {
      galleryId = galleryId.slice(1);
    }

    // select gallery nav link
    const $selectedNavLink = this.$galleryNav.querySelector(`[data-gallery-id="${galleryId}"`);
    // do nothing if the gallery with the id doesn't exist including no hash.
    if (!$selectedNavLink) {
      return;
    }
    this.$galleryNav.querySelectorAll('.category-link').forEach((linkEl) => {
      linkEl.classList.remove('is-selected');
    });
    $selectedNavLink.classList.add('is-selected');

    // show target gallery
    this.$galleryList.querySelectorAll('.gallery').forEach((galleryEl) => {
      galleryEl.classList.remove('is-visible');
    });
    const $selectedGallery = this.$galleryList.querySelector(`[data-gallery-id="${galleryId}"`);
    $selectedGallery.classList.add('is-visible');
  }
}

window.addEventListener('load', () => new Photography());
