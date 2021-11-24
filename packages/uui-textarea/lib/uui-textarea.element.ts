import { LitElement, html, css } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { LabelMixin } from '@umbraco-ui/uui-base/lib/mixins';
import { UUITextareaEvent } from './UUITextareaEvent';
import { ifDefined } from 'lit/directives/if-defined.js';
/**
 * @element uui-textarea
 * @extends LabelMixin(LitElement)
 * @slot textarea label - for the textarea label text.
 * @fires UUITextareaEvent#change on change
 * @fires InputEvent#input on input
 * @fires KeyboardEvent#keyup on keyup
 * @cssprop --uui-textarea-min-height - Sets the minimum height of the textarea
 * @cssprop --uui-textarea-max-height - Sets the maximum height of the textarea
 */
export class UUITextareaElement extends LabelMixin(
  'textarea label',
  LitElement
) {
  static styles = [
    css`
      :host([disabled]) .label,
      :host([disabled]) #max-length-counter {
        color: var(--uui-interface-contrast-disabled);
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
      #lengths-container {
        display: flex;
      }
      #min-length-counter {
        color: var(--uui-look-danger-surface);
        margin-right: 1em;
      }
      #max-length-counter {
        display: inline-block;
        width: min-content;
      }
      #max-length-counter.maxed {
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
   * Defines the min length of the textarea.
   * @type {number}
   * @attr
   * @default undefined
   */
  @property({ type: Number })
  minLength = 0;

  /**
   * Defines the max length of the textarea.
   * @type {number}
   * @attr
   * @default undefined
   */
  @property({ type: Number })
  maxLength = 0;

  /**
   * Enables automatic height adjustment. The height will be confined within the min and max height if defined.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, attribute: 'auto-height', reflect: true })
  autoHeight = false;

  private onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this.dispatchEvent(
      new UUITextareaEvent(UUITextareaEvent.INPUT, { bubbles: true })
    );

    if (this.autoHeight) {
      this.autoUpdateHeight();
    }
  }

  private onChange() {
    this.dispatchEvent(
      new UUITextareaEvent(UUITextareaEvent.CHANGE, { bubbles: true })
    );
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

  renderMaxLength() {
    return html`<span
      id="max-length-counter"
      class=${this.value.length >= this.maxLength! ? 'maxed' : ''}
      >${this.value ? this.value.length : 0}/${this.maxLength}</span
    >`;
  }

  renderMinLength() {
    const shouldRender = this.minLength - this.value.length > 0;
    return shouldRender
      ? html`<span id="min-length-counter">
          ${this.minLength - this.value.length}
        </span>`
      : '';
  }

  render() {
    return html`
      ${this.hideLabel === false ? this.renderLabel() : ''}
      <textarea
        maxlength=${ifDefined(this.maxLength > 0 ? this.maxLength : undefined)}
        minlength=${this.minLength}
        id="textarea"
        .value=${this.value}
        .name=${this.name}
        placeholder=${this.placeholder}
        aria-label=${this.label}
        .disabled=${this.disabled}
        @input=${this.onInput}
        @change=${this.onChange}>
      </textarea>
      <div id="lengths-container">
        ${this.minLength > 0 ? this.renderMinLength() : ''}
        ${this.maxLength > 0 ? this.renderMaxLength() : ''}
      </div>
    `;
  }
}
