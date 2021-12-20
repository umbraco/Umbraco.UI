import {
  html,
  fixture,
  expect,
  waitUntil,
  elementUpdated,
} from '@open-wc/testing';
import { UUIPaginationElement } from './uui-pagination.element';
import '.';

describe('UUIPaginationElement', () => {
  let element: UUIPaginationElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-pagination .total=${30}></uui-pagination> `
    );
  });

  // it('shows the correct number of pages', async () => {
  //   // (element.shadowRoot?.querySelector('#group') as HTMLElement).style.width =
  //   //   '500px';
  //   // await waitUntil(() => element.visiblePages.length > 1);
  //   // console.log(element.shadowRoot);

  //   // const buttons = element.shadowRoot?.querySelector('#group')?.children;

  //   // console.log(buttons);

  //   expect(true).to.be.false;
  // });

  it('sets active class on current page', async () => {
    await waitUntil(() => element.visiblePages.length > 1);
    element.current = 2;
    const button = element.shadowRoot?.querySelector('#group')!
      .children[3] as HTMLElement;
    await elementUpdated(button);

    expect(button).to.have.class('active-button');
  });

  it('goes to selected page on click', async () => {
    await waitUntil(() => element.visiblePages.length > 1);
    const button = element.shadowRoot?.querySelector('#group')!
      .children[3] as HTMLElement;
    button.click();

    await elementUpdated(element);

    expect(button).to.have.class('active-button');
    expect(element.current).to.equal(2);
  });

  it('goes to previous page on click', async () => {
    await waitUntil(() => element.visiblePages.length > 1);
    element.current = 2;
    const buttons = element.shadowRoot?.querySelector('#group')!.children;
    const prevButton = buttons![1] as HTMLElement;
    const activeButton = buttons![2] as HTMLElement;
    prevButton.click();

    await elementUpdated(element);

    expect(element.current).to.equal(1);
    expect(activeButton).to.have.class('active-button');
  });

  it('goes to next page on click', async () => {
    await waitUntil(() => element.visiblePages.length > 1);
    element.current = 2;
    const buttons = element.shadowRoot?.querySelector('#group')?.children;
    const nextButton = buttons![6] as HTMLElement;
    const activeButton = buttons![3] as HTMLElement;
    nextButton.click();

    await elementUpdated(element);

    expect(element.current).to.equal(3);
    expect(activeButton).to.have.class('active-button');
  });

  it('goes to last page on click  and disables last and next buttons', async () => {
    await waitUntil(() => element.visiblePages.length > 1);
    let buttons = element.shadowRoot?.querySelector('#group')?.children;
    const lastButton = buttons![7] as HTMLElement;
    const nextButton = buttons![6] as HTMLElement;
    lastButton.click();

    await elementUpdated(element);

    buttons = element.shadowRoot?.querySelector('#group')?.children;
    const activeButton = buttons![5] as HTMLElement;

    expect(element.current).to.equal(30);
    expect(activeButton).to.have.class('active-button');
    expect(nextButton).to.have.attribute('disabled');
    expect(lastButton).to.have.attribute('disabled');
  });

  it('goes to first page on click and disables first and previous buttons', async () => {
    await waitUntil(() => element.visiblePages.length > 1);
    element.current = 3;
    const buttons = element.shadowRoot?.querySelector('#group')?.children;
    const firstButton = buttons![0] as HTMLElement;
    const previousButton = buttons![1] as HTMLElement;
    const activeButton = buttons![2] as HTMLElement;
    firstButton.click();

    await elementUpdated(element);

    expect(element.current).to.equal(1);
    expect(activeButton).to.have.class('active-button');
    expect(firstButton).to.have.attribute('disabled');
    expect(previousButton).to.have.attribute('disabled');
  });

  it('shows the dots when more pages than visible', async () => {
    element = await fixture(
      html` <uui-pagination .total=${30}></uui-pagination> `
    );

    const children = element.shadowRoot?.querySelector('#group')?.children;
    const arr = [].slice.call(children);

    const hasDots =
      arr.filter((e: HTMLElement) => e.classList.contains('dots-button'))
        .length > 0;
    expect(hasDots).to.be.true;
  });

  it('hides the dots when only one page', async () => {
    element = await fixture(
      html` <uui-pagination .total=${1}></uui-pagination> `
    );

    const children = element.shadowRoot?.querySelector('#group')?.children;
    const arr = [].slice.call(children);

    const hasDots =
      arr.filter((e: HTMLElement) => e.classList.contains('dots-button'))
        .length > 0;
    expect(hasDots).to.be.false;
  });

  it('passes the a11y audit', async () => {
    expect(element).shadowDom.to.be.accessible();
  });
});
