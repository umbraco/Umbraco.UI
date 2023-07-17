import {
  html,
  fixture,
  expect,
  elementUpdated,
  oneEvent,
} from '@open-wc/testing';
import '@umbraco-ui/uui-button/lib';
import '@umbraco-ui/uui-button-group/lib';
import { UUIPaginationElement } from './uui-pagination.element';
import '.';

describe('UUIPaginationElement', () => {
  let element: UUIPaginationElement;

  beforeEach(async () => {
    element = await fixture(html`
      <uui-pagination .total=${30}></uui-pagination>
    `);
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

  describe('properties', () => {
    it('has an total property', () => {
      expect(element).to.have.property('total');
    });

    it('has a current property', () => {
      expect(element).to.have.property('current');
    });

    it('has a label property', () => {
      expect(element).to.have.property('label');
    });
  });

  describe('methods', () => {
    it('has a goToNextPage method', () => {
      expect(element).to.have.property('goToNextPage').that.is.a('function');
    });
    it('has a goToPreviousPage method', () => {
      expect(element)
        .to.have.property('goToPreviousPage')
        .that.is.a('function');
    });
    it('has a goToPage method', () => {
      expect(element).to.have.property('goToPage').that.is.a('function');
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
        expect(event).to.exist;
        expect(event.type).to.equal('change');
        expect(element.current).to.equal(2);
      });
    });
  });

  it('sets active class on current page', async () => {
    element.current = 2;
    await elementUpdated(element);
    const button = element.shadowRoot?.querySelector('#pages')!
      .children[3] as HTMLElement;
    expect(button).to.have.class('active');
  });

  it('goes to selected page on click', async () => {
    const button = element.shadowRoot?.querySelector('#pages')!
      .children[3] as HTMLElement;
    button.click();

    await elementUpdated(element);

    expect(button).to.have.class('active');
    expect(element.current).to.equal(2);
  });

  it('goes to previous page on click', async () => {
    element.current = 2;
    await elementUpdated(element);

    const buttons = element.shadowRoot?.querySelector('#pages')!.children;
    const prevButton = buttons![1] as HTMLElement;
    const activeButton = buttons![2] as HTMLElement;
    prevButton.click();

    await elementUpdated(element);

    expect(element.current).to.equal(1);
    expect(activeButton).to.have.class('active');
  });

  it('goes to next page on click', async () => {
    element.current = 2;
    await elementUpdated(element);

    const buttons = element.shadowRoot?.querySelector('#pages')?.children;
    const nextButton = buttons![4] as HTMLElement;
    nextButton.click();

    await elementUpdated(element);

    expect(element.current).to.equal(3);

    const activeButton = buttons![4] as HTMLElement;
    expect(activeButton).to.have.class('active');
  });

  it('goes to last page on click  and disables last and next buttons', async () => {
    let buttons = element.shadowRoot?.querySelector('#pages')?.children;
    const lastButtonIndex = buttons!.length - 1;
    const lastButton = buttons![lastButtonIndex] as HTMLElement;
    const nextButton = buttons![lastButtonIndex - 1] as HTMLElement;
    lastButton.click();

    await elementUpdated(element);

    buttons = element.shadowRoot?.querySelector('#pages')?.children;
    const activeButton = buttons![19] as HTMLElement;

    expect(element.current).to.equal(30);
    expect(activeButton).to.have.class('active');
    expect(nextButton).to.have.attribute('disabled');
    expect(lastButton).to.have.attribute('disabled');
  });

  it('goes to first page on click and disables first and previous buttons', async () => {
    element.current = 3;
    await elementUpdated(element);

    const buttons = element.shadowRoot?.querySelector('#pages')?.children;
    const firstButton = buttons![0] as HTMLElement;
    const previousButton = buttons![1] as HTMLElement;
    firstButton.click();
    await elementUpdated(element);

    const activeButton = buttons![2] as HTMLElement;
    expect(element.current).to.equal(1);
    expect(activeButton).to.have.class('active');
    expect(firstButton).to.have.attribute('disabled');
    expect(previousButton).to.have.attribute('disabled');
  });

  it('shows the dots when more pages than visible', async () => {
    element = await fixture(html`
      <uui-pagination .total=${30}></uui-pagination>
    `);

    const children = element.shadowRoot?.querySelector('#pages')?.children;
    const arr = [].slice.call(children);

    const hasDots =
      arr.filter((e: HTMLElement) => e.classList.contains('dots')).length > 0;
    expect(hasDots).to.be.true;
  });

  it('hides the dots when only one page', async () => {
    element = await fixture(html`
      <uui-pagination .total=${1}></uui-pagination>
    `);

    const children = element.shadowRoot?.querySelector('#pages')?.children;
    const arr = [].slice.call(children);

    const hasDots =
      arr.filter((e: HTMLElement) => e.classList.contains('dots')).length > 0;
    expect(hasDots).to.be.false;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
