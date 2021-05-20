import { css, html, LitElement } from 'lit';

export class UUILoaderBarElement extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
      }

      .bar {
        position: absolute;
        left: 0;
        background-color: lightseagreen;
        width: 100%;
        height: 3px;
      }
    `,
  ];

  render() {
    return html` <div class="bar"></div>
      <div class="bar"></div>`;
  }
}
