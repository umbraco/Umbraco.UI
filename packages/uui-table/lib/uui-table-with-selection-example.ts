import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@umbraco-ui/uui-table/lib/index';
import '@umbraco-ui/uui-box/lib/index';
import '@umbraco-ui/uui-tag/lib/index';
import '@umbraco-ui/uui-avatar/lib/index';
import '@umbraco-ui/uui-button/lib/index';
import '@umbraco-ui/uui-progress-bar/lib/index';
import '@umbraco-ui/uui-icon/lib/index';
import { LocalTypography } from '@umbraco-ui/uui-css/lib/local-typography.styles';

interface TableColumn {
  name: string;
  sort: Function;
}

interface TableItem {
  key: string;
  name: string;
  progress: number;
  signUpDate: string;
  email: string;
  newsletter: boolean;
}

@customElement('uui-table-with-selection-example')
export class UUITableWithSelectionExampleElement extends LitElement {
  static styles = [
    LocalTypography,
    css`
      uui-table-row uui-checkbox {
        display: none;
      }

      uui-table-row:hover uui-icon,
      uui-table-row[selectable] uui-icon {
        display: none;
      }

      uui-table-row:hover uui-checkbox,
      uui-table-row[selectable] uui-checkbox {
        display: inline-block;
      }

      uui-table-head-cell:hover {
        --uui-symbol-sort-hover: 1;
      }

      uui-table-head-cell button {
        padding: 0;
        background-color: transparent;
        color: inherit;
        border: none;
        cursor: pointer;
        font-weight: inherit;
        font-size: inherit;
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }
    `,
  ];

  @state()
  private _columns: Array<TableColumn> = [];

  @state()
  private _items: Array<TableItem> = [];

  @state()
  private _selectionMode = false;

  @state()
  private _selection: Array<string> = [];

  @state()
  private _sortingColumn: any = '';

  @state()
  private _sortingDesc = false;

  private _selectAllHandler(event: Event) {
    const checkboxElement = event.target as HTMLInputElement;
    this._selection = checkboxElement.checked
      ? this._items.map((item: TableItem) => item.key)
      : [];
    this._selectionMode = this._selection.length > 0;
  }

  private _selectHandler(event: Event, item: TableItem) {
    const checkboxElement = event.target as HTMLInputElement;
    this._selection = checkboxElement.checked
      ? [...this._selection, item.key]
      : this._selection.filter(selectionKey => selectionKey !== item.key);
    this._selectionMode = this._selection.length > 0;
  }

  private _sortingHandler(column: TableColumn) {
    this._sortingDesc =
      this._sortingColumn === column.name ? !this._sortingDesc : false;
    this._sortingColumn = column.name;
    this._items = column.sort(this._items, this._sortingDesc);
  }

  private _isSelected(key: string) {
    return this._selection.includes(key);
  }

