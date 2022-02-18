import { LitElement, html, css } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property, state, query } from 'lit/decorators.js';
import { UUITextareaEvent } from './UUITextareaEvent';
/**
 * @element uui-textarea
 * @fires UUITextareaEvent#change on change
 * @fires InputEvent#input on input
 * @fires KeyboardEvent#keyup on keyup
 * @cssprop --uui-textarea-min-height - Sets the minimum height of the textarea
 * @cssprop --uui-textarea-max-height - Sets the maximum height of the textarea
 */
// TODO: Implement FormControlMixin
@defineElement('uui-textarea')
export class UUITextareaElement extends LitElement {
  static styles = [
    css`
      :host {
        position: relative;
      }
      :host([error]) textarea {
        border: 1px solid var(--uui-look-danger-border) !important;
      }
      :host([error]) textarea[disabled] {
        border: 1px solid var(--uui-look-danger-border) !important;
      }
      :host([auto-height]) textarea {
        resize: none;
      }
      .label {
        display: inline-block;
        margin-bottom: var(--uui-size-1);
        font-weight: bold;
      }
      textarea[disabled] {
        cursor: not-allowed;
        background-color: var(
          --uui-textarea-background-color-disabled,
          var(--uui-interface-surface-disabled)
        );
        border: 1px solid
          var(
            --uui-textarea-border-color-disabled,
            var(--uui-interface-border-disable)
          );

        color: var(--uui-interface-contrast-disabled);
      }
      textarea {
        font-family: inherit;
        box-sizing: border-box;
        min-width: 100%;
        max-width: 100%;
        font-size: var(--uui-size-5);
        padding: var(--uui-size-2);
        border: 1px solid
          var(--uui-textarea-border-color, var(--uui-interface-border));
        border-radius: 0;
        outline: none;
        min-height: var(--uui-textarea-min-height);
        max-height: var(--uui-textarea-max-height);
      }
      :host(:hover) textarea,
      :host(:focus-within) textarea,
      :host(:focus) textarea {
        border-color: var(
          --uui-textarea-border-color,
          var(--uui-interface-border-focus)
        );
      }

      textarea:focus {
        outline: calc(2px * var(--uui-show-focus-outline, 1)) solid
          var(--uui-interface-outline);
      }
    `,
  ];

  /**
   * Defines the textarea placeholder.
   * @type {string}
   * @attr
   * @default ''
   */
  @property()
  placeholder = '';

  /**
   * Disables the textarea.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  @state()
  private _value = '';

  /**
   * This is a value property of the uui-textarea.
   * @type {string}
   * @attr
   * @default ''
   */
  @property()
  get value() {
    return this._value;
  }
  set value(newValue) {
    this._value = newValue;

    if (
      'ElementInternals' in window &&
      //@ts-ignore
      'setFormValue' in window.ElementInternals.prototype
    ) {
      this._internals.setFormValue(this._value);
    }
  }

  /**
   * This is a name property of the `<uui-textarea>` component. It reflects the behaviour of the native `<textarea>` element and its name attribute.
   * @type {string}
   * @attr
   * @default ''
   */
  @property({ type: String })
  name = '';

  /**
   * Set to true if the component should have an error state. Property is reflected to the corresponding attribute.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  @query('#textarea')
  protected _textarea!: HTMLInputElement;

  /**
   * Enables automatic height adjustment. The height will be confined within the min and max height if defined.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, attribute: 'auto-height', reflect: true })
  autoHeight = false;

  /**
   * Label to be used for aria-label and eventually as visual label
   * @type {string}
   * @attr
   */
  @property({ type: String })
  public label!: string;

  /**
   * This is a static class field indicating that the element is can be used inside a native form and participate in its events. It may require a polyfill, check support here https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals.  Read more about form controls here https://web.dev/more-capable-form-controls/
   * @type {boolean}
   */
  static readonly formAssociated = true;

  private _internals;

  constructor() {
    super();
    this._internals = (this as any).attachInternals();

    this.addEventListener('mousedown', () => {
      this.style.setProperty('--uui-show-focus-outline', '0');
    });
    this.addEventListener('blur', () => {
      this.style.setProperty('--uui-show-focus-outline', '');
    });
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.label) {
      console.warn(this.tagName + ' needs a `label`', this);
    }
  }

  /**
   * This method enables <label for="..."> to focus the input
   */
  focus() {
    this._textarea?.focus();
  }

  private onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;

    if (this.autoHeight) {
      this.autoUpdateHeight();
    }

    this.dispatchEvent(new UUITextareaEvent(UUITextareaEvent.INPUT));
  }

  private onChange() {
    this.dispatchEvent(new UUITextareaEvent(UUITextareaEvent.CHANGE));
  }

  private autoUpdateHeight() {
    const host = this.shadowRoot!.host! as HTMLElement;
    const input = this._textarea;

    // Temporarily lock the height of the shadowroot host to prevent
    // the page scroll from moving when changing the textarea height
    const scrollTop = host.scrollTop;
    const hostHeight = getComputedStyle(host).height;
    host.style.display = 'block';
    host.style.height = hostHeight;

    input.style.height = 'auto';

    if (input.scrollHeight > input.clientHeight) {
      input.style.height = input.scrollHeight + 'px';
    }

    // Reset host styles and scroll to where we were
    host.style.removeProperty('display');
    host.style.removeProperty('height');
    host.scrollTop = scrollTop;
  }

  render() {
    return html`
      <textarea
        id="textarea"
        .value=${this.value}
        .name=${this.name}
        placeholder=${this.placeholder}
        aria-label=${this.label}
        .disabled=${this.disabled}
        @input=${this.onInput}
        @change=${this.onChange}>
      </textarea>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-textarea': UUITextareaElement;
  }
}
