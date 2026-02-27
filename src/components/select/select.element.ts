import { UUIFormControlMixin } from '../../internal/mixins/index.js';
import { css, html, LitElement, nothing } from 'lit';
import { property, query, state } from 'lit/decorators.js';

import { UUISelectEvent } from './UUISelectEvent.js';

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
 * @cssprop --uui-select-height - Height of the element
 * @cssprop --uui-select-font-size - Font size of the element
 * @cssprop --uui-select-text-color - Color of the text
 * @cssprop --uui-select-padding-y - Padding on the y axis
 * @cssprop --uui-select-padding-x - Padding on the x axis
 * @cssprop --uui-select-border-color - Border color
 * @cssprop --uui-select-border-color-hover - Border color on hover
 * @cssprop --uui-select-selected-option-background-color - Background color of the selected option
 * @cssprop --uui-select-selected-option-color - Color of the selected option
 * @cssprop --uui-select-outline-color - Outline color
 * @cssprop --uui-select-background-color - Background color
 * @cssprop --uui-select-disabled-background-color - Background color when disabled
 * @extends UUIFormControlMixin
 */
// TODO: Consider if this should use child items instead of an array.
export class UUISelectElement extends UUIFormControlMixin(LitElement, '') {
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
   * Sets the input to readonly mode, meaning value cannot be changed but still able to read and select its content.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Set to true if the component should have an error state.Property is reflected to the corresponding attribute.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  error = false;

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

  private _values: string[] = [];

  @query('#native')
  protected readonly _input!: HTMLSelectElement;

  constructor() {
    super();
  }

  /**
   * This method enables <label for="..."> to focus the select
   */
  async focus() {
    await this.updateComplete;
    this._input.focus();
  }
  async blur() {
    await this.updateComplete;
    this._input.blur();
  }
  /**
   * This method enables <label for="..."> to open the select
   */
  async click() {
    await this.updateComplete;
    this._input.click();
  }

  protected getFormElement(): HTMLElement {
    return this._input;
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

    this._groups = Array.from(
      new Set(
        this.options
          .filter(option => option.group)
          .map(option => option.group as string),
      ),
    );
  }

  willUpdate(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('options')) {
      this._extractGroups();
      this._values = this.options.map(option => option.value);
      const selected = this.options.find(option => option.selected);
      this.value = selected ? selected.value : '';
    }

    if (changedProperties.has('value')) {
      this.value = this._values.includes(this.value as string)
        ? this.value
        : '';
    }
    if (changedProperties.has('disabledGroups')) this._createDisabledGroups();
  }

  protected setValue(e: Event) {
    e.stopPropagation();
    const target = e.target as HTMLSelectElement;
    if (e.target) this.value = target.value;
    this.dispatchEvent(
      new UUISelectEvent(UUISelectEvent.CHANGE, {
        bubbles: true,
        composed: false,
      }),
    );
  }

  private _renderOption(
    name: string,
    value: string,
    selected: boolean | undefined,
    disabled: boolean | undefined,
  ) {
    return html`<option
      value="${value}"
      ?selected=${selected}
      ?disabled=${disabled}>
      ${name}
    </option>`;
  }

  private _renderGrouped() {
    if (this._groups.length === 0) return nothing;

    return html`
      ${this._groups.map(
        group =>
          html`<optgroup
            label=${group}
            ?disabled=${this._disabledGroups.some(
              disabled => disabled.toLowerCase() === group.toLowerCase(),
            )}>
            ${this.options.map(option =>
              option.group === group
                ? this._renderOption(
                    option.name,
                    option.value,
                    option.selected,
                    option.disabled,
                  )
                : '',
            )}
          </optgroup>`,
      )}
    `;
  }

  private _getDisplayValue() {
    return (
      this.options.find(option => option.value === this.value)?.name ||
      this.value
    );
  }

  render() {
    if (this.readonly) return html`<span>${this._getDisplayValue()}</span>`;

    return html` <select
      id="native"
      aria-label=${this.label}
      @change=${this.setValue}
      ?disabled=${this.disabled}
      .name=${this.name}
      .value=${this.value as string}>
      <option disabled selected value="" hidden>${this.placeholder}</option>
      ${this._renderGrouped()}
      ${this.options
        .filter(option => !option.group)
        .map(option =>
          this._renderOption(
            option.name,
            option.value,
            option.selected,
            option.disabled,
          ),
        )}
    </select>`;
  }

  static override readonly styles = [
    css`
      :host {
        display: inline-block;
        position: relative;
        font-family: inherit;
      }

      #native {
        display: inline-block;
        font-family: inherit;
        font-size: var(--uui-select-font-size, inherit);
        height: var(--uui-select-height, var(--uui-size-11));
        padding: var(--uui-select-padding-y, var(--uui-size-1))
          var(--uui-select-padding-x, var(--uui-size-2));
        color: var(--uui-select-text-color, var(--uui-color-text));
        box-sizing: border-box;
        border-radius: var(--uui-border-radius);
        border: 1px solid
          var(--uui-select-border-color, var(--uui-color-border));
        transition: all 150ms ease;
        width: 100%;
        background-color: var(
          --uui-select-background-color,
          var(--uui-color-surface)
        );
      }

      #native:focus-visible {
        outline: 2px solid
          var(--uui-select-outline-color, var(--uui-color-focus));
      }

      #native[disabled] {
        cursor: not-allowed;
        background-color: var(
          --uui-select-disabled-background-color,
          var(--uui-color-disabled)
        );
      }

      #native:hover {
        border: 1px solid
          var(--uui-select-border-color-hover, var(--uui-color-border-emphasis));
      }

      option:checked {
        background: var(
          --uui-select-selected-option-background-color,
          var(--uui-color-selected)
        );
        color: var(
          --uui-select-selected-option-color,
          var(--uui-color-selected-contrast)
        );
      }

      #caret {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
      }

      :host([error]) #native {
        border: 1px solid var(--uui-color-invalid-standalone);
      }

      :host([error]) #native[disabled] {
        border: 1px solid var(--uui-color-invalid-standalone);
      }
    `,
  ];
}
