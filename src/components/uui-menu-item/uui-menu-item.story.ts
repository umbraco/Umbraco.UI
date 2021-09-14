import { html } from 'lit-html';
import './index';
import { UUIMenuItemElement } from './uui-menu-item.element';
import { UUIMenuItemEvent } from './UUIMenuItemEvent';

export default {
  title: 'Buttons/Menu Item',
  component: 'uui-menu-item',
};

function handleClickLabel(e: UUIMenuItemEvent) {
  e.target.active = !e.target.active;
}

export const WithChildren = () =>
  html` <uui-menu-item
      label="This is list item"
      has-children
      @click-label=${handleClickLabel}>
      <uui-action-bar slot="actions">
        <uui-button label="Open actions menu">
          <uui-more-symbol></uui-more-symbol>
        </uui-button>
      </uui-action-bar>
      <uui-menu-item label="Child list item 1" @click-label=${handleClickLabel}>
        <uui-action-bar slot="actions">
          <uui-button label="Open actions menu">
            <uui-more-symbol></uui-more-symbol>
          </uui-button>
        </uui-action-bar>
      </uui-menu-item>
      <uui-menu-item label="Child list item 2" @click-label=${handleClickLabel}>
        <uui-action-bar slot="actions">
          <uui-button label="Open actions menu">
            <uui-more-symbol></uui-more-symbol>
          </uui-button>
        </uui-action-bar>
      </uui-menu-item>
      <uui-menu-item label="Child list item" @click-label=${handleClickLabel}>
        <uui-action-bar slot="actions">
          <uui-button label="Open actions menu">
            <uui-more-symbol></uui-more-symbol>
          </uui-button>
        </uui-action-bar>
      </uui-menu-item>
    </uui-menu-item>
    <uui-menu-item
      label="Has children"
      has-children
      show-children
      @click-label=${handleClickLabel}>
      <uui-action-bar slot="actions">
        <uui-button label="Open actions menu">
          <uui-more-symbol></uui-more-symbol>
        </uui-button>
      </uui-action-bar>
      <uui-menu-item
        label="Child list item"
        has-children
        show-children
        @click-label=${handleClickLabel}>
        <uui-action-bar slot="actions">
          <uui-button label="Open actions menu">
            <uui-more-symbol></uui-more-symbol>
          </uui-button>
        </uui-action-bar>

        <uui-menu-item label="Child list item" @click-label=${handleClickLabel}>
          <uui-action-bar slot="actions">
            <uui-button label="Open actions menu">
              <uui-more-symbol></uui-more-symbol>
            </uui-button>
          </uui-action-bar>
        </uui-menu-item>
        <uui-menu-item label="Child list item" @click-label=${handleClickLabel}>
          <uui-action-bar slot="actions">
            <uui-button label="Open actions menu">
              <uui-more-symbol></uui-more-symbol>
            </uui-button>
          </uui-action-bar>
        </uui-menu-item>
        <uui-menu-item label="Child list item" @click-label=${handleClickLabel}>
          <uui-action-bar slot="actions">
            <uui-button label="Open actions menu">
              <uui-more-symbol></uui-more-symbol>
            </uui-button>
          </uui-action-bar>
        </uui-menu-item>
      </uui-menu-item>
      <uui-menu-item label="Child list item" @click-label=${handleClickLabel}>
        <uui-action-bar slot="actions">
          <uui-button label="Open actions menu">
            <uui-more-symbol></uui-more-symbol>
          </uui-button>
        </uui-action-bar>
      </uui-menu-item>
      <uui-menu-item label="Child list item" @click-label=${handleClickLabel}>
        <uui-action-bar slot="actions">
          <uui-button label="Open actions menu">
            <uui-more-symbol></uui-more-symbol>
          </uui-button>
        </uui-action-bar>
      </uui-menu-item>
    </uui-menu-item>`;

export const Selectable = () =>
  html`
    <uui-menu-item
      @click-label=${(e: Event) => {
        (e.target as UUIMenuItemElement).selected = !(
          e.target as UUIMenuItemElement
        ).selected;
      }}
      label="This is selectable list item"></uui-menu-item>
    <uui-menu-item
      @click-label=${(e: Event) => {
        (e.target as UUIMenuItemElement).selected = !(
          e.target as UUIMenuItemElement
        ).selected;
      }}
      label="This is selectable list item"
      selected></uui-menu-item>
  `;

export const Active = () =>
  html`
    <uui-menu-item
      @click-label=${(e: Event) => {
        (e.target as UUIMenuItemElement).active = !(
          e.target as UUIMenuItemElement
        ).active;
      }}
      label="This is activatable list item"></uui-menu-item>
    <uui-menu-item
      @click-label=${(e: Event) => {
        (e.target as UUIMenuItemElement).active = !(
          e.target as UUIMenuItemElement
        ).active;
      }}
      label="This is activatable list item"
      active></uui-menu-item>
  `;
export const WithActions = () =>
  html`
    <uui-menu-item
      @click-label=${(e: Event) => {
        (e.target as UUIMenuItemElement).active = !(
          e.target as UUIMenuItemElement
        ).active;
      }}
      label="This is activatable list item">
      <uui-action-bar slot="actions">
        <uui-button label="Open actions menu">
          <uui-more-symbol></uui-more-symbol>
        </uui-button>
      </uui-action-bar>
    </uui-menu-item>
  `;
