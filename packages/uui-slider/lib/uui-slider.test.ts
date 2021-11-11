import { html, fixture, expect, elementUpdated } from '@open-wc/testing';
import { UUISliderElement } from './uui-slider.element';
import './index';

describe('UuiSlider', () => {
  let element: UUISliderElement;
  beforeEach(async () => {
    element = await fixture(
      html` <uui-slider label="a slider label"></uui-slider> `
    );
  });
  it('test that disable works', async () => {
    expect(element).to.exist;
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
      html` <form>
        <uui-slider
          label="a slideruui-slider label"
          name="slider"
          value="28"
          step="1"></uui-slider>
      </form>`
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

  describe('validation', () => {
    describe('required', () => {
      beforeEach(async () => {
        element.setAttribute('required', 'true');
        element.value = '';
        await elementUpdated(element);
      });
    
      it('sets element to invalid when value is empty', async () => {    
        expect(element.checkValidity()).to.be.false;
      });
    
      it('sets element to valid when it has a value', async () => {      
        element.value = '90';
        await elementUpdated(element);
        expect(element.checkValidity()).to.be.true;
      });
    
      it('sets the form to invalid when value is empty', async () => {
        expect(formElement.checkValidity()).to.be.false;
      });
    
      it('sets the form to valid when it has a value', async () => {
        element.value = '90';
        await elementUpdated(element);
        expect(formElement.checkValidity()).to.be.true;
      });
    });
    
    describe('custom error', () => {
      beforeEach(async () => {
        element.setAttribute('error', 'true');
        await elementUpdated(element);
      });
    
      it('sets element to invalid when it has a custom error attribute', async () => {
        expect(element.checkValidity()).to.be.false;
      });
    
      it('sets element to valid when it doesnt have a custom error attribute', async () => {      
        element.removeAttribute('error');
        await elementUpdated(element);
        expect(element.checkValidity()).to.be.true;
      });
    
      it('sets the form to invalid when value is empty', async () => {
        expect(formElement.checkValidity()).to.be.false;
      });
    
      it('sets the form to valid when it doesnt have a custom error attribute', async () => {
        element.removeAttribute('error');
        await elementUpdated(element);
        expect(formElement.checkValidity()).to.be.true;
      });
    });
  });

});