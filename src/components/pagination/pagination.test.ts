import '../button/button.js';
import { html } from 'lit';
import { render } from 'vitest-browser-lit';

import { axeRun } from '../../internal/test/a11y.js';
import { oneEvent } from '../../internal/test/index.js';
import '../button-group/button-group.js';
import { UUIPaginationElement } from './pagination.element';
import './pagination.js';

describe('UUIPaginationElement', () => {
  let element: UUIPaginationElement;

  // The shadow DOM has nav buttons (first/previous/next/last) as siblings of
  // #pages, and #pages contains page buttons interspersed with dots when the
  // visible range doesn't reach the first/last page. Query by semantic class
  // rather than child index so the tests don't break on layout changes.
  const navButtons = () =>
    Array.from(
      element.shadowRoot?.querySelectorAll<HTMLElement>('uui-button.nav') ?? [],
    );
  const firstNavButton = () => navButtons()[0];
  const previousNavButton = () => navButtons()[1];
  const nextNavButton = () => navButtons()[2];
  const lastNavButton = () => navButtons()[3];

  const pageButton = (page: number) =>
    Array.from(
      element.shadowRoot?.querySelectorAll<HTMLElement>('uui-button.page') ??
        [],
    ).find(b => b.textContent?.trim() === String(page));

  beforeEach(async () => {
    element = render(html`
      <uui-pagination .total=${30}></uui-pagination>
    `).container.querySelector('uui-pagination')!;

    await element.updateComplete;
  });

  // it('shows the correct number of pages', async () => {
  //   // (element.shadowRoot?.querySelector('#group') as HTMLElement).style.width =
  //   //   '500px';
  //   // await waitUntil(() => element.visiblePages.length > 1);
  //   // console.log(element.shadowRoot);

  //   // const buttons = element.shadowRoot?.querySelector('#group')?.children;

  //   // console.log(buttons);

  //   expect(true).toBe(false);
  // });

  describe('properties', () => {
    it('has an total property', () => {
      expect(element).toHaveProperty('total');
    });

    it('has a current property', () => {
      expect(element).toHaveProperty('current');
    });

    it('has a label property', () => {
      expect(element).toHaveProperty('label');
    });
  });

  describe('methods', () => {
    it('has a goToNextPage method', () => {
      expect(element).toHaveProperty('goToNextPage');
    });
    it('has a goToPreviousPage method', () => {
      expect(element).toHaveProperty('goToPreviousPage');
    });
    it('has a goToPage method', () => {
      expect(element).toHaveProperty('goToPage');
    });
  });

  describe('events', () => {
    describe('change', () => {
      it('emits a change event when another page is clicked', async () => {
        const listener = oneEvent(element, 'change');
        pageButton(2)?.click();
        const event = await listener;
        expect(event).not.toBe(null);
        expect(event.type).toBe('change');
        expect(element.current).toBe(2);
      });
    });
  });

  it('sets active class on current page', async () => {
    element.current = 2;
    await element.updateComplete;
    expect(pageButton(2)?.classList.contains('active')).toBe(true);
  });

  it('goes to selected page on click', async () => {
    pageButton(2)!.click();

    await element.updateComplete;
    await element.updateComplete;

    expect(element.current).toBe(2);
    const activeButton = element.shadowRoot?.querySelector(
      '.active',
    ) as HTMLElement;
    expect(activeButton).not.toBe(null);
    expect(activeButton.textContent?.trim()).toBe('2');
  });

  it('goes to previous page on click', async () => {
    element.current = 2;
    await element.updateComplete;

    previousNavButton().click();

    await element.updateComplete;
    await element.updateComplete;

    expect(element.current).toBe(1);
    const activeButton = element.shadowRoot?.querySelector(
      '.active',
    ) as HTMLElement;
    expect(activeButton).not.toBe(null);
    expect(activeButton.textContent?.trim()).toBe('1');
  });

  it('goes to next page on click', async () => {
    element.current = 2;
    await element.updateComplete;

    nextNavButton().click();

    await element.updateComplete;
    await element.updateComplete;

    expect(element.current).toBe(3);
    const activeButton = element.shadowRoot?.querySelector(
      '.active',
    ) as HTMLElement;
    expect(activeButton).not.toBe(null);
    expect(activeButton.textContent?.trim()).toBe('3');
  });

  it('goes to last page on click  and disables last and next buttons', async () => {
    lastNavButton().click();

    await element.updateComplete;
    await element.updateComplete;

    expect(element.current).toBe(30);
    const activeButton = element.shadowRoot?.querySelector(
      '.active',
    ) as HTMLElement;
    expect(activeButton).not.toBe(null);
    expect(activeButton.textContent?.trim()).toBe('30');

    expect(nextNavButton().hasAttribute('disabled')).toBe(true);
    expect(lastNavButton().hasAttribute('disabled')).toBe(true);
  });

  it('goes to first page on click and disables first and previous buttons', async () => {
    element.current = 3;
    await element.updateComplete;

    firstNavButton().click();

    await element.updateComplete;
    await element.updateComplete;

    expect(element.current).toBe(1);
    const activeButton = element.shadowRoot?.querySelector(
      '.active',
    ) as HTMLElement;
    expect(activeButton).not.toBe(null);
    expect(activeButton.textContent?.trim()).toBe('1');
    expect(firstNavButton().hasAttribute('disabled')).toBe(true);
    expect(previousNavButton().hasAttribute('disabled')).toBe(true);
  });

  it('shows the dots when more pages than visible', async () => {
    element = render(html`
      <uui-pagination .total=${30}></uui-pagination>
    `).container.querySelector('uui-pagination')!;

    await element.updateComplete;

    const hasDots = !!element.shadowRoot?.querySelector('#pages .dots');
    expect(hasDots).toBe(true);
  });

  it('hides the dots when only one page', async () => {
    element = render(html`
      <uui-pagination .total=${1}></uui-pagination>
    `).container.querySelector('uui-pagination')!;

    await element.updateComplete;

    const hasDots = !!element.shadowRoot?.querySelector('#pages .dots');
    expect(hasDots).toBe(false);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });
});
