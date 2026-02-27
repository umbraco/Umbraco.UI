import { defineElement } from '../../internal/registration/index.js';
import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';

interface Fruit {
  name: string;
  value: string;
}

const data: Array<Fruit> = [
  { name: 'Apple', value: 'apple' },
  { name: 'Orange', value: 'orange' },
  { name: 'Banana', value: 'banana' },
  { name: 'Pear', value: 'pear' },
  { name: 'Grape', value: 'grape' },
  { name: 'Strawberry', value: 'strawberry' },
  { name: 'Watermelon', value: 'watermelon' },
  { name: 'Pineapple', value: 'pineapple' },
  { name: 'Coconut', value: 'coconut' },
  { name: 'Mango', value: 'mango' },
  { name: 'Papaya', value: 'papaya' },
  { name: 'Kiwi', value: 'kiwi' },
  { name: 'Avocado', value: 'avocado' },
  { name: 'Pomegranate', value: 'pomegranate' },
  { name: 'Cherry', value: 'cherry' },
  { name: 'Lemon', value: 'lemon' },
  { name: 'Lime', value: 'lime' },
];

async function getFruits() {
  return Promise.resolve(data);
}

@defineElement('uui-combobox-async-options-example')
export class UUIComboboxAsyncOptionsExampleElement extends LitElement {
  @state()
  _options: any[] = [];

  connectedCallback() {
    super.connectedCallback();
    this._fetchData();
  }

  private readonly _fetchData = async () => {
    const response = await getFruits();
    this._options = [...response];
  };

  @property()
  preselected = 'apple';

  render() {
    return html`
      <uui-combobox value=${this.preselected}>
        <uui-combobox-list>
          ${this._options.map(
            option =>
              html`<uui-combobox-list-option value="${option.value}"
                >${option.name}</uui-combobox-list-option
              >`,
          )}
        </uui-combobox-list>
      </uui-combobox>
    `;
  }
}
