import './header.css';

class Header {
  constructor () {
    console.log('Header: ');
    this.$el = document.querySelector('.header-container');
    if (!this.$el) { return; }

    this.$menuButton = this.$el.querySelector('.header-menu-button');
    this.$verticalMenu = this.$el.querySelector('.vertical-nav');
    this.addEventListeners();
  }

  addEventListeners () {
    this.$menuButton.addEventListener('click', () => this.toggleMenuVisibility());
  }

  toggleMenuVisibility () {
    this.$verticalMenu.classList.toggle('is-visible');
    this.$menuButton.classList.toggle('is-active');
  }
}

window.addEventListener('load', () => new Header());
