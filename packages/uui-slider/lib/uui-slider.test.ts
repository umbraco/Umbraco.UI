import '.';

import {
  elementUpdated,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';

import { UUISliderElement } from './uui-slider.element';
import { UUISliderEvent } from './UUISliderEvent';

const preventSubmit = (e: SubmitEvent) => {
  e.preventDefault();
};

describe('UuiSlider', () => {
  let element: UUISliderElement;
  let input: HTMLInputElement;

  beforeEach(async () => {
    element = await fixture(html`
      <uui-slider label="a slider label"></uui-slider>
    `);
    input = element.shadowRoot?.querySelector('input') as HTMLInputElement;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('properties', () => {
    it('has a disabled property', () => {
      expect(element).to.have.property('disabled');
    });
    it('disable property set input to disabled', async () => {
      element.disabled = true;
      await elementUpdated(element);
      expect(input.disabled).to.be.true;
    });

    it('has a value property', () => {
      expect(element).to.have.property('value');
    });
    it('has a label property', () => {
      expect(element).to.have.property('label');
    });
    it('has a min property', () => {
      expect(element).to.have.property('min');
    });
    it('has a max property', () => {
      expect(element).to.have.property('max');
    });
    it('has a step property', () => {
      expect(element).to.have.property('step');
    });
    it('has a hideStepValues property', () => {
      expect(element).to.have.property('hideStepValues');
    });
  });

  describe('methods', () => {
    it('has a focus method', () => {
      expect(element).to.have.property('focus').that.is.a('function');
    });
    it('focus method sets focus', async () => {
      expect(document.activeElement).not.to.equal(element);
      await element.focus();
      expect(document.activeElement).to.equal(element);
    });
  });
  describe('events', () => {
    describe('change', () => {
      it('emits a change event when native input fires one', async () => {
        const listener = oneEvent(element, UUISliderEvent.CHANGE);

        input.dispatchEvent(new Event('change'));

        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUISliderEvent.CHANGE);
        expect(event!.target).to.equal(element);
      });
    });
    describe('input', () => {
      it('emits a input event when native input fires one', async () => {
        const listener = oneEvent(element, UUISliderEvent.INPUT);

        input.dispatchEvent(new Event('input'));

        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUISliderEvent.INPUT);
        expect(event!.target).to.equal(element);
      });
    });
  });

  it('changes the value to the input value when input event is emitted', async () => {
    input.value = '10';
    input.dispatchEvent(new Event('input'));
    expect(element.value).to.equal('10');
  });
});

describe('UuiTextfield with steps', () => {
  let dom: Element;
  beforeEach(async () => {
    dom = await fixture(html`
      <uui-slider id="test" label="a slider label" step="1"></uui-slider>
    `);
  });

  it('passes the a11y audit', async () => {
    await expect(dom).shadowDom.to.be.accessible();
  });
});

describe('UuiSlider in Form', () => {
  let formElement: HTMLFormElement;
  let element: UUISliderElement;
  beforeEach(async () => {
    formElement = await fixture(
      html` <form @submit=${preventSubmit}>
        <uui-slider
          label="a slideruui-slider label"
          name="slider"
          value="28"
          step="1"></uui-slider>
      </form>`,
    );
    element = formElement.querySelector('uui-slider') as any;
  });

  it('value is correct', async () => {
    await expect(element.value).to.be.equal('28');
  });

  it('form output', async () => {
    const formData = new FormData(formElement);
    await expect(formData.get('slider')).to.be.equal('28');
  });

  it('change value and check output', async () => {
    element.value = '90';
    const formData = new FormData(formElement);
    await expect(formData.get('slider')).to.be.equal('90');
  });

  describe('submit', () => {
    it('should submit when pressing enter', async () => {
      const listener = oneEvent(formElement, 'submit');
      element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      const event = await listener;
      expect(event).to.exist;
      expect(event.type).to.equal('submit');
      expect(event!.target).to.equal(formElement);
    });
  });
});
