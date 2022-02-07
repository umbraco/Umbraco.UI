import { css, html, LitElement } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property, state } from 'lit/decorators.js';
import { UUISelectEvent } from './UUISelectEvent';

// TODO: Dont set a global interface, we should expose a 'local' interface.
declare global {
  interface Option {
    name: string;
    value: string;
    group?: string;
    selected?: boolean;
    disabled?: boolean;
  }
}

/**
 * Custom element wrapping the native select element. Pass an array of options to it.
 * This is a formAssociated element, meaning it can participate in a native HTMLForm. A name:value pair will be submitted.
 * @element uui-select
 * @fires change - when the user changes value
 */
// TODO: Implement FormControlMixin
// TODO: Consider if this should use child items instead of an array.
@defineElement('uui-select')
export class UUISelectElement extends LitElement {
  static styles = [
    css`
      :host {
        position: relative;
        font-family: inherit;
      }

      #native {
        display: inline-block;
        font-family: inherit;
        font-size: var(--uui-select-font-size, var(--uui-size-5));
        height: var(--uui-select-height, var(--uui-size-11));
        width: 100%;
        padding: var(--uui-select-padding-y, var(--uui-size-1))
          var(--uui-select-padding-x, var(--uui-size-2));
        color: currentColor;
        border-radius: 0;
        box-sizing: border-box;
        background-color: transparent;
        border: 1px solid
          var(--uui-select-border-color, var(--uui-interface-border));
        transition: all 150ms ease;
      }

      #native:focus {
        outline: calc(2px * var(--uui-show-focus-outline, 1)) solid
          var(--uui-interface-outline);
      }

      #native[disabled] {
        cursor: not-allowed;
        background-color: var(
          --uui-select-disabled-background-color,
          var(--uui-interface-surface-disabled)
        );
      }

      #native:hover {
        border: 1px solid
          var(
            --uui-select-border-color-hover,
            var(--uui-interface-border-hover)
          );
      }

      option:checked {
        background: var(
          --uui-select-selected-option-background-color,
          var(--uui-interface-active)
        );
      }

      /* TODO: a proper focus style has to be implemented. it needs it's own variables */
      #native:focus {
        outline-color: var(--uui-select-outline-color, var(--uui-color-malibu));
      }

      #caret {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
      }

      :host([error]) #native {
        border: 1px solid var(--uui-look-danger-border);
      }

      :host([error]) #native[disabled] {
        border: 1px solid var(--uui-look-danger-border);
      }
    `,
  ];

  /**
   * Text with which component should be labeled
   * @type {string}
   * @attr
   */
  @property({ type: String })
  public label!: string;

  /**
   * Defines the select's placeholder.
   * @type {string}
   * @attr
   */
  @property()
  placeholder = '';

  /**
   * Disables the select.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Set to true if the component should have an error state.Property is reflected to the corresponding attribute.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  /**
   * This is the name property of the uui-checkbox or the uui-toggle component. It reflects the behaviour of the native input type="checkbox" element and its name attribute.
   * @type {string}
   * @attr
   */
  @property({ type: String })
  name = '';

  private _value = '';
  /**
   * This is a value property of the uui-checkbox or the uui-toggle component. The default value of this property is 'on'. It reflects the behaviour of the native input type="checkbox" element and its value attribute.
   * @type {string}
   * @attr
   * @default on
   */
  @property({ type: String })
  get value() {
    return this._value;
  }

  set value(newVal) {
    const oldValue = this._value;
    this._value = newVal;
    this._internals.setFormValue(this.name !== '' ? this._value : null);
    this.requestUpdate('value', oldValue);
  }

  /**
   * An array of options to be rendered by the element. If you want the element The option interface has up to 5 properties:
   * `interface Option {
    name: string;
    value: string;
    group?: string;
    selected?: boolean;
    disabled?: boolean;
  }`
   */
  @property({ type: Array, attribute: false })
  options: Option[] = [];

  @state()
  private _groups: string[] = [];

  /**
   * An array of options to be rendered by the element. Put the names of the groups you wanna disable, separated by a coma: `disabledGroups='fruits, vegetables'`. It's not case sensitive
   */
  @property()
  disabledGroups = '';

  @state()
  private _disabledGroups: string[] = [];

  /**
   * This is a static class field indicating that the element is can be used inside a native form and participate in its events. It may require a polyfill, check support here https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals.  Read more about form controls here https://web.dev/more-capable-form-controls/
   * @type {boolean}
   */
  static readonly formAssociated = true;
  readonly _internals;

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

  /**
   * This method enables <label for="..."> to focus the select
   */
  focus() {
    (this.shadowRoot?.querySelector('#native') as any).focus();
  }
  /**
   * This method enables <label for="..."> to open the select
   */
  click() {
    (this.shadowRoot?.querySelector('#native') as any).click();
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.label) {
      console.warn(this.tagName + ' needs a `label`', this);
    }
  }

  private _createDisabledGroups() {
    if (this.disabledGroups.length === 0) return;
    this._disabledGroups = this.disabledGroups.split(',');
  }

  private _extractGroups() {
    if (this.options.length === 0) return;

    this._groups = [
      ...new Set(
        this.options
          .filter(option => option.group)
          .map(option => option.group as string)
      ),
    ];
  }

  willUpdate(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('options')) this._extractGroups();
    if (changedProperties.has('disabledGroups')) this._createDisabledGroups();
  }

  protected setValue(e: Event) {
    const target = e.target as HTMLSelectElement;
    if (e.target) this.value = target.value;
    this.dispatchEvent(
      new UUISelectEvent(UUISelectEvent.CHANGE, {
        bubbles: true,
        composed: false,
      })
    );
  }

  private _renderOption(
    name: string,
    value: string,
    selected: boolean | undefined,
    disabled: boolean | undefined
  ) {
    return html`<option
      value="${value}"
      ?selected=${selected}
      ?disabled=${disabled}>
      ${name}
    </option>`;
  }

  private _renderGrouped() {
    if (this._groups.length === 0) return html``;

    return html`
      ${this._groups.map(
        group => html`<optgroup
          label=${group}
          ?disabled=${this._disabledGroups.some(
            disabled => disabled.toLowerCase() === group.toLowerCase()
          )}>
          ${this.options.map(option =>
            option.group === group
              ? this._renderOption(
                  option.name,
                  option.value,
                  option.selected,
                  option.disabled
                )
              : ''
          )}
        </optgroup>`
      )}
    `;
  }

  render() {
    return html` <select
      id="native"
      aria-label=${this.label}
      @change=${this.setValue}
      ?disabled=${this.disabled}
      .name=${this.name}>
      <option disabled selected value="" hidden>${this.placeholder}</option>
      ${this._renderGrouped()}
      ${this.options
        .filter(option => !option.group)
        .map(option =>
          this._renderOption(
            option.name,
            option.value,
            option.selected,
            option.disabled
          )
        )}
    </select>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-select': UUISelectElement;
  }
}
