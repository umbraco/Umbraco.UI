import { LitElement, html, css } from 'lit';
import { query } from 'lit/decorators.js';

/**
 *  @element uui-design
 *  @description - Showing how to make spacing and typography come together.
 */
export class UUIDesignMeasurementElement extends LitElement {
  static styles = [
    css`
      :host {
        position: absolute;
        height: 11px;
        width: 11px;

        display: flex;
        justify-content: center;
        align-items: center;

        opacity: 0.25;
        transition: opacity 80ms;
      }
      :host(:hover) {
        opacity: 1;
      }
      .line {
        position: absolute;
        background-color: currentColor;
        width: 1px;
        height: 1px;
      }
      .marker {
        position: absolute;
        background-color: currentColor;
        width: 1px;
        height: 1px;
      }
      .marker.start {
        top: 0;
        left: 0;
      }
      .length {
        display: none;
        background-color: var(--uui-interface-surface);
        padding: 0;
        font-size: 9px;
        z-index: 1;
        line-height: 2em;
      }

      :host([horizontal]) {
        width: 100%;
      }
      :host([horizontal]) .marker {
        height: 100%;
      }
      :host([horizontal]) .marker.stop {
        right: 0;
      }
      :host([horizontal]) .line {
        top: 5px;
        width: 100%;
      }
      :host([horizontal]) #width {
        display: block;
        padding: 0 6px;
      }

      :host([vertical]) {
        height: 100%;
      }
      :host([vertical]) .marker {
        width: 100%;
      }
      :host([vertical]) .marker.stop {
        bottom: 0;
      }
      :host([vertical]) .line {
        left: 5px;
        height: 100%;
      }
      :host([vertical]) #height {
        display: block;
        width: 10px; /* simple way to let text flow over right side */
      }
    `,
  ];

  @query('#width')
  protected widthDisplay!: HTMLElement;

  @query('#height')
  protected heightDisplay!: HTMLElement;

  firstUpdated() {
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  disconnectedCallback() {
    console.log('disconnect');
    window.removeEventListener('resize', this.resize);
  }

  private resize = () => {
    const size = this.getBoundingClientRect();
    this.widthDisplay.innerHTML = size.width + 'px';
    this.heightDisplay.innerHTML = size.height + 'px';
  };

  render() {
    return html`
      <div class="line"></div>
      <div class="marker start"></div>
      <div class="marker stop"></div>
      <div class="length" id="width"></div>
      <div class="length" id="height"></div>
    `;
  }
}
