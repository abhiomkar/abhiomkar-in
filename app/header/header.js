import './header.css';

class Header {
  constructor () {
    console.log('Header: ');
    this.$el = document.querySelector('.header-container');
    if (!this.$el) { return; }

    this.$menuButton = this.$el.querySelector('.menu');
    this.$verticalMenu = this.$el.querySelector('.vertical-nav');
    this.addEventListeners();
  }

  addEventListeners () {
    this.$menuButton.addEventListener('touchmove', (e) => { e.preventDefault(); }, false);
    this.$menuButton.addEventListener('touchend', (e) => this.toggleMenu(e), false);
    this.$menuButton.addEventListener('touchcancel', (e) => this.toggleMenu(e), false);
    this.$menuButton.addEventListener('click', (e) => this.toggleMenu(e), false);
  }

  toggleMenu (e) {
    e.preventDefault();
    this.$menuButton.classList.toggle('is-open');
    this.$menuButton.classList.toggle('is-close');

    this.$verticalMenu.classList.toggle('is-visible');
  }
}

window.addEventListener('load', () => new Header());
