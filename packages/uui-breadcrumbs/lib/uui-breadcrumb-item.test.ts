import { html, fixture, expect } from '@open-wc/testing';
import '.';

describe('UuiBreadcrumbItem', () => {
  it('is a link if not last item', async () => {
    const element = await fixture(
      html` <uui-breadcrumb-item>One</uui-breadcrumb-item> `
    );

    const link = element.shadowRoot!.querySelector('a')!;
    expect(link).to.exist;
  });

  it('is a span if last item', async () => {
    const element = await fixture(
      html` <uui-breadcrumb-item last-item>One</uui-breadcrumb-item> `
    );
    const span = element.shadowRoot!.querySelector('span')!;
    expect(span).to.exist;
  });

  it('passes the a11y audit', async () => {
    const element = await fixture(
      html` <uui-breadcrumb-item lastItem>One</uui-breadcrumb-item> `
    );
    expect(element).shadowDom.to.be.accessible();
  });
});
