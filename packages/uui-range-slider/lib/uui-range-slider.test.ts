import {
  html,
  fixture,
  expect,
  elementUpdated,
  oneEvent,
} from '@open-wc/testing';

import { UUIRangeSliderElement } from './uui-range-slider.element';
import { UUIRangeSliderEvent } from './UUIRangeSliderEvent';

const preventSubmit = (e: SubmitEvent) => {
  e.preventDefault();
};

describe('UUIRangeSliderElement', () => {
  let element: UUIRangeSliderElement;
  let inputLow: HTMLInputElement;
  let inputHigh: HTMLInputElement;

  beforeEach(async () => {
    element = await fixture(html` <uui-range-slider></uui-range-slider> `);
    inputLow = element.shadowRoot?.querySelector(
      '#low-input'
    ) as HTMLInputElement;
    inputHigh = element.shadowRoot?.querySelector(
      '#high-input'
    ) as HTMLInputElement;
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUIRangeSliderElement);
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
      expect(inputLow.disabled).to.be.true;
      expect(inputHigh.disabled).to.be.true;
    });
    it('has a label property', () => {
      expect(element).to.have.property('label');
    });
    it('has a valueLow property', () => {
      expect(element).to.have.property('valueLow');
    });
    it('has a valueHigh property', () => {
      expect(element).to.have.property('valueHigh');
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
    it('has a minGap property', () => {
      expect(element).to.have.property('minGap');
    });
    it('has a maxGap property', () => {
      expect(element).to.have.property('maxGap');
    });
    it('has a hideStepValues property', () => {
      expect(element).to.have.property('hideStepValues');
    });
  });

  describe('events', () => {
    describe('change', () => {
      it('emits a change event from inputLow when native input fires one', async () => {
        const listener = oneEvent(element, UUIRangeSliderEvent.CHANGE);
        inputLow.dispatchEvent(new Event('change'));
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUIRangeSliderEvent.CHANGE);
        expect(event!.target).to.equal(element);
      });
      it('emits a change event from inputHigh when native input fires one', async () => {
        const listener = oneEvent(element, UUIRangeSliderEvent.CHANGE);
        inputHigh.dispatchEvent(new Event('change'));
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUIRangeSliderEvent.CHANGE);
        expect(event!.target).to.equal(element);
      });
    });
    describe('input', () => {
      it('emits an input event from inputLow when native input fires one', async () => {
        const listener = oneEvent(element, UUIRangeSliderEvent.INPUT);
        inputLow.dispatchEvent(new Event('input'));
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUIRangeSliderEvent.INPUT);
        expect(event!.target).to.equal(element);
      });
      it('emits an input event from inputHigh when native input fires one', async () => {
        const listener = oneEvent(element, UUIRangeSliderEvent.INPUT);
        inputHigh.dispatchEvent(new Event('input'));
        const event = await listener;
        expect(event).to.exist;
        expect(event.type).to.equal(UUIRangeSliderEvent.INPUT);
        expect(event!.target).to.equal(element);
      });
      it('changes the valueLow to the input value when input event is emitted on inputLow', async () => {
        inputLow.value = '10';
        inputLow.dispatchEvent(new Event('input'));
        expect(element.valueLow).to.equal(10);
      });
      it('changes the valueHigh to the input value when input event is emitted on inputHigh', async () => {
        inputHigh.value = '50';
        inputHigh.dispatchEvent(new Event('input'));
        expect(element.valueHigh).to.equal(50);
      });
    });
  });
});

describe('UUIRangeSlider in a form', () => {
  let formElement: HTMLFormElement;
  let element: UUIRangeSliderElement;
  beforeEach(async () => {
    formElement = await fixture(
      html`<form @submit=${preventSubmit}>
        <uui-range-slider
          label="uui range slider rangerdanger label"
          min="0"
          max="100"
          min-gap="10"
          step="5"
          value-low="20"
          value-high="50"
          name="slider"></uui-range-slider>
      </form>`
    );
    element = formElement.querySelector('uui-range-slider') as any;
  });

  it('valueLow is correct', async () => {
    await expect(element.valueLow).to.be.equal(20);
  });
  it('valueHigh is correct', async () => {
    await expect(element.valueHigh).to.be.equal(50);
  });

  it('form output', async () => {
    const formData = new FormData(formElement);
    await expect(formData.get('slider')).to.be.equal('20,50');
  });

  it('change low and high values and check output', async () => {
    element.valueLow = 10;
    element.valueHigh = 90;
    const formData = new FormData(formElement);
    await expect(formData.get('slider')).to.be.equal('10,90');
  });

  it('change component value and check output', async () => {
    formElement.value = '20,50';
    const formData = new FormData(formElement);
    await expect(formData.get('slider')).to.be.equal('20,50');
  });

  describe('submit', () => {
    it('should submit when pressing enter', async () => {
      const listener = oneEvent(formElement, 'submit');
      element.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));

      const event = await listener;
      expect(event).to.exist;
      expect(event.type).to.equal('submit');
      expect(event!.target).to.equal(formElement);
    });
  });
});
