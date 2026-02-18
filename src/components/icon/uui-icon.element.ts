import { LitElement, css, html } from 'lit';
import { defineElement } from '../../internal/registration/index.js';
import { property, state } from 'lit/decorators.js';
import { UUIIconRequestEvent } from './UUIIconRequestEvent';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

/**
 * @element uui-icon
 * @fires {UUIIconRequestEvent} icon_request - fires when the name property is defined to retrieve the icon source.
 * @description - Icon component for displaying icons.
 * @cssprop --uui-icon-color - sets the color for the icon, if not set it will use the text color.
 * @cssprop --uui-icon-color-overwrite - overwrite the icon color, once this is set the --uui-icon-color will be ignored.
 * @see UUIIconRegistryElement Ideally used together with a icon registry.
 */
@defineElement('uui-icon')
export class UUIIconElement extends LitElement {
  private _name: string | null = null;
  private _retrievedNameIcon: boolean = false;

  @state()
  private _nameSvg: string | null = null;

  /**
   * An alternate description to use for assistive devices.
   * If omitted, the icon will be considered presentational and ignored by assistive devices.
   * @type {string}
   * @attr
   * @default
   */
  @property() label = '';

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

    const hasLabel = typeof this.label === 'string' && this.label.length > 0;

    if (hasLabel) {
      this.setAttribute('role', 'img');
      this.setAttribute('aria-label', this.label);
      this.removeAttribute('aria-hidden');
    } else {
      this.removeAttribute('role');
      this.removeAttribute('aria-label');
      this.setAttribute('aria-hidden', 'true');
    }
  }

  render() {
    if (this._useFallback === true) {
      if (this.fallback === null) {
        return html`<slot name="fallback"></slot>`;
      } else {
        return html`${unsafeHTML(this.fallback)}`;
      }
    }

    if (this._nameSvg !== null) {
      return html`${unsafeHTML(this._nameSvg)}`;
    }

    if (this.svg !== null) {
      return html`${unsafeHTML(this.svg)}`;
    }

    return html`<slot></slot>`;
  }

  static styles = [
    css`
      :host {
        vertical-align: text-bottom;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.125em;
        height: 1.125em;
      }

      :host svg,
      ::slotted(svg) {
        color: var(
          --uui-icon-color-overwrite,
          var(--uui-icon-color, currentColor)
        );
        width: 100%;
      }

      :host-context(div[slot='prepend']) {
        margin-left: var(--uui-size-2, 6px);
      }

      :host-context(div[slot='append']) {
        margin-right: var(--uui-size-2, 6px);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-icon': UUIIconElement;
  }
}
