import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map';

/**
 *  @element uui-loader-bar
 * @description - Linear loader for indicating loading.
 */

// TODO try changing brightness hack to opacity
export class UUILoaderBarElement extends LitElement {
  static styles = [
    css`
      :host([hidden]) {
        transform: scaleY(0);
      }

      #bar-anim {
        animation: bar-loading 1s infinite linear;
        background: linear-gradient(
          -90deg,
          #ffffff45 0%,
          white 25%,
          transparent 100%
        );
      }

      .animate #bar-anim {
        background: linear-gradient(
          -90deg,
          currentColor 0%,
          currentColor 25%,
          transparent 100%
        );
      }

      .animate #bar {
        display: none;
      }

      #bar-container {
        width: 100%;
        height: 10px;
        position: relative;
        overflow: hidden;
      }

      #bar {
        transition: max-width 250ms ease;
      }

      #bar-background,
      #bar {
        background: currentColor;
      }

      #bar,
      #bar-anim,
      #bar-background {
        position: absolute;
        inset: 0; /* top, left, bottom and right = 0*/
        height: 100%;
      }

      #bar-background {
        opacity: 0.3;
      }

      @keyframes bar-loading {
        0% {
          transform: scaleX(0.4);
          transform-origin: -175% 0%;
        }

        100% {
          transform-origin: 175% 0%;
          transform: scaleX(0.4);
        }
      }
    `,
  ];

  @property({ type: Number })
  progress = 0;

  @property({ type: Number })
  animationDuration = 1;

  @property({ type: Boolean, reflect: true })
  hidden = false;

  private getProgressStyle() {
    return { maxWidth: `${this.progress}%` };
  }

  render() {
    return html`
      <div id="bar-container" class=${this.progress ? '' : 'animate'}>
        <div
          id="bar"
          style=${this.progress ? styleMap(this.getProgressStyle()) : ''}
        ></div>
        <div
          id="bar-anim"
          style="animation-duration: ${this.animationDuration}s"
        ></div>
        <div id="bar-background"></div>
      </div>
    `;
  }
}
