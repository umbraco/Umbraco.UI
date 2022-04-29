import { LitElement, html, css } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property, state } from 'lit/decorators.js';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';

@defineElement('story-home')
export class UUIBoxElement extends LitElement {
  static styles = [
    UUITextStyles,
    css`
      :host {
        /* ----- STATES -----  */
        --color-selected: #2152a3;
        --color-selected-emphasis: #3265b8;
        --color-selected-standalone: #184792;
        --color-selected-contrast: white;

        --color-current: #fdd0cc;
        --color-current-emphasis: #ffddda;
        --color-current-standalone: #e7aea9;
        --color-current-contrast: #1b264f;

        /* ----- UNIVERSAL -----  */
        --color-header: #1b264f;

        --color-focus: #2294ff;

        --color-hover: #f5f5f5;
        --color-hover-standalone: #2152a3;

        --color-disabled: #f5f5f5;
        --color-disabled-contrast: #9e9e9e;

        /* ----- SURFACE -----  */
        --color-surface: #fff;
        --color-surface-alt: #eeeeee;

        --color-background: #f5f5f5;

        --color-text: #1b264f;
        --color-text-alt: #1b264fb5;

        --color-border: #dadada;
        --color-border-alt: #f1f1f1;
        --color-border-emphasis: #bdbdbd;

        /* ----- COLORS -----  */
        --color-primary: #2152a3;
        --color-primary-emphasis: #3368bd;
        --color-primary-standalone: #2152a3;
        --color-primary-contrast: white;

        --color-warning: #fad634;
        --color-warning-emphasis: #ffe366;
        --color-warning-standalone: #c5a100;
        --color-warning-contrast: black;

        --color-danger: #d42054;
        --color-danger-emphasis: #f74074;
        --color-danger-standalone: #d42054;
        --color-danger-contrast: white;

        --color-positive: #2da44e;
        --color-positive-emphasis: #3fc264;
        --color-positive-standalone: #229442;
        --color-positive-contrast: white;
      }

      #app {
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100vw;
        color: var(--color-text);
        font-size: 14px;
        border: 1px solid black;

        margin: -40px 0 0 -40px;
        box-sizing: border-box;
      }

      #nav-top-bar {
        display: flex;
        color: rgb(230, 230, 230);
        gap: 24px;
        padding: 0 var(--uui-size-4);
        align-items: center;
        background-color: var(--color-header);
        height: 48px;
        width: 100%;
        font-size: 1rem;
        box-sizing: border-box;
        --uui-tab-text: white;
        --uui-tab-text-active: var(--color-current);
        --uui-tab-text-hover: var(--color-current-emphasis);
      }
      #main {
        width: 100%;
        height: calc(100% - 48px);
        display: flex;
        box-sizing: border-box;
      }
      #nav-side-bar {
        width: 400px;
        background-color: var(--color-surface);
        height: 100%;
        border-right: 1px solid var(--color-border);
        font-weight: 500;
        display: flex;
        flex-direction: column;
      }
      #nav-side-bar b {
        padding: var(--uui-size-6) var(--uui-size-8);
      }
      #editor {
        background-color: var(--color-background);
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      #editor-top {
        background-color: var(--color-surface);
        width: 100%;
        display: flex;
        gap: 16px;
        align-items: center;
        border-bottom: 1px solid var(--color-border);
      }
      #editor-top uui-input {
        width: 100%;
        margin-left: 16px;
      }
      #editor-top uui-tab-group {
        --uui-tab-divider: var(--color-border);
        border-left: 1px solid var(--color-border);
        flex-wrap: nowrap;
        height: 60px;
      }
      #editor-content {
        padding: var(--uui-size-6);
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .editor-property {
        display: grid;
        grid-template-columns: 200px 600px;
        gap: 32px;
      }
      .editor-property uui-input,
      .editor-property uui-textarea {
        width: 100%;
      }

      uui-box hr {
        margin-bottom: var(--uui-size-6);
      }

      hr {
        border: 0;
        border-top: 1px solid var(--color-border-alt);
      }

      uui-tab {
        font-size: 0.8rem;
      }

      #editor-bottom {
        display: flex;
        justify-content: end;
        align-items: center;
        height: 70px;
        width: 100%;
        gap: 16px;
        padding-right: 24px;
        border-top: 1px solid var(--color-border);
        background-color: var(--color-surface);
        box-sizing: border-box;
      }
    `,
  ];

