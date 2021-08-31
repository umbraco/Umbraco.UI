import { expect, fixture, html } from '@open-wc/testing';
import { html as litHTMLLiteral } from 'lit';
import { UUIBooleanInputBaseElement } from './uui-boolean-input-base.element';

class BooleanInputTestElement extends UUIBooleanInputBaseElement {
  renderCheckbox() {
    return litHTMLLiteral`
          <div id="testCheckbox">
          </div>
        `;
  }
}

customElements.define(
  'uui-boolean-input-base-class-test',
  BooleanInputTestElement
);

describe('UUI Boolean input base class', () => {
  let element: BooleanInputTestElement;
  beforeEach(async () => {
    element = await fixture(
      html`<uui-boolean-input-base-class-test
        label="test label"
      ></uui-boolean-input-base-class-test>`
    );
  });

  it('exists', () => {
    expect(element).to.exist;
  });

  it('extends the correct base class', () => {
    expect(
      BooleanInputTestElement.prototype instanceof UUIBooleanInputBaseElement
    ).to.be.true;
  });

  it('has a value', () => {
    expect(element).to.have.own.property('value');
  });
});
