import { LitElement, css, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { UUIIconRequestEvent } from './UUIIconRequestEvent';

/**
 * @element uui-icon
 * @fires {UUIIconRequestEvent} icon_request - fires when the name property is defined to retrieve the icon source.
 * @description - Icon component for displaying icons.
 * @cssprop --uui-icon-color - overwrite the icon color.
 * @see UUIIconRegistryElement Ideally used together with a icon registry.
 */
export class UUIIconElement extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
        vertical-align: bottom;
        width: 1.15em;
        height: 1.15em;
      }

      :host svg,
      ::slotted(svg) {
        fill: var(--uui-icon-color, currentColor);
      }
    `,
  ];

  private _name: string | null = null;
  private _nameSvg: string | null = null;

  /**
   * Icon name is used to retrieve the icon from a parent Icon Registry.
   * If no Icon Registry responds to the given name, the fallback svg will be used.
   * @type {string}
   * @attr
   * @default null
   */
  @property()
  get name(): string | null {
    return this._name;
  }
  set name(newValue) {
    this._name = newValue;
    this.requestIcon();
  }
  private requestIcon() {
    if (this._name !== '' && this._name !== null) {
      const event = new UUIIconRequestEvent(UUIIconRequestEvent.ICON_REQUEST, {
        detail: { iconName: this._name },
      });
      this.dispatchEvent(event);
      if (event.icon !== null) {
        event.icon.then((iconSvg: string) => {
          this._useFallback = false;
          this._nameSvg = iconSvg;
          if (this.shadowRoot) {
            this.shadowRoot.innerHTML = iconSvg;
          }
        });
      } else {
        this._useFallback = true;
        if (this.fallback && this.shadowRoot) {
          this.shadowRoot.innerHTML = this.fallback;
        }
      }
    }
  }

  private _svg: string | null = null;

  /**
   * Define the raw SVG string to be displayed by this component.
   * @type {string}
   * @attr
   * @default null
   */
  @property({ attribute: false })
  get svg(): string | null {
    return null;
  }
  set svg(newValue: string | null) {
    this._svg = newValue;
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = newValue || '';
    }
  }

  /**
   * Fallback SVG is a raw SVG string, this is used then 'name' hasn't been accepted by any parent Icon Registry.
   * @type {string}
   * @attr
   * @default null
   */
  @property({ attribute: false })
  fallback: string | null = null;

  @state()
  private _useFallback = false;

  connectedCallback() {
    super.connectedCallback();
    if (this._name !== '' && this._name !== null) {
      if (this._nameSvg) {
        (this.shadowRoot as ShadowRoot).innerHTML = this._nameSvg;
      } else {
        this.requestIcon();
      }
    } else if (this._svg) {
      (this.shadowRoot as ShadowRoot).innerHTML = this._svg;
    }
  }

  disconnectedCallback(): void {
    this._nameSvg = null;
    (this.shadowRoot as ShadowRoot).innerHTML = '';
  }

  render() {
    return html`
      ${this._useFallback === false &&
      this._svg === null &&
      this._nameSvg === null
        ? html`<slot></slot>`
        : ''}
      ${this._useFallback === true && this.fallback === null
        ? html`<slot name="fallback"></slot>`
        : ''}
    `;
  }
}
