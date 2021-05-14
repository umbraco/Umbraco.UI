import { html } from 'lit-html';
import './index';
import { UUIMenuItemElement } from './uui-menu-item.element';

export default {
  title: 'Basics/Menu Item',
  component: 'uui-menu-item',
};

export const WithChildren = () =>
  html` <uui-menu-item
      label="This is list item"
      has-children
      @click-label=${(e: any) => {
        e.target.active = !e.target.active;
      }}
    >
      <uui-menu-item
        label="Child list item"
        @click-label=${(e: any) => {
          e.target.active = !e.target.active;
        }}
      ></uui-menu-item>
      <uui-menu-item
        label="Child list item"
        @click-label=${(e: any) => {
          e.target.active = !e.target.active;
        }}
      ></uui-menu-item>
      <uui-menu-item
        label="Child list item"
        @click-label=${(e: any) => {
          e.target.active = !e.target.active;
        }}
      ></uui-menu-item>
    </uui-menu-item>
    <uui-menu-item
      label="Has children"
      has-children
      show-children
      @click-label=${(e: any) => {
        e.target.active = !e.target.active;
      }}
    >
      <uui-menu-item
        label="Child list item"
        has-children
        show-children
        @click-label=${(e: any) => {
          console.log('CLICKED', e);
          e.target.active = !e.target.active;
        }}
      >
        <uui-menu-item
          label="Child list item"
          @click-label=${(e: any) => {
            console.log('CLICKED', e);
            e.target.active = !e.target.active;
          }}
        ></uui-menu-item>
        <uui-menu-item
          label="Child list item"
          @click-label=${(e: any) => {
            e.target.active = !e.target.active;
          }}
        ></uui-menu-item>
        <uui-menu-item
          label="Child list item"
          @click-label=${(e: any) => {
            e.target.active = !e.target.active;
          }}
        ></uui-menu-item>
      </uui-menu-item>
      <uui-menu-item
        label="Child list item"
        @click-label=${(e: any) => {
          e.target.active = !e.target.active;
        }}
      ></uui-menu-item>
      <uui-menu-item
        label="Child list item"
        @click-label=${(e: any) => {
          e.target.active = !e.target.active;
        }}
      ></uui-menu-item>
    </uui-menu-item>`;

export const Selectable = () =>
  html`
    <uui-menu-item
      @click-label=${(e: Event) => {
        (e.target as UUIMenuItemElement).selected = !(e.target as UUIMenuItemElement)
          .selected;
      }}
      label="This is selectable list item"
    ></uui-menu-item>
    <uui-menu-item
      @click-label=${(e: Event) => {
        (e.target as UUIMenuItemElement).selected = !(e.target as UUIMenuItemElement)
          .selected;
      }}
      label="This is selectable list item"
      selected
    ></uui-menu-item>
  `;

export const Active = () =>
  html`
    <uui-menu-item
      @click-label=${(e: Event) => {
        (e.target as UUIMenuItemElement).active = !(e.target as UUIMenuItemElement)
          .active;
      }}
      label="This is activatable list item"
    ></uui-menu-item>
    <uui-menu-item
      @click-label=${(e: Event) => {
        (e.target as UUIMenuItemElement).active = !(e.target as UUIMenuItemElement)
          .active;
      }}
      label="This is activatable list item"
      active
    ></uui-menu-item>
  `;
export const WithActions = () =>
  html`
    <uui-menu-item
      @click-label=${(e: Event) => {
        (e.target as UUIMenuItemElement).active = !(e.target as UUIMenuItemElement)
          .active;
      }}
      label="This is activatable list item"
    >
      <uui-action-bar slot="actions">
        <uui-button label="Open actions menu"
          ><uui-more-symbol></uui-more-symbol
        ></uui-button>
      </uui-action-bar>
    </uui-menu-item>
  `;