  render() {
    return html`
      <uui-icon-registry-essential>
        <div id="app">
          <div id="nav-top-bar">
            <uui-tab-group>
              <uui-tab active>Content </uui-tab>
              <uui-tab>Media</uui-tab>
              <uui-tab>Settings</uui-tab>
              <uui-tab>Packages</uui-tab>
            </uui-tab-group>

            <button id="theme-toggle">Theme toggle</button>
          </div>
          <div id="main">
            <div id="nav-side-bar">
              <b>Content</b>
              <div class="nav-list">
                <uui-menu-item label="Hello World">
                  <uui-icon slot="icon" name="document"></uui-icon>
                </uui-menu-item>
                <uui-menu-item label="Home" active has-children show-children>
                  <uui-icon slot="icon" name="document"></uui-icon>
                  <uui-menu-item label="Products">
                    <uui-icon slot="icon" name="document"></uui-icon>
                  </uui-menu-item>
                  <uui-menu-item label="People">
                    <uui-icon slot="icon" name="document"></uui-icon>
                  </uui-menu-item>
                  <uui-menu-item label="About Us" has-children>
                    <uui-icon slot="icon" name="document"></uui-icon>
                    <uui-menu-item label="History">
                      <uui-icon slot="icon" name="document"></uui-icon>
                    </uui-menu-item>
                    <uui-menu-item label="Team">
                      <uui-icon slot="icon" name="document"></uui-icon>
                    </uui-menu-item>
                  </uui-menu-item>
                  <uui-menu-item label="Blog">
                    <uui-icon slot="icon" name="calendar"></uui-icon>
                  </uui-menu-item>
                  <uui-menu-item label="Contact"></uui-menu-item>
                </uui-menu-item>
                <uui-menu-item label="Recycle Bin">
                  <uui-icon slot="icon" name="delete"></uui-icon>
                </uui-menu-item>
              </div>
            </div>
            <div id="editor">
              <div id="editor-top">
                <uui-input value="Home"></uui-input>
                <uui-tab-group>
                  <uui-tab active>Content</uui-tab>
                  <uui-tab>Info</uui-tab>
                  <uui-tab>Actions</uui-tab>
                </uui-tab-group>
              </div>
              <uui-scroll-container id="editor-content">
                <uui-box>
                  <div slot="headline">Hero</div>
                  <div class="editor-property">
                    <div class="label">
                      <b>Header</b>
                      <p>
                        This is the main headline for the hero area on the
                        Homepage
                      </p>
                    </div>
                    <div class="value">
                      <uui-input
                        type="text"
                        value="You have typed some stuff into this one already"></uui-input>
                    </div>
                  </div>
                  <hr />
                  <div class="editor-property">
                    <div class="label">
                      <b>Description</b>
                      <p>Write something nice</p>
                    </div>
                    <div class="value">
                      <uui-textarea
                        >I should probably write some more</uui-textarea
                      >
                      <div class="warning-box">
                        Warning, the operation you're about to perform might
                        influence other part of <b>Project Name</b>. as well as
                        other projects
                      </div>
                    </div>
                  </div>
                </uui-box>
                <uui-box>
                  <div slot="headline">Options</div>
                  <div class="editor-property">
                    <div class="label">
                      <b>Disabled</b>
                      <p>
                        This is the main headline for the hero area on the
                        Homepage
                      </p>
                    </div>
                    <div class="value">
                      <uui-input value="this is disabled" disabled></uui-input>
                    </div>
                  </div>
                  <hr />
                  <div class="editor-property">
                    <div class="label">
                      <b>Header</b>
                      <p>
                        This is the main headline for the hero area on the
                        Homepage
                      </p>
                    </div>
                    <div class="value">
                      <uui-input></uui-input>
                      <div class="danger-box">
                        Warning, the operation you're about to perform might
                        influence other part of <b>Project Name</b>. as well as
                        other projects
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div class="editor-property">
                    <div class="label">
                      <b>Options</b>
                      <p>This will show some options</p>
                    </div>
                    <div class="value">
                      <uui-combobox-list>
                        <uui-combobox-list-option>
                          Option 1
                        </uui-combobox-list-option>
                        <uui-combobox-list-option>
                          Option 2
                        </uui-combobox-list-option>
                        <uui-combobox-list-option>
                          Option 3
                        </uui-combobox-list-option>
                        <uui-combobox-list-option>
                          Option 4
                        </uui-combobox-list-option>
                        <uui-combobox-list-option>
                          Option 5
                        </uui-combobox-list-option>
                      </uui-combobox-list>
                    </div>
                  </div>
                </uui-box>
                <uui-box>
                  <div slot="headline">Buttons</div>
                  <div class="editor-property">
                    <div class="label">
                      <b>Primary</b>
                    </div>
                    <div class="value">
                      <div class="buttons">
                        <button class="primary">Button</button>
                        <button class="secondary">Button</button>
                        <button class="tertiary">Button</button>
                        <button class="outline">Button</button>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div class="editor-property">
                    <div class="label">
                      <b>Positive</b>
                    </div>
                    <div class="value">
                      <div class="buttons">
                        <button class="primary positive">Button</button>
                        <button class="secondary positive">Button</button>
                        <button class="tertiary positive">Button</button>
                        <button class="outline positive">Button</button>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div class="editor-property">
                    <div class="label">
                      <b>Warning</b>
                    </div>
                    <div class="value">
                      <div class="buttons">
                        <button class="primary warning">Button</button>
                        <button class="secondary warning">Button</button>
                        <button class="tertiary warning">Button</button>
                        <button class="outline warning">Button</button>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div class="editor-property">
                    <div class="label">
                      <b>Danger</b>
                    </div>
                    <div class="value">
                      <div class="buttons">
                        <button class="primary danger">Button</button>
                        <button class="secondary danger">Button</button>
                        <button class="tertiary danger">Button</button>
                        <button class="outline danger">Button</button>
                      </div>
                    </div>
                  </div>
                </uui-box>
              </uui-scroll-container>
              <div id="editor-bottom">
                <uui-button>Save and preview</uui-button>
                <uui-button look="secondary">Save</uui-button>
                <uui-button look="positive">Save and publish</uui-button>
              </div>
            </div>
          </div>
        </div>
      </uui-icon-registry-essential>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'story-home': UUIBoxElement;
  }
}
