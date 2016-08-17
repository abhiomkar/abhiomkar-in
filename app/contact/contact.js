import './contact.css';
import 'whatwg-fetch';

class Contact {
  constructor () {
    console.log('Contact');

    this.$el = document.querySelector('.contact-container');

    if (!this.$el) { return; }

    this.$form = this.$el.querySelector('#contact-form');
    this.$sendButton = this.$el.querySelector('#contact-send-button');

    this.addEventListeners();
  }

  addEventListeners () {
    this.$sendButton.addEventListener('click', (e) => this.sendEmail(e));
  }

  sendEmail (e) {
    e.preventDefault();

    const promise = fetch('/contact/sendmail', {
      method: 'POST',
      body: new FormData(this.$form),
    });

    promise.then(response => {
      if (response.status === 200) {
        // clear form
        this.$form.reset();
        this.showThankYou();
      } else {
        this.showError();
      }
    }).catch(() => this.showError());
  }

  showThankYou () {
    const $aboutSection = this.$el.querySelector('.about-section');
    const $thankYou = this.$el.querySelector('.thank-you');
    const toggleVisible = () => {
      $aboutSection.classList.toggle('is-visible');
      $thankYou.classList.toggle('is-visible');
    }

    toggleVisible();
    setTimeout(() => {
      toggleVisible();
    }, 8000);
  }

  showError () {
    const $statusBar = this.$el.querySelector('.status-bar');

    $statusBar.classList.add('is-visible');
    setTimeout(() => {
      $statusBar.classList.remove('is-visible');
    }, 8000);
  }
}

window.addEventListener('load', () => new Contact());
