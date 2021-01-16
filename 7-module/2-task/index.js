import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this._modal = null;
    this._title = null;
    this._modalBody = null;

    this._keydown = this._keydown.bind(this);
  }

  open() {
    this._modal = createElement(modalTemplate(this._title, this._modalBody));
    document.body.append(this._modal);
    document.body.classList.add('is-modal-open');

    this._modalCloseButton.addEventListener('click', this.close);
    document.addEventListener('keydown', this._keydown);
  }

  close() {
    document.body.classList.remove('is-modal-open');
    document.querySelector('.modal').remove();
    document.removeEventListener('keydown', this._keydown);
  }

  setTitle(title) {
    this._title = title;
  }

  setBody(modalBody) {
    this._modalBody = modalBody.outerHTML;
  }

  _keydown(event) {
    if(event.code === `Escape` && document.querySelector('.modal')) {
      this.close();
    }
  }

  get _modalCloseButton() {
    return this._modal.querySelector('.modal__close');
  }
}

function modalTemplate(title, body){
  return `<div class="modal">
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title">
          ${title}
        </h3>
      </div>
      <div class="modal__body">
        ${body}
      </div>
    </div>
  </div>`
}