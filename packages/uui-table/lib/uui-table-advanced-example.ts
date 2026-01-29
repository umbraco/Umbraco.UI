import '.';
import '@umbraco-ui/uui-avatar/lib';
import '@umbraco-ui/uui-box/lib';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-checkbox/lib';
import '@umbraco-ui/uui-icon/lib';
import '@umbraco-ui/uui-progress-bar/lib';
import '@umbraco-ui/uui-tag/lib';
import '@umbraco-ui/uui-symbol-sort/lib';

import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { css, html, LitElement } from 'lit';
import { state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';

interface TableColumn {
  name: string;
  sort: (items: Array<TableItem>, desc: boolean) => Array<TableItem>;
}

interface TableItem {
  key: string;
  name: string;
  progress: number;
  signUpDate: string;
  email: string;
  newsletter: boolean;
}

@defineElement('uui-table-with-selection-example')
export class UUITableWithSelectionExampleElement extends LitElement {
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
  private _selectRowHandler(item: TableItem) {
    this._selection = [...this._selection, item.key];
    this._selectionMode = this._selection.length > 0;
  }
  private _deselectRowHandler(item: TableItem) {
    this._selection = this._selection.filter(
      selectionKey => selectionKey !== item.key,
    );
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
                (a, b) => +new Date(b.signUpDate) - +new Date(a.signUpDate),
              )
            : [...items].sort(
                (a, b) => +new Date(a.signUpDate) - +new Date(b.signUpDate),
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
                (a, b) => Number(a.newsletter) - Number(b.newsletter),
              )
            : [...items].sort(
                (a, b) => Number(b.newsletter) - Number(a.newsletter),
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
      <uui-table-head-cell style="--uui-table-cell-padding: 0">
        <button
          style="padding: var(--uui-size-4) var(--uui-size-5);"
          @click="${() => this._sortingHandler(column)}">
          ${column.name}
          <uui-symbol-sort
            ?active=${this._sortingColumn === column.name}
            ?descending=${this._sortingDesc}>
          </uui-symbol-sort>
        </button>
      </uui-table-head-cell>
    `;
  }

  protected renderRowTemplate = (item: TableItem) => {
    return html` <uui-table-row
      selectable
      ?select-only=${this._selectionMode}
      ?selected=${this._isSelected(item.key)}
      @selected=${() => this._selectRowHandler(item)}
      @deselected=${() => this._deselectRowHandler(item)}>
      <uui-table-cell>
        <uui-icon name="wand"></uui-icon>
        <uui-checkbox
          label="Select ${item.name}"
          @click=${(e: MouseEvent) => e.stopPropagation()}
          @change=${(event: Event) => this._selectHandler(event, item)}
          ?checked="${this._isSelected(item.key)}"></uui-checkbox>
      </uui-table-cell>
      <uui-table-cell>
        <div style="display: flex; align-items: center;">
          <uui-avatar name="${item.name}" style="margin-right: 10px;">
          </uui-avatar>
          <a style="font-weight: bold;" href="http://">${item.name}</a>
        </div>
      </uui-table-cell>
      <uui-table-cell>
        <uui-progress-bar
          style="margin-top: 12px; display: block;"
          progress="${item.progress * 25}">
        </uui-progress-bar>
        <small
          style="margin-top: 1px; text-align: right; display:block; margin-bottom:0;">
          Completed ${item.progress} of 4 steps
        </small>
      </uui-table-cell>
      <uui-table-cell>${item.signUpDate}</uui-table-cell>
      <uui-table-cell>${item.email}</uui-table-cell>
      <uui-table-cell>
        <uui-tag color="${item.newsletter ? 'positive' : 'danger'}">
          ${item.newsletter ? 'Yes' : 'No'}
        </uui-tag>
      </uui-table-cell>
    </uui-table-row>`;
  };

  render() {
    return html`
      <div style="margin-bottom: 20px;">
        Selected ${this._selection.length} of ${this._items.length}
      </div>

      <uui-table class="uui-text">
        <uui-table-column style="width: 60px;"></uui-table-column>

        <uui-table-head>
          <uui-table-head-cell style="--uui-table-cell-padding: 0">
            <uui-checkbox
              label="Select all rows"
              style="padding: var(--uui-size-4) var(--uui-size-5);"
              @change="${this._selectAllHandler}"
              ?checked="${this._selection.length === this._items.length}"
              ?indeterminate="${this._selection.length > 0 &&
              this._selection.length < this._items.length}"></uui-checkbox>
          </uui-table-head-cell>
          ${this._columns.map(column => this.renderHeaderCellTemplate(column))}
        </uui-table-head>

        ${repeat(this._items, item => item.key, this.renderRowTemplate)}
      </uui-table>
    `;
  }

  static styles = [
    UUITextStyles,
    css`
      uui-table-row uui-checkbox {
        display: none;
      }

      uui-table-row:focus uui-icon,
      uui-table-row:focus-within uui-icon,
      uui-table-row:hover uui-icon,
      uui-table-row[select-only] uui-icon {
        display: none;
      }

      uui-table-row:focus uui-checkbox,
      uui-table-row:focus-within uui-checkbox,
      uui-table-row:hover uui-checkbox,
      uui-table-row[select-only] uui-checkbox {
        display: inline-block;
      }

      uui-table-head-cell:focus,
      uui-table-head-cell:focus-within,
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
}
