import { html, fixture, expect } from '@open-wc/testing';
import { UUIBreadcrumbItemElement } from './uui-breadcrumb-item.element';
import { UUIBreadcrumbsElement } from './uui-breadcrumbs.element';
import '.';

describe('UuiBreadcrumbs', () => {
  let element: UUIBreadcrumbsElement;
  beforeEach(async () => {
    element = await fixture(
      html`
        <uui-breadcrumbs
          ><uui-breadcrumb-item>One</uui-breadcrumb-item
          ><uui-breadcrumb-item>Two</uui-breadcrumb-item
          ><uui-breadcrumb-item>Three</uui-breadcrumb-item>
        </uui-breadcrumbs>
      `
    );
  });

  it('renders a slot', () => {
    const slot = element.shadowRoot!.querySelector('slot')!;
    expect(slot).to.exist;
  });

  it('sets the last element', () => {
    const slot = element.shadowRoot!.querySelector('slot')!;
    const breadcrumb = slot.assignedElements()[2] as UUIBreadcrumbItemElement;
    expect(breadcrumb.lastItem).to.be.true;
  });

  it('passes the a11y audit', () => {
    expect(element).shadowDom.to.be.accessible();
  });
});
