import {
  LitElement,
  html,
  css,
  property,
  query,
  internalProperty,
} from 'lit-element';
import { UUIRadioElement } from '../uui-radio/uui-radio.element';
/**
 *  @element uui-radio-group
 *
 */

//TODO required
//TODO disabled
//TODO focused style
//TODO keyboard nav and focus
//TODO porogramatically change the value
//? what types should we allow as a value of that?

const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;

export class UUIRadioGroup extends LitElement {
  static styles = [css``];

  static formAssociated = true;

  private _internals;

  constructor() {
    super();
    this._internals = (this as any).attachInternals();
    this.addEventListener('change', this._handleSelect);
    this.addEventListener('keydown', this._onKeydown);
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'radiogroup');
  }

  firstUpdated() {
    this.radioElements[0].setAttribute('tabindex', '0');
  }

  @query('slot') protected slotElement!: HTMLSlotElement;

  private _value: string | null = null;

  @property()
  get value() {
    return this._value;
  }
  set value(newValue) {
    this._value = newValue;
    this._internals.setFormValue(this._value);
  }

  protected get radioElements(): UUIRadioElement[] {
    return this.slotElement
      ? (this.slotElement
          .assignedElements({ flatten: true })
          .filter(el => el instanceof UUIRadioElement) as UUIRadioElement[])
      : [];
  }

  private _onKeydown(e: KeyboardEvent) {
    switch (e.keyCode) {
      case ARROW_LEFT:
      case ARROW_UP: {
        e.preventDefault();
        if (this.selected === 0) {
          this.selected = this.radioElements.length - 1;
        } else if (this.selected !== null) {
          this.selected--;
        } else this.selected = 0;
        break;
      }
      case ARROW_RIGHT:
      case ARROW_DOWN: {
        e.preventDefault();
        if (this.selected === this.radioElements.length - 1) {
          this.selected = 0;
        } else if (this.selected !== null) {
          this.selected++;
        } else this.selected = 0;
        break;
      }
    }

    console.log(this.selected);
  }

  private _selected: number | null = null;

  @property({ reflect: true })
  get selected() {
    return this._selected;
  }

  set selected(newVal) {
    const oldVal = this._selected;
    this._selected = newVal;
    if (this._selected !== null) {
      this.radioElements[this._selected].check();

      this.radioElements
        .filter(el => this.radioElements.indexOf(el) !== this._selected)
        .forEach(el => el.uncheck());
    }

    if (this._selected === null) {
      this.radioElements[0].setAttribute('tabindex', '0');
      this.radioElements.forEach(el => el.uncheck());
    }
    this.requestUpdate('selected', oldVal);
  }

  //how to abstract this method so it's reusable?
  private _handleSelect(e: Event) {
    const radios = this.radioElements;
    let selectedElement: UUIRadioElement;

    radios.forEach(el => {
      if (el === e.target) {
        selectedElement = el;
        this.selected = radios.indexOf(el);
        this._value = selectedElement.value;
      }
    });

    const filtered = radios.filter(el => el !== selectedElement);

    filtered.forEach(el => {
      el.uncheck();
    });
  }

  render() {
    return html` <slot></slot> `;
  }
}
