import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators';
import { UUILayerEvent } from './UUILayerEvent';

/**
 *  @element uui-layer
 *  @description - All-round layer base component, to be injected into the layer-container
 */
export class UUILayerElement extends LitElement {
  static styles = [
    css`
      :host {
        position: absolute;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  visible = false;

  private _keyframes = [
    { transform: 'translateX(100%)' },
    { transform: 'none' },
  ];

  private _options: KeyframeAnimationOptions = {
    duration: 480,
    fill: 'both',
    easing: `${
      this._reducedMotion() ? 'steps(1)' : 'cubic-bezier(.3,.7,.8,1)'
    }`,
  };
  private animation!: Animation;

  firstUpdated() {
    this.animation = this.animate(this._keyframes, this._options);
    this.animation.pause();
    this.animation.currentTime = 0;
    this.animation.finished.then(() => {
      this.animation.pause();
    });
  }

  private _reducedMotion() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    return !mediaQuery || mediaQuery.matches;
  }

  public close() {
    this.dispatchEvent(new UUILayerEvent(UUILayerEvent.CLOSE, this));
    this.animation.playbackRate = -1;
    this.animation.finished.then(() => {
      if (this.animation.playbackRate === -1) {
        this.dispatchEvent(new UUILayerEvent(UUILayerEvent.CLOSED, this));
      }
    });
  }

  render() {
    return html` <slot></slot> `;
  }
}
