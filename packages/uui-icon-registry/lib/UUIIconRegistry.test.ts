import '../define';

import { assert, expect } from '@open-wc/testing';

import { UUIIconRegistry } from './UUIIconRegistry';

const TEST_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"></svg>';

describe('UUIIconRegistry', () => {
  let registry: UUIIconRegistry;

  beforeEach(async () => {
    registry = new UUIIconRegistry();
  });

  it('Can be constructed', async () => {
    expect(registry).to.exist;
  });

  describe('methods', () => {
    it('has a defineIcon method', () => {
      expect(registry).to.have.property('defineIcon').that.is.a('function');
    });
    it('has a getIcon method', () => {
      expect(registry).to.have.property('getIcon').that.is.a('function');
    });
    it('has a getIcon method returns null if icon does not exist', () => {
      expect(registry.getIcon('NotExisting')).to.be.null;
    });
    it('has a getIconNames method', () => {
      expect(registry).to.have.property('getIconNames').that.is.a('function');
    });
    it('has a getIconNames method returns an array', () => {
      expect(registry.getIconNames()).that.is.a('array');
    });
  });

  describe('define and retrieve icon', () => {
    it('getIcon method returns Promise for existing icons', () => {
      registry.defineIcon('testIcon', TEST_SVG);

      const getIconReturn = registry.getIcon('testIcon');
      expect(getIconReturn).that.is.a('promise');

      expect(getIconReturn).to.be.not.null;
      if (getIconReturn !== null) {
        return getIconReturn.then(function (data) {
          expect(data).to.equal(TEST_SVG);
        });
      }
      return assert.fail('getIcon should not have returned ´null´');
    });
  });
});
