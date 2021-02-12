import { LitElement, html, css, property, query } from 'lit-element';
import { UUISelectListItemElement } from '../uui-select-list-item/uui-select-list-item.element';
import { UUIEvent } from '../../../event/UUIEvent';
/**
 *  @element uui-list
 *  @slot  for list items
 *
 */

// TODO reneame this top uui-select-list, add roles
// keyboard [v]
// multiple [x]
// dispatch event with selected elements indexes values?
// maybe add subheader element and divider?
// two line list items?
export class UUISelectListElement extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }

      :host([non-interactive]) ::slotted(*) {
        pointer-events: none;
      }
    `,
  ];

  @query('slot') protected slotElement!: HTMLSlotElement;

  //returns an Array of ListElements if they're in the slot or empty array
  protected get listElements(): UUISelectListItemElement[] {
    return this.slotElement
      ? (this.slotElement
          .assignedElements({ flatten: true })
          .filter(
            el => el instanceof UUISelectListItemElement
          ) as UUISelectListItemElement[])
      : [];
  }

  @property({ type: Boolean, reflect: true, attribute: 'non-interactive' })
  nonInteractive = false;

  firstUpdated() {
    if (this.listElements.length > 0)
      this.listElements[0].setAttribute('tabindex', '0');
  }

  constructor() {
    super();
    this.addEventListener('click', this._handleSelectOnClick);
    //this.addEventListener('keydown', this._onKeydown);
  }

  private _value: FormDataEntryValue = '';
  @property()
  get value() {
    return this._value;
  }
  set value(newValue) {
    const oldVal = this._value;
    this._value = newValue;
    this.requestUpdate('value', oldVal);
    this.dispatchEvent(this._changeValue);
  }

  private _changeValue = new UUIEvent('value-change');

  private _selected: number | null = null;
  @property({ type: Number, reflect: true })
  get selected() {
    return this._selected;
  }

  set selected(newVal) {
    const oldVal = this._selected;
    this._selected = newVal;
    //this._selectSingleElement(newVal);
    this.value = newVal ? this.listElements[newVal].value : '';
    this.requestUpdate('selected', oldVal);
  }

  private _handleSelectOnClick(e: Event) {
    const radios = this.listElements;
    let selectedElement: UUISelectListItemElement;

    radios.forEach(el => {
      if (el === e.target) {
        selectedElement = el;
        this.selected = radios.indexOf(el);
        this.value = selectedElement.value;
      }
    });

    const filtered = radios.filter(el => el !== selectedElement);

    filtered.forEach(el => {
      el.selected = false;
    });
  }

  render() {
    return html` <slot></slot> `;
  }
}

//can someone explain to me why this works?
// declare global {
//   interface GlobalEventHandlersEventMap {
//     'list-item-select': CustomEvent<UUIListItemClickEvent>;
//   }
// }
