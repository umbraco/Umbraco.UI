import { defineElement } from '../../internal/registration';
import { css, html, LitElement, nothing } from 'lit';
import { state } from 'lit/decorators.js';

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

@defineElement('uui-combobox-async-example')
export class UUIComboboxAsyncExampleElement extends LitElement {
  @state()
  _options: any[] = [];

  @state()
  _loading: boolean = false;

  @state()
  _filterValue: string = '';

  private _fetchData = async (searchParam: string): Promise<Array<Fruit>> => {
    this._loading = true;
    return await new Promise(res =>
      setTimeout(() => {
        const filteredData =
          searchParam === ''
            ? []
            : data.filter(item =>
                item.name.toLowerCase().includes(searchParam.toLowerCase()),
              );
        res(filteredData);
        this._loading = false;
      }, 500),
    );
  };

  private _handleSearch = async (e: any) => {
    this._filterValue = e.target.search;
    const response = await this._fetchData(this._filterValue);
    this._options = [...response];
  };

  render() {
    return html`
      <uui-combobox @search="${this._handleSearch}">
        ${this._loading ? html`<uui-loader id="loader"></uui-loader>` : nothing}
        ${this._filterValue === '' && this._loading === false
          ? html`<div class="help">Search for a fruit...</div>`
          : ''}
        ${this._filterValue !== '' &&
        this._options.length === 0 &&
        this._loading === false
          ? html`<div class="help">No fruits matched</div>`
          : ''}

        <uui-combobox-list>
          ${this._options.map(
            option =>
              html`<uui-combobox-list-option value="${option.value}"
                >${option.name}</uui-combobox-list-option
              >`,
          )}
        </uui-combobox-list>
      </uui-combobox>

      <div style="margin-top: var(--uui-size-4)">
        <strong>Data:</strong> ${data.map(
          fruit => html`<div>${fruit.name}</div>`,
        )}
      </div>
    `;
  }

  static styles = [
    css`
      #loader {
        position: absolute;
      }

      .help {
        padding: var(--uui-size-4);
      }
    `,
  ];
}
