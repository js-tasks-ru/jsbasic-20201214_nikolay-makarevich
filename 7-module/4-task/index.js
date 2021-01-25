export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this._steps = steps;
    this._value = value;
    this._container = null;

    this._onSliderClick = this._onSliderClick.bind(this);
    this._onSliderChange = this._onSliderChange.bind(this);
    this._onThumbMove = this._onThumbMove.bind(this);
    this._onThumbPointerDown = this._onThumbPointerDown.bind(this);
    this._onPointerUp = this._onPointerUp.bind(this);

    this._render();
  }
  _render() {
    this._container = createElement(sliderTemplate(this._steps, this._value));

    this._sliderElements.sliderThumb.ondragstart = () => {
      return false;
    }

    this._leftPercent = Math.round(100 * this._value / (this._steps - 1));
    this._sliderLeftPercent();
    
    this._sliderElements.sliderThumb.addEventListener('pointerdown', this._onThumbPointerDown)
    this._sliderElements.slider.addEventListener('click', this._onSliderClick);
  }

  get elem() {
    return this._container;
  }

  get value() {
    return this._value;
  }

  get _sliderElements() {
    return {
      slider: this._container,
      sliderThumb: this._container.querySelector('.slider__thumb'),
      sliderValue: this._container.querySelector('.slider__value'),
      sliderProgress: this._container.querySelector('.slider__progress'),
      sliderSteps: this._container.querySelector('.slider__steps').querySelectorAll('span'),
    }
  }

  _onThumbPointerDown() {
    this._sliderElements.sliderThumb.style.position = 'absolute';
    this._sliderElements.sliderThumb.style.zIndex = '1000';

    document.addEventListener('pointermove', this._onThumbMove);

    document.addEventListener('pointerup', this._onPointerUp, { once: true })
  }

  _onThumbMove(event) {
    this._calculateParams(event);

    this._sliderElements.sliderValue.textContent = this._value;

    this._sliderMovePercent();

    this._sliderElements.sliderSteps[this._previousValue].classList.remove('slider__step-active');
    this._sliderElements.sliderSteps[this._value].classList.add('slider__step-active');

    this._sliderElements.slider.classList.add('slider_dragging');
  }

  _onPointerUp() {
    this._sliderLeftPercent();
    this._onSliderChange();
      
    this._sliderElements.slider.classList.remove('slider_dragging');

    document.removeEventListener('pointermove', this._onThumbMove);
  }

  _onSliderClick(event) {
    this._calculateParams(event);

    this._sliderElements.sliderValue.textContent = this._value;

    this._sliderLeftPercent();

    this._sliderElements.sliderSteps[this._previousValue].classList.remove('slider__step-active');
    this._sliderElements.sliderSteps[this._value].classList.add('slider__step-active');

    this._onSliderChange();
  }

  _sliderLeftPercent() {
    this._sliderElements.sliderThumb.style.left = `${this._leftPercent}%`;
    this._sliderElements.sliderProgress.style.width = `${this._leftPercent}%`;
  }

  _sliderMovePercent() {
    this._sliderElements.sliderThumb.style.left = `${this._movePercent}%`;
    this._sliderElements.sliderProgress.style.width = `${this._movePercent}%`;
  }

  _onSliderChange() { 
    if (this._previousValue != this._value) {
      const value = this._value;
      const event = new CustomEvent('slider-change', {
        detail: value, // значение 0, 1, 2, 3, 4
        bubbles: true
      })

      this._sliderElements.slider.dispatchEvent(event);
    }
  }

  _calculateParams(event){
    this._sliderCoords = this._sliderElements.slider.getBoundingClientRect();
    
    this._sliderWidth = this._sliderElements.slider.offsetWidth;
    this._stepWidth = this._sliderWidth / (this._steps - 1);
    this._clickPosition = event.pageX - this._sliderCoords.left;

    if (this._clickPosition <= 0 || this._clickPosition >= this._sliderWidth) {
      return;
    }

    this._previousValue = this._value;
    this._value = Math.round(this._clickPosition / this._stepWidth);

    this._movePercent = Math.round(100 * this._clickPosition / this._sliderWidth);
    this._leftPercent = Math.round(100 * this._value / (this._steps - 1));
  }
}

function sliderTemplate(steps, value) {
  return `<div class="slider">
    <div class="slider__thumb">
      <span class="slider__value">${value}</span>
    </div>
    <div class="slider__progress"></div>
    <div class="slider__steps">
      ${sliderStepsTemplate(steps, value)}
    </div>
  </div>`
}

function sliderStepsTemplate(steps, value) {
  let sliderSteps = '';

  for (let i = 0; i < steps; i++) {
    if (i == value) {
      sliderSteps += '<span class="slider__step-active"></span>'
    }
    else {
      sliderSteps += '<span></span>';
    }
  }
  return sliderSteps;
}

function createElement(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.firstElementChild;
}