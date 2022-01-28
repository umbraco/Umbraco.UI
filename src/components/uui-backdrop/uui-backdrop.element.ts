import { LitElement, css } from 'lit';
import { UUIBackdropEvent } from './UUIBackdropEvent';

function reducedMotion() {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return !mediaQuery || mediaQuery.matches;
}

const _keyframes = [{ opacity: '0' }, { opacity: '0.25' }];

const _options: KeyframeAnimationOptions = {
  duration: 480,
  fill: 'both',
  easing: `${reducedMotion() ? 'steps(1)' : 'linear'}`,
};

/**
 *  @element uui-backdrop
 *  @description - All-round backdrop component, adding a dimmed layer.
 */
export class UUIBackdropElement extends LitElement {
  static styles = [
    css`
      :host {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: black;
        outline: 0;

        pointer-events: none;
      }
    `,
  ];

  private animation!: Animation;

  firstUpdated() {
    this.animation = this.animate(_keyframes, _options);
    this.animation.finished.then(() => {
      this.animation.pause();
    });
  }

  public hide() {
    this.animation.playbackRate = -1;
    this.animation.finished.then(() => {
      if (this.animation.playbackRate === -1) {
        this.dispatchEvent(new UUIBackdropEvent(UUIBackdropEvent.HIDDEN, this));
      }
    });
    this.animation.play();
  }
}