  connectedCallback() {
    super.connectedCallback();

    this._columns = [
      {
        name: 'Name',
        sort: (items: Array<TableItem>, desc: boolean) => {
          return desc
            ? [...items].sort((a, b) => b.name.localeCompare(a.name))
            : [...items].sort((a, b) => a.name.localeCompare(b.name));
        },
      },
      {
        name: 'Mail Flow Progress',
        sort: (items: Array<TableItem>, desc: boolean) => {
          return desc
            ? [...items].sort((a, b) => b.progress - a.progress)
            : [...items].sort((a, b) => a.progress - b.progress);
        },
      },
      {
        name: 'Sign Up Date',
        sort: (items: Array<TableItem>, desc: boolean) => {
          return desc
            ? [...items].sort(
                (a, b) => +new Date(b.signUpDate) - +new Date(a.signUpDate)
              )
            : [...items].sort(
                (a, b) => +new Date(a.signUpDate) - +new Date(b.signUpDate)
              );
        },
      },
      {
        name: 'Email',
        sort: (items: Array<TableItem>, desc: boolean) => {
          return desc
            ? [...items].sort((a, b) => b.email.localeCompare(a.email))
            : [...items].sort((a, b) => a.email.localeCompare(b.email));
        },
      },
      {
        name: 'Newsletter',
        sort: (items: Array<TableItem>, desc: boolean) => {
          return desc
            ? [...items].sort(
                (a, b) => Number(a.newsletter) - Number(b.newsletter)
              )
            : [...items].sort(
                (a, b) => Number(b.newsletter) - Number(a.newsletter)
              );
        },
      },
    ];

    this._items = [
      {
        key: 'a9b18a00-58f2-420e-bf60-48d33ab156db',
        name: 'Cecílie Bryon',
        progress: 4,
        signUpDate: 'Thur, 22 April 2021',
        email: 'cb@email.com',
        newsletter: true,
      },
      {
        key: '3179d0b2-eec2-4045-b86a-149e13b93e14',
        name: 'Kathleen G. Smith',
        progress: 2,
        signUpDate: 'Thur, 4 November 2021',
        email: 'ks@email.com',
        newsletter: true,
      },
      {
        key: '1b1c9733-b845-4d9a-9ed2-b2f46c05fd72',
        name: 'Adrian Andresen',
        progress: 1,
        signUpDate: 'Tue, 15 December 2021',
        email: 'aa@email.com',
        newsletter: false,
      },
      {
        key: 'b75af81a-b994-4e65-9330-b66c336d0207',
        name: 'Lorenza Trentino',
        progress: 4,
        signUpDate: 'Mon, 11 January 2021',
        email: 'lt@email.com',
        newsletter: false,
      },
    ];
  }

  renderHeaderCellTemplate(column: TableColumn) {
    return html`
      <uui-table-head-cell>
        <button @click="${() => this._sortingHandler(column)}">
          ${column.name}
          <uui-symbol-sort
            ?active=${this._sortingColumn === column.name}
            ?descending=${this._sortingDesc}>
          </uui-symbol-sort>
        </button>
      </uui-table-head-cell>
    `;
  }

  renderRowTemplate(item: TableItem) {
    return html` <uui-table-row
      ?selectable="${this._selectionMode === true}"
      ?selected="${this._isSelected(item.key)}">
      <uui-table-cell>
        <uui-icon name="wand" style="font-size: 20px;"></uui-icon>
        <uui-checkbox
          @change=${(event: Event) => this._selectHandler(event, item)}
          ?checked="${this._isSelected(item.key)}"></uui-checkbox>
      </uui-table-cell>
      <uui-table-cell>
        <div style="display: flex; align-items: center;">
          <uui-avatar title="${item.name}" style="margin-right: 10px;">
          </uui-avatar>
          <a style="font-weight: bold;" href="http://">${item.name}</a>
        </div>
      </uui-table-cell>
      <uui-table-cell>
        <uui-progress-bar
          style="margin-top: 12px; display: block;"
          progress="${item.progress * 25}">
        </uui-progress-bar>
        <div style="margin-top: 3px; font-size: 13px; text-align: right;">
          Completed ${item.progress} of 4 steps
        </div>
      </uui-table-cell>
      <uui-table-cell>${item.signUpDate}</uui-table-cell>
      <uui-table-cell>${item.email}</uui-table-cell>
      <uui-table-cell>
        <uui-tag look="${item.newsletter ? 'positive' : 'secondary'}" size="s"
          >${item.newsletter ? 'Yes' : 'No'}</uui-tag
        >
      </uui-table-cell>
    </uui-table-row>`;
  }

  render() {
    return html`
      <div style="margin-bottom: 20px;">
        Selected ${this._selection.length} of ${this._items.length}
      </div>

      <uui-table>
        <uui-table-column style="width: 60px;"></uui-table-column>

        <uui-table-head>
          <uui-table-head-cell>
            <uui-checkbox
              @change="${this._selectAllHandler}"
              ?checked="${this._selection.length ===
              this._items.length}"></uui-checkbox>
          </uui-table-head-cell>
          ${this._columns.map(column => this.renderHeaderCellTemplate(column))}
        </uui-table-head>

        ${this._items.map(item => this.renderRowTemplate(item))}
      </uui-table>

      ${this._selection.map(key => html`<div>${key}</div>`)}
    `;
  }
}
