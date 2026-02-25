import { expect, defineCE } from '@open-wc/testing';
import { UUIRefElement } from './uui-ref.element';

describe('UUIRefListElement', () => {
  let element: any;

  beforeEach(async () => {
    const myRefElementTag = defineCE(class extends UUIRefElement {});
    element = document.createElement(`${myRefElementTag}`);
  });

  describe('properties', () => {
    it('has an error property', () => {
      expect(element).to.have.property('error');
    });

    it('has a disabled property', () => {
      expect(element).to.have.property('disabled');
    });
  });
});
