import './home.css';

class Home {
  constructor () {
    console.log('Home');

    this.$el = document.querySelector('.home-container');

    const $coverPic = this.$el.querySelector('.home-cover-pic');
    $coverPic.setAttribute('src', $coverPic.getAttribute('data-src'));
    $coverPic.onload = () => {
      $coverPic.removeAttribute('data-src');
      this.$el.classList.add('is-visible');
    };
  }
}

window.addEventListener('load', () => new Home());
