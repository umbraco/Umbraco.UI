import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';

@customElement('uui-app-header-example')
export class UUIAppHeaderExample extends LitElement {
  static styles: CSSResultGroup = [
    UUITextStyles,
    css`
      #appHeader {
        background-color: var(--uui-color-header-surface);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 var(--uui-size-space-5);

        --uui-button-contrast: var(--uui-color-header-contrast);
        --uui-button-contrast-hover: var(--uui-color-header-contrast-emphasis);
        --uui-button-background-color: transparent;
        --uui-button-background-color-hover: transparent;
      }

      #logo {
        margin-right: var(--uui-size-space-2);
      }

      #logo img {
        height: var(--uui-size-10);
        width: var(--uui-size-10);
      }

      #sections {
        flex: 1 1 auto;
        display: flex;
        align-items: center;
        gap: var(--uui-size-space-2);
      }

      #tabs {
        height: 60px;
        font-size: 16px;
        --uui-tab-text: rgba(255, 255, 255, 0.8);
        --uui-tab-text-active: var(--uui-color-current);
        --uui-tab-text-hover: var(--uui-color-current-emphasis);
      }

      #tools {
        display: flex;
        align-items: center;
        gap: var(--uui-size-space-2);
      }

      .tool {
        font-size: 18px;
      }

      #dropdown {
        background-color: white;
        border-radius: var(--uui-border-radius);
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        box-shadow: var(--uui-shadow-depth-3);
        min-width: 200px;
        color: black; /* Change to variable */
      }
    `,
  ];

  @state()
  private _sections: Array<string> = [
    'Content',
    'Media',
    'Members',
    'Settings',
    'Packages',
  ];

  @state()
  private _activeSection: string = this._sections[0];

  @state()
  private _visibleSections: Array<string> = ['Content', 'Media', 'Members'];

  private _handleTabClick(e: MouseEvent) {
    const tab = e.currentTarget as any;

    // TODO: we need to be able to prevent the tab from setting the active state
    if (tab.id === 'moreTab') {
      return;
    }

    this._activeSection = tab.label;
  }

  render() {
    return html`
      <uui-icon-registry-essential>
        <div id="appHeader">
          <uui-button id="logo" color="primary" label="Umbraco" compact>
            <img src="/images/umbraco_logomark_white.svg" alt="Umbraco" />
          </uui-button>

          <div id="sections">
            <uui-tab-group id="tabs">
              ${this._visibleSections.map(
                section => html`
                  <uui-tab
                    ?active="${this._activeSection === section}"
                    label="${section}"
                    @click="${this._handleTabClick}"></uui-tab>
                `,
              )}
            </uui-tab-group>
          </div>

          <div id="tools">
            <uui-button class="tool" look="primary" label="Search" compact>
              <uui-icon name="search"></uui-icon>
            </uui-button>
            <uui-button class="tool" look="primary" label="Help" compact>
              <uui-icon name="favorite"></uui-icon>
            </uui-button>
            <uui-button
              look="primary"
              style="font-size: 14px;"
              label="User"
              compact>
              <uui-avatar name="Mads Rasmussen"></uui-avatar>
            </uui-button>
          </div>
        </div>
      </uui-icon-registry-essential>

      <div>ACTIVE SECTION: ${this._activeSection}</div>
    `;
  }
}
