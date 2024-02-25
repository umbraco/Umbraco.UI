import { LitElement, html, css } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property, query } from 'lit/decorators.js';
import { UUITextareaEvent } from './UUITextareaEvent';
import { UUIFormControlMixin } from '@umbraco-ui/uui-base/lib/mixins';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * @element uui-textarea
 * @fires UUITextareaEvent#change on change
 * @fires InputEvent#input on input
 * @fires KeyboardEvent#keyup on keyup
 * @cssprop --uui-textarea-min-height - Sets the minimum height of the textarea
 * @cssprop --uui-textarea-max-height - Sets the maximum height of the textarea
 * @cssprop {color} --uui-textarea-background-color - Sets the background color of the textarea
 * @cssprop --uui-textarea-font-size - Overwrites the default font size
 * @extends UUIFormControlMixin
 */

@defineElement('uui-textarea')
export class UUITextareaElement extends UUIFormControlMixin(LitElement) {
  /**
   * This is a static class field indicating that the element is can be used inside a native form and participate in its events. It may require a polyfill, check support here https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals.  Read more about form controls here https://web.dev/more-capable-form-controls/
   * @type {boolean}
   */
  static readonly formAssociated = true;

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

  /**
   * Sets the input to readonly mode, meaning value cannot be changed but still able to read and select its content.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

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

  /**
   * This is a minimum value of the input.
   * @type {number}
   * @attr
   * @default undefined
   */
  @property({ type: Number })
  minlength?: number;

  /**
   * Minlength validation message.
   * @type {boolean}
   * @attr
   * @default
   */
  @property({ type: String, attribute: 'minlength-message' })
  minlengthMessage = 'This field need more characters';

  /**
   * This is a maximum value of the input.
   * @type {number}
   * @attr
   * @default undefined
   */
  @property({ type: Number })
  maxlength?: number;

  /**
   * Maxlength validation message.
   * @type {boolean}
   * @attr
   * @default
   */
  @property({ type: String, attribute: 'maxlength-message' })
  maxlengthMessage = 'This field exceeds the allowed amount of characters';

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
   * Sets the number of rows of the textarea
   * @type {number}
   * @attr
   */
  @property({ type: Number })
  rows?: number;

  /**
   * Sets the number of cols of the textarea
   * @type {number}
   * @attr
   */
  @property({ type: Number })
  cols?: number;

  /**
   * Indicates how the control should wrap the value for form submission. If this attribute is not specified, soft is its default value.
   * @type {'soft' | 'hard' | 'off'}
   * @attr
   * @default undefined
   */
  @property({ type: String })
  wrap?: 'soft' | 'hard' | 'off';

  constructor() {
    super();

    this.addEventListener('mousedown', () => {
      this.style.setProperty('--uui-show-focus-outline', '0');
    });
    this.addEventListener('blur', () => {
      this.style.setProperty('--uui-show-focus-outline', '');
    });

    this.addValidator(
      'tooShort',
      () => this.minlengthMessage,
      () => !!this.minlength && (this._value as string).length < this.minlength
    );
    this.addValidator(
      'tooLong',
      () => this.maxlengthMessage,
      () => !!this.maxlength && (this._value as string).length > this.maxlength
    );
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.label) {
      console.warn(this.tagName + ' needs a `label`', this);
    }

    if (this.autoHeight) {
      requestAnimationFrame(() => {
        this.autoUpdateHeight();
      });
    }
  }

  /**
   * This method enables <label for="..."> to focus the input
   */
  focus() {
    this._textarea?.focus();
  }

  protected getFormElement(): HTMLElement {
    return this._textarea;
  }

  private onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;

    if (this.autoHeight) {
      this.autoUpdateHeight();
    }

    // TODO: Do we miss an input event?
    //this.dispatchEvent(new UUITextareaEvent(UUITextareaEvent.INPUT));
  }

  private onChange(e: Event) {
    e.stopPropagation();
    this.pristine = false;
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

    // Note: Add + 2 because of the border top+bottom 1px each
    if (input.scrollHeight + 2 > input.clientHeight) {
      input.style.height = input.scrollHeight + 2 + 'px';
    } else if (input.scrollHeight + 2 < input.clientHeight) {
      input.style.removeProperty('height');
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
        rows=${ifDefined(this.rows)}
        cols=${ifDefined(this.cols)}
        .value=${this.value as string}
        .name=${this.name}
        wrap=${ifDefined(this.wrap)}
        placeholder=${this.placeholder}
        aria-label=${this.label}
        .disabled=${this.disabled}
        ?readonly=${this.readonly}
        @input=${this.onInput}
        @change=${this.onChange}>
      </textarea>
    `;
  }

  static styles = [
    css`
      :host {
        position: relative;
      }
      :host([error]) textarea {
        border: 1px solid var(--uui-color-danger) !important;
      }
      :host([error]) textarea[disabled] {
        border: 1px solid var(--uui-color-danger) !important;
      }
      :host([auto-height]) textarea {
        resize: none;
      }
      .label {
        display: inline-block;
        margin-bottom: var(--uui-size-1);
        font-weight: bold;
      }

      textarea[readonly] {
        border-color: var(
          --uui-textarea-border-color-readonly,
          var(--uui-color-disabled-standalone)
        );
        background-color: var(
          --uui-textarea-background-color-readonly,
          var(--uui-color-disabled)
        );
      }
      textarea[disabled] {
        cursor: not-allowed;
        background-color: var(
          --uui-textarea-background-color-disabled,
          var(--uui-color-disabled)
        );
        border-color: var(
          --uui-textarea-border-color-disabled,
          var(--uui-color-disabled)
        );

        color: var(--uui-color-disabled-contrast);
      }

      textarea {
        color: var(--uui-color-text);
        font-family: inherit;
        line-height: var(--uui-size-6);
        box-sizing: border-box;
        min-width: 100%;
        max-width: 100%;
        font-size: inherit;
        padding: var(--uui-size-2);
        border: 1px solid
          var(--uui-textarea-border-color, var(--uui-color-border)); /** Note: Specified border size is needed and hardcoded in autoUpdateHeight() */
        border-radius: 0;
        outline: none;
        min-height: var(--uui-textarea-min-height);
        max-height: var(--uui-textarea-max-height);
        background-color: var(
          --uui-textarea-background-color,
          var(--uui-color-surface)
        );
      }
      :host(:hover)
        textarea:not([readonly]):not([disabled])
        :host(:focus-within)
        textarea,
      :host(:focus) textarea {
        border-color: var(
          --uui-textarea-border-color,
          var(--uui-color-border-emphasis)
        );
      }

      textarea::placeholder {
        transition: opacity 120ms;
      }
      :host(:not([readonly])) textarea:focus::placeholder {
        opacity: 0;
      }

      textarea:focus {
        outline: calc(2px * var(--uui-show-focus-outline, 1)) solid
          var(--uui-color-focus);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-textarea': UUITextareaElement;
  }
}
