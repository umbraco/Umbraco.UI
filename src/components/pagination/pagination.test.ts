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
        const button = element.shadowRoot?.querySelector('#pages')!
          .children[3] as HTMLElement;
        button?.click();
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
    const button = element.shadowRoot?.querySelector('#pages')!
      .children[3] as HTMLElement;
    expect(button.classList.contains('active')).toBe(true);
  });

  it('goes to selected page on click', async () => {
    const button = element.shadowRoot?.querySelector('#pages')!
      .children[3] as HTMLElement;
    button.click();

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

    const buttons = element.shadowRoot?.querySelector('#pages')!.children;
    const prevButton = buttons![1] as HTMLElement;
    prevButton.click();

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

    const buttons = element.shadowRoot?.querySelector('#pages')?.children;
    const nextButton = buttons![buttons!.length - 2] as HTMLElement;
    nextButton.click();

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
    const buttons = element.shadowRoot?.querySelector('#pages')?.children;
    const lastButton = buttons![buttons!.length - 1] as HTMLElement;
    lastButton.click();

    await element.updateComplete;
    await element.updateComplete;

    expect(element.current).toBe(30);
    const activeButton = element.shadowRoot?.querySelector(
      '.active',
    ) as HTMLElement;
    expect(activeButton).not.toBe(null);
    expect(activeButton.textContent?.trim()).toBe('30');

    // Re-query nav buttons after render
    const updatedButtons =
      element.shadowRoot?.querySelector('#pages')?.children;
    const lastIdx = updatedButtons!.length - 1;
    expect(
      (updatedButtons![lastIdx - 1] as HTMLElement).hasAttribute('disabled'),
    ).toBe(true);
    expect(
      (updatedButtons![lastIdx] as HTMLElement).hasAttribute('disabled'),
    ).toBe(true);
  });

  it('goes to first page on click and disables first and previous buttons', async () => {
    element.current = 3;
    await element.updateComplete;

    const buttons = element.shadowRoot?.querySelector('#pages')?.children;
    const firstButton = buttons![0] as HTMLElement;
    firstButton.click();

    await element.updateComplete;
    await element.updateComplete;

    expect(element.current).toBe(1);
    const activeButton = element.shadowRoot?.querySelector(
      '.active',
    ) as HTMLElement;
    expect(activeButton).not.toBe(null);
    expect(activeButton.textContent?.trim()).toBe('1');
    expect(
      (
        element.shadowRoot?.querySelector('#pages')!.children[0] as HTMLElement
      ).hasAttribute('disabled'),
    ).toBe(true);
    expect(
      (
        element.shadowRoot?.querySelector('#pages')!.children[1] as HTMLElement
      ).hasAttribute('disabled'),
    ).toBe(true);
  });

  it('shows the dots when more pages than visible', async () => {
    element = render(html`
      <uui-pagination .total=${30}></uui-pagination>
    `).container.querySelector('uui-pagination')!;

    await element.updateComplete;

    const children = element.shadowRoot?.querySelector('#pages')?.children;
    const arr = [].slice.call(children);

    const hasDots =
      arr.filter((e: HTMLElement) => e.classList.contains('dots')).length > 0;
    expect(hasDots).toBe(true);
  });

  it('hides the dots when only one page', async () => {
    element = render(html`
      <uui-pagination .total=${1}></uui-pagination>
    `).container.querySelector('uui-pagination')!;

    await element.updateComplete;

    const children = element.shadowRoot?.querySelector('#pages')?.children;
    const arr = [].slice.call(children);

    const hasDots =
      arr.filter((e: HTMLElement) => e.classList.contains('dots')).length > 0;
    expect(hasDots).toBe(false);
  });

  it('passes the a11y audit', async () => {
    expect(await axeRun(element)).toHaveNoViolations();
  });
});
