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
    element = await fixture(
      html`<uui-range-slider min="10" max="100"></uui-range-slider>`,
    );
    inputLow = element.shadowRoot?.querySelector(
      '#inputLow',
    ) as HTMLInputElement;
    inputHigh = element.shadowRoot?.querySelector(
      '#inputHigh',
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
    it('has a value property', () => {
      expect(element).to.have.property('value');
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

      it('changes the value when the low-end value changes', async () => {
        const LowEnd = '30';
        inputLow.value = LowEnd;
        inputLow.dispatchEvent(new Event('input'));
        expect(element.value).to.equal(`${LowEnd},${inputHigh.value}`);
      });
      it('changes the value when the high-end value changes', async () => {
        const HighEnd = '80';
        inputHigh.value = HighEnd;
        inputHigh.dispatchEvent(new Event('input'));
        expect(element.value).to.equal(`${inputLow.value},${HighEnd}`);
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
          label="ranger-danger slider label"
          value="10,90"
          min="0"
          max="100"
          min-gap="10"
          step="5"
          name="slider"></uui-range-slider>
      </form>`,
    );
    element = formElement.querySelector('uui-range-slider') as any;
  });

  it('Value is correct', async () => {
    await expect(element.value).to.be.equal('10,90');
  });

  it('form output', async () => {
    const formData = new FormData(formElement);
    await expect(formData.get('slider')).to.be.equal('10,90');
  });

  it('change low and high values and check output', async () => {
    element.value = '50,60';
    const formData = new FormData(formElement);
    await expect(formData.get('slider')).to.be.equal('50,60');
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
