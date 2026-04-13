import './breadcrumbs.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';
import { axeRun } from '../../internal/test/a11y.js';

import { UUIBreadcrumbItemElement } from './breadcrumb-item.element';
import { UUIBreadcrumbsElement } from './breadcrumbs.element';

describe('UuiBreadcrumbs', () => {
  let element: UUIBreadcrumbsElement;
  beforeEach(async () => {
    element = render(html`
      <uui-breadcrumbs
        ><uui-breadcrumb-item>One</uui-breadcrumb-item
        ><uui-breadcrumb-item>Two</uui-breadcrumb-item
        ><uui-breadcrumb-item>Three</uui-breadcrumb-item>
      </uui-breadcrumbs>
    `).container.querySelector('uui-breadcrumbs')!;

    await element.updateComplete;
  });

  it('renders a slot', () => {
    const slot = element.shadowRoot!.querySelector('slot')!;
    expect(slot).not.toBe(null);
  });

  it('sets the last element', () => {
    const slot = element.shadowRoot!.querySelector('slot')!;
    const breadcrumb = slot.assignedElements()[2] as UUIBreadcrumbItemElement;
    expect(breadcrumb.lastItem).toBe(true);
    expect(breadcrumb.getAttribute('aria-current')).toBe('page');
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });
});
