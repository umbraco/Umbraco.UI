import './ref.js';
import { UUIRefElement } from './ref.element';

let __defineCECounter = 0;
function defineCE(klass: CustomElementConstructor): string {
  const name = `test-${__defineCECounter++}-${Date.now()}`;
  customElements.define(name, klass);
  return name;
}

describe('UUIRefListElement', () => {
  let element: any;

  beforeEach(async () => {
    const myRefElementTag = defineCE(class extends UUIRefElement {});
    element = document.createElement(`${myRefElementTag}`);
  });

  describe('properties', () => {
    it('has an error property', () => {
      expect(element).toHaveProperty('error');
    });

    it('has a disabled property', () => {
      expect(element).toHaveProperty('disabled');
    });
  });
});
