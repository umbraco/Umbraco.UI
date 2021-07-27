import { LitElement, html, css } from 'lit';
import { UUIModalEvent } from './UUIModalEvent';

function reducedMotion() {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return !mediaQuery || mediaQuery.matches;
}

const _keyframes = [
  { transform: 'translateX(200%)' },
  { transform: 'translateX(0%)' },
];

const _options: KeyframeAnimationOptions = {
  duration: 480,
  fill: 'both',
  easing: `${reducedMotion() ? 'steps(1)' : 'cubic-bezier(.3,.7,.8,1)'}`,
};

/**
 *  @element uui-modal
 *  @description - All-round modal base component, to be injected into the modal container
 */
export class UUIModalElement extends LitElement {
  static styles = [
    css`
      :host {
        position: absolute;
        display: block;
      }
    `,
  ];

  public visibleModal = false;

  private animation!: Animation;

  firstUpdated() {
    this.animation = this.animate(_keyframes, _options);
    if (this.visibleModal === false) {
      this.animation.pause();
      this.animation.currentTime = 0;
    }
    this.animation.finished.then(() => {
      this.animation.pause();
    });
  }

  public openModal() {
    this.visibleModal = true;
    if (this.animation) {
      this.animation.playbackRate = 1;
      this.animation.play();
    }
  }
  public closeModal() {
    this.visibleModal = false;
    this.dispatchEvent(new UUIModalEvent(UUIModalEvent.CLOSE, this));
    this.animation.playbackRate = -1;
    this.animation.play();
    this.animation.finished.then(() => {
      if (this.animation.playbackRate === -1) {
        this.dispatchEvent(new UUIModalEvent(UUIModalEvent.CLOSED, this));
        if (this.parentNode) {
          this.parentNode.removeChild(this);
        }
      }
    });
  }

  render() {
    return html` <slot></slot> `;
  }
}
