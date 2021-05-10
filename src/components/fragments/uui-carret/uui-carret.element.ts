import { LitElement, html, css, svg } from 'lit';
import { query, property } from 'lit/decorators';

const carret = svg`<svg viewBox="0 0 512 512"><path d="M255.125 361.35L88.193 149.765h333.862z"></path></svg>`;

export class UUICarretElement extends LitElement {
  static styles = [
    css`
      #carret-container {
        display: inline-block;
        width: 12px;
        vertical-align: middle;
      }

      #carret-container svg {
        fill: currentColor;
      }
    `,
  ];

  @query('#carret-container')
  container!: HTMLElement;

  @query('svg')
  svg!: HTMLElement;

  constructor() {
    super();
    //this.addEventListener('click', this.toggleOpen);
  }

  private _animation!: Animation;

  private _isOpen = false;
  @property({ type: Boolean, reflect: true, attribute: 'open' })
  get isOpen() {
    return this._isOpen;
  }

  set isOpen(newVal) {
    const oldVal = this._isOpen;
    this._isOpen = newVal;
    this.toggleOpen(newVal);
    this.requestUpdate('isOpen', oldVal);
  }

  firstUpdated() {
    //can you increase the performace of that if you define that as static?
    this._animation = this.svg.animate(this._keyframes, this._options);
    this._animation.pause();
  }

  private _keyframes = [
    { transform: 'rotate(0deg)' },
    { transform: 'rotate(180deg)' },
  ];

  private _options: KeyframeAnimationOptions = {
    duration: 400,
    fill: 'both',
    easing: 'cubic-bezier(.17,-0.88,.82,1.84)',
  };

  public toggleOpen(isOpen: boolean) {
    this._animation.play();
    this._animation.finished.then(() => {
      this._animation.pause();
      this._animation.playbackRate = isOpen ? -1 : 1;
    });
  }

  render() {
    return html` <div id="carret-container">${carret}</div> `;
  }
}
