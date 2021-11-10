import { LitElement, html, css } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { LabelMixin } from '@umbraco-ui/uui-base/lib/mixins';
import { UUITextareaEvent } from './UUITextareaEvent';
import { ifDefined } from 'lit/directives/if-defined.js';
/**
 * @element uui-textarea
 */
export class UUITextareaElement extends LabelMixin('input label', LitElement) {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
      }
      :host([disabled]) .label,
      :host([disabled]) #char-count {
        color: var(--uui-interface-contrast-disabled);
      }
      :host([error]) textarea {
        border: 1px solid var(--uui-look-danger-border) !important;
      }
      :host([error]) textarea[disabled] {
        border: 1px solid var(--uui-look-danger-border) !important;
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

      #textarea {
        min-width: 100%;
        max-width: 100%;
        border: 1px solid
          var(--uui-textarea-border-color, var(--uui-interface-border));
        border-radius: 0;
        resize: none;
      }
      #char-count {
        display: inline-block;
        width: min-content;
      }
      #char-count.maxed {
        animation-name: maxed;
        animation-duration: 0.1s;
        animation-direction: alternate;
        animation-iteration-count: 2;
      }
      @keyframes maxed {
        from {
          transform: scale(1);
        }
        to {
          transform: scale(1.1);
        }
      }
    `,
  ];

  /**
   * This is a static class field indicating that the element is can be used inside a native form and participate in its events. It may require a polyfill, check support here https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals.  Read more about form controls here https://web.dev/more-capable-form-controls/
   * @type {boolean}
   */
  static readonly formAssociated = true;

  private _internals;

  constructor() {
    super();
    this._internals = (this as any).attachInternals();
  }

  /**
   * Defines the input placeholder.
   * @type {string}
   * @attr
   * @default ''
   */
  @property()
  placeholder = '';

  /**
   * Disables the input.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Set to true to hide the labeling provided by the component.
   * @type {boolean}
   * @attr hide-label
   * @default false
   */
  @property({ type: Boolean, attribute: 'hide-label', reflect: true })
  hideLabel = false;

  @state()
  private _value = '';

  /**
   * This is a value property of the uui-input.
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
   * This is a name property of the `<uui-input>` component. It reflects the behaviour of the native `<input />` element and its name attribute.
   * @type {string}
   * @attr
   * @default ''
   */
  @property({ type: String })
  name = '';

  /**
   * Set to true if the component should have an error state.Property is reflected to the corresponding attribute.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  @query('#textarea')
  protected _textarea!: HTMLInputElement;

  /**
   * Defines the max length of the textarea.
   * @type {number}
   * @attr
   * @default undefined
   */
  @property({ type: Number })
  maxLength: number | undefined = undefined;

  /**
   * Enables automatic height adjustment. The height will be confined within the min and max height if defined.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, attribute: 'auto-height', reflect: true })
  autoHeight = false;

  /**
   * Defines the minimum height of the textarea.
   * @type {string}
   * @attr
   * @default ''
   */
  @property({ type: String })
  minHeight: String = '';

  /**
   * Defines the maximum height of the textarea.
   * @type {string}
   * @attr
   * @default ''
   */
  @property({ type: String })
  maxHeight: String = '';

  private onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;

    if (this.autoHeight) {
      this._textarea.rows = 0;
      this.autoUpdateHeight();
    }
  }

  private onChange() {
    this.dispatchEvent(
      new UUITextareaEvent(UUITextareaEvent.CHANGE, { bubbles: true })
    );
  }

  private autoUpdateHeight() {
    let computedStyles = getComputedStyle(this._textarea);
    let height = Number.parseFloat(computedStyles.height);
    let maxHeight = Number.parseFloat(computedStyles.maxHeight);
    let heightCheck = maxHeight ? height < maxHeight : true;

    if (this.checkOverflow(this._textarea) && heightCheck) {
      this._textarea.rows = this._textarea.rows + 1;

      computedStyles = getComputedStyle(this._textarea);
      height = Number.parseFloat(computedStyles.height);
      maxHeight = Number.parseFloat(computedStyles.maxHeight);
      heightCheck = maxHeight ? height < maxHeight : true;

      if (this.checkOverflow(this._textarea) && heightCheck) {
        this.autoUpdateHeight();
      }
    }
  }

  private checkOverflow(el: HTMLElement) {
    const curOverflow = el.style.overflow;

    if (!curOverflow || curOverflow === 'visible') el.style.overflow = 'hidden';

    const isOverflowing =
      el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;

    el.style.overflow = curOverflow;

    return isOverflowing;
  }

  getMaxLengthClasses() {
    if (this.maxLength && this.value) {
      return this.value.length >= this.maxLength ? 'maxed' : '';
    }
    return '';
  }

  renderMaxLength() {
    return html`<span id="char-count" class=${this.getMaxLengthClasses()}
      >${this.value ? this.value.length : 0}/${this.maxLength}</span
    >`;
  }

  render() {
    return html`
      ${this.hideLabel === false ? this.renderLabel() : ''}
      <textarea
        maxlength=${ifDefined(this.maxLength)}
        style="min-height: ${this.minHeight}; max-height: ${this.maxHeight}"
        id="textarea"
        .value=${this.value}
        .name=${this.name}
        placeholder=${this.placeholder}
        aria-label=${this.label}
        .disabled=${this.disabled}
        @input=${this.onInput}
        @change=${this.onChange}>
      </textarea>
      ${this.maxLength ? this.renderMaxLength() : ''}
    `;
  }
}
