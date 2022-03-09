import { LitElement, css, html } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property, state } from 'lit/decorators.js';
import { UUIIconRequestEvent } from './UUIIconRequestEvent';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

/**
 * @element uui-icon
 * @fires {UUIIconRequestEvent} icon_request - fires when the name property is defined to retrieve the icon source.
 * @description - Icon component for displaying icons.
 * @cssprop --uui-icon-color - overwrite the icon color.
 * @see UUIIconRegistryElement Ideally used together with a icon registry.
 */
@defineElement('uui-icon')
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
  private _retrievedNameIcon: boolean = false;

  @state()
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
    if (this.shadowRoot) {
      this.requestIcon();
    }
  }
  private requestIcon() {
    if (this._name !== '' && this._name !== null) {
      const event = new UUIIconRequestEvent(UUIIconRequestEvent.ICON_REQUEST, {
        detail: { iconName: this._name },
      });
      this.dispatchEvent(event);
      if (event.icon !== null) {
        this._retrievedNameIcon = true;
        event.icon.then((iconSvg: string) => {
          this._useFallback = false;
          this._nameSvg = iconSvg;
        });
      } else {
        this._retrievedNameIcon = false;
        this._useFallback = true;
      }
    }
  }

  /**
   * Define the raw SVG string to be displayed by this component.
   * @type {string}
   * @attr
   * @default null
   */
  @property({ attribute: false })
  public svg: string | null = null;

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
    if (this._retrievedNameIcon === false) {
      this.requestIcon();
    }
  }

  disconnectedCallback(): void {
    this._retrievedNameIcon = false;
  }

  firstUpdated() {
    // Registry might not have been created then this icon was connected, so therefor we will make another attempt to retrieve the icon.
    if (this._retrievedNameIcon === false) {
      this.requestIcon();
    }
  }

  render() {
    if (this._useFallback === true) {
      if (this.fallback === null) {
        return html`<slot name="fallback"></slot>`;
      } else {
        return unsafeHTML(this.fallback);
      }
    }

    if (this._nameSvg !== null) {
      return unsafeHTML(this._nameSvg);
    }

    if (this.svg !== null) {
      return unsafeHTML(this.svg);
    }

    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-icon': UUIIconElement;
  }
}
