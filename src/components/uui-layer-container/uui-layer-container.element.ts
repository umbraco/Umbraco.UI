import { LitElement, html, css } from 'lit';
import { query } from 'lit/decorators';
import { UUILayerElement } from '../uui-layer/uui-layer.element';
import { UUILayerEvent } from '../uui-layer/UUILayerEvent';

/**
 *  @element uui-layer-container
 *  @description - Layer container component, inject layers into this manager component.
 */
export class UUILayerContainerElement extends LitElement {
  static styles = [
    css`
      :host {
        position: absolute;
        width: 100%;
        height: 100%;
      }

      ::slotted(.backdrop)::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.25);
      }
    `,
  ];

  @query('slot') protected slotElement!: HTMLSlotElement;

  protected layers: UUILayerElement[] = [];

  private queryLayers(): void {
    this.layers = (this.slotElement as HTMLSlotElement)
      .assignedElements({ flatten: true })
      .filter((e: Node) => e instanceof UUILayerElement) as UUILayerElement[];

    this.layers.forEach(el => {
      el.addEventListener(
        UUILayerEvent.CLOSE,
        this.onLayerClose as EventHandlerNonNull
      );
      el.addEventListener(
        UUILayerEvent.CLOSE,
        this.onLayerClosed as EventHandlerNonNull
      );
    });

    this.updateShadowLayer();
  }

  private onLayerClose(e: UUILayerEvent) {
    console.log(e);
  }
  private onLayerClosed(e: UUILayerEvent) {
    console.log(e);
  }

  private currentBackdropLayer: UUILayerElement | null = null;

  private updateShadowLayer() {
    // Find the top layer, thats visible and provide shadow for it.
    const visibleLayers = this.layers.filter(el => el.visible === true);

    const firstLayer = visibleLayers.pop();
    if (firstLayer) {
      firstLayer.classList.add('backdrop');
      if (this.currentBackdropLayer) {
        this.currentBackdropLayer.classList.remove('backdrop');
      }
      this.currentBackdropLayer = firstLayer;
    }
  }

  render() {
    return html` <slot @slotchanged=${this.queryLayers}></slot> `;
  }
}
