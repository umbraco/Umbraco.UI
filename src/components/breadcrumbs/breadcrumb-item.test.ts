import './breadcrumbs.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';

import { UUIBreadcrumbItemElement } from './breadcrumb-item.element';

describe('UuiBreadcrumbItem', () => {
  it('is defined', async () => {
    const element = render(html`
      <uui-breadcrumb-item>One</uui-breadcrumb-item>
    `).container.querySelector('uui-breadcrumb-item')!;
    await element.updateComplete;

    expect(element).toBeInstanceOf(UUIBreadcrumbItemElement);
  });

  it('is a link if not last item', async () => {
    const element = render(html`
      <uui-breadcrumb-item href="/test">One</uui-breadcrumb-item>
    `).container.querySelector('uui-breadcrumb-item')!;
    await element.updateComplete;

    const link = element.shadowRoot!.querySelector('a')!;
    expect(link).not.toBe(null);
  });

  it('is a span if last item', async () => {
    const element = render(html`
      <uui-breadcrumb-item last-item>One</uui-breadcrumb-item>
    `).container.querySelector('uui-breadcrumb-item')!;
    await element.updateComplete;

    const span = element.shadowRoot!.querySelector('span')!;
    expect(span).not.toBe(null);
  });

  it('is a span if no href', async () => {
    const element = render(html`
      <uui-breadcrumb-item>One</uui-breadcrumb-item>
    `).container.querySelector('uui-breadcrumb-item')!;
    await element.updateComplete;

    const span = element.shadowRoot!.querySelector('span')!;
    expect(span).not.toBe(null);
  });
});
