import { LitElement, html, css, svg, query, property } from 'lit-element';

const carret = svg`<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 448 512">
<path d="M207 381.5L12.7 187a24 24 0 010-34l22.7-22.6a24 24 0 0133.9 0l154.7 154 154.7-154a24 24 0 0134 0l22.6 22.7a24 24 0 010 34L241 381.4a24 24 0 01-34 0z"/>
</svg>`;

export class UUICarretElement extends LitElement {
  static styles = [
    css`
      #carret-container {
        width: 10px;
        display: block;
        margin: 30px auto;
      }
    `,
  ];

  @query('#carret-container')
  container!: HTMLElement;

  @query('svg')
  svg!: HTMLElement;

  constructor() {
    super();
    this.addEventListener('click', this.toggleOpen);
  }

  private _animation!: Animation;

  @property({ type: Boolean, reflect: true, attribute: 'open' })
  isOpen = false;

  firstUpdated() {
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

  public toggleOpen() {
    this.isOpen = !this.isOpen;
    this._animation.play();
    this._animation.finished.then(() => {
      this._animation.pause();
      this._animation.playbackRate = this.isOpen ? -1 : 1;
    });
  }

  render() {
    return html` <div id="carret-container">${carret}</div> `;
  }
}
