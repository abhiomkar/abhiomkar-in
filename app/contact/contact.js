import './contact.css';
import 'whatwg-fetch';

class Contact {
  constructor () {
    console.log('Contact');

    this.$el = document.querySelector('.contact-container');

    if (!this.$el) { return; }

    this.$form = this.$el.querySelector('#contact-form');
    this.$sendButton = this.$el.querySelector('#contact-send-button');
    this.$statusBar = this.$el.querySelector('.status-bar');

    this.addEventListeners();
    this.isSending = false;
  }

  addEventListeners () {
    this.$sendButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.isSending) { return; }

      this.isSending = true;
      setTimeout(() => this.sendEmail(e), 600);
    });
  }

  sendEmail (e) {
    const promise = fetch('/contact/sendmail', {
      method: 'POST',
      body: new FormData(this.$form),
    });

    const ERROR_MSG = "Couldn't send. Please try again later.";

    promise.then(response => {
      if (response.status === 200) {
        // clear form
        this.$form.reset();
        this.showToast("Mail sent.");
        this.showThankYouMsg();
      } else {
        this.showErrorToast(ERROR_MSG);
      }

      this.isSending = false;
    }).catch(() => {
      this.showErrorToast(ERROR_MSG)
      this.isSending = false;
    });
  }

  showErrorToast (msg) {
    this.$statusBar.innerHTML = msg;
    this.$statusBar.classList.add('has-error');
    this.$statusBar.classList.add('is-visible');
    this.hideToast();
  }

  showToast (msg) {
    this.$statusBar.innerHTML = msg;
    this.$statusBar.classList.add('is-visible');
    this.hideToast();
  }

  hideToast() {
   setTimeout(() => {
      this.$statusBar.classList.remove('is-visible');
      this.$statusBar.classList.remove('has-error');
    }, 8000);
  }

  showThankYouMsg () {
    const $thankYou = this.$el.querySelector('.thank-you');
    $thankYou.classList.add('is-visible');
    setTimeout(() => $thankYou.classList.remove('is-visible'), 12000);
  }
}

window.addEventListener('load', () => new Contact());
