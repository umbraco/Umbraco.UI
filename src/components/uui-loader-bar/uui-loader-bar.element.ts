import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators';

export class UUILoaderBarElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        position: relative;
        height: 3px;
        overflow: hidden;
        border-radius: 6px;
        background-color: yellow;
      }

      .bar {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 100%;
      }

      #bar1 {
        background-color: pink;
        transform-origin: top left;
        transform: translateX(-150%);
        animation: bar1 2000ms 2s infinite linear;
      }

      #bar2 {
        background-color: lightseagreen;
      }

      @keyframes bar1 {
        0% {
          transform: translateX(-150%);
        }

        10% {
          transform: translateX(-150%);
          animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
        }

        50% {
          animation-timing-function: cubic-bezier(
            0.302435,
            0.381352,
            0.55,
            0.956352
          );
          transform: translateX(-61%);
        }

        100% {
          transform: translateX(100%);
        }
      }

      @keyframes primary-indeterminate-scale {
        0% {
          transform: scaleX(0.08);
        }

        36.65% {
          animation-timing-function: cubic-bezier(
            0.334731,
            0.12482,
            0.785844,
            1
          );
          transform: scaleX(0.08);
        }

        69.15% {
          animation-timing-function: cubic-bezier(0.06, 0.11, 0.6, 1);
          transform: scaleX(0.661479);
        }

        100% {
          transform: scaleX(0.08);
        }
      }

      @keyframes start {
        from {
          max-height: 0;
          opacity: 0;
        }
        to {
          max-height: 3px;
          opacity: 1;
        }
      }

      @keyframes end {
        from {
          max-height: 0;
          opacity: 0;
        }
        to {
          max-height: 3px;
          opacity: 1;
        }
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  indeterminate = true;

  render() {
    return html`
      <div class="bar" id="bar2"></div>
      <div class="bar" id="bar1"></div>
    `;
  }
}
