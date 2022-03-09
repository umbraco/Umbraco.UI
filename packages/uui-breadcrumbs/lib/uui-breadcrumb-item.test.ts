import { expect, fixture, html } from '@open-wc/testing';

import { UUIBreadcrumbItemElement } from './uui-breadcrumb-item.element';

describe('UuiBreadcrumbItem', () => {
  it('is defined', async () => {
    const element = await fixture<UUIBreadcrumbItemElement>(
      html` <uui-breadcrumb-item>One</uui-breadcrumb-item> `
    );

    expect(element).to.be.instanceOf(UUIBreadcrumbItemElement);
  });

  it('is a link if not last item', async () => {
    const element = await fixture<UUIBreadcrumbItemElement>(
      html` <uui-breadcrumb-item>One</uui-breadcrumb-item> `
    );

    const link = element.shadowRoot!.querySelector('a')!;
    expect(link).to.exist;
  });

  it('is a span if last item', async () => {
    const element = await fixture<UUIBreadcrumbItemElement>(
      html` <uui-breadcrumb-item last-item>One</uui-breadcrumb-item> `
    );
    const span = element.shadowRoot!.querySelector('span')!;
    expect(span).to.exist;
  });
});
