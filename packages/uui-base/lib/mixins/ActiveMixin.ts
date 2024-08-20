import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

type Constructor<T = {}> = new (...args: any[]) => T;

export declare class ActiveMixinInterface {
  /**
   * Set this boolean to true for then the related composition is sorted.
   * @type {boolean}
   * @attr
   * @prop
   */
  active: boolean;
}

/**
 * This mixin provides functionality to other components to be active using a common `active` property.
 *
 * @param {Object} superClass - superclass to be extended.
 * @mixin
 */
export const ActiveMixin = <T extends Constructor<LitElement>>(
  superClass: T,
) => {
  class ActiveMixinClass extends superClass {
    /**
     * Set this boolean to true for then the related composition is sorted.
     * @type {boolean}
     * @attr
     */
    @property({ type: Boolean, reflect: true })
    public active = false;
  }

  return ActiveMixinClass as unknown as Constructor<ActiveMixinInterface> & T;
};
