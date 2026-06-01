import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';

/**
 * Outermost scroll level — blue outline.
 * @element uui-popover-container-scroll-level-1
 */
@defineElement('uui-popover-container-scroll-level-1')
export class UUIPopoverContainerScrollLevel1Element extends LitElement {
  render() {
    return html`
      <div class="scroll-host">
        <div class="spacer"></div>
        <slot></slot>
        <div class="spacer"></div>
      </div>
    `;
  }

  static styles = css`
    .scroll-host {
      height: 200px;
      overflow: auto;
      outline: 2px dashed royalblue;
      width: 320px;
    }
    .spacer {
      height: 140px;
    }
  `;
}

/**
 * Middle scroll level — orange outline.
 * @element uui-popover-container-scroll-level-2
 */
@defineElement('uui-popover-container-scroll-level-2')
export class UUIPopoverContainerScrollLevel2Element extends LitElement {
  render() {
    return html`
      <div class="scroll-host">
        <div class="spacer"></div>
        <slot></slot>
        <div class="spacer"></div>
      </div>
    `;
  }

  static styles = css`
    .scroll-host {
      height: 180px;
      overflow: auto;
      outline: 2px dashed darkorange;
      width: 290px;
    }
    .spacer {
      height: 120px;
    }
  `;
}

/**
 * Innermost scroll level — green outline.
 * @element uui-popover-container-scroll-level-3
 */
@defineElement('uui-popover-container-scroll-level-3')
export class UUIPopoverContainerScrollLevel3Element extends LitElement {
  render() {
    return html`
      <div class="scroll-host">
        <div class="spacer"></div>
        <slot></slot>
        <div class="spacer"></div>
      </div>
    `;
  }

  static styles = css`
    .scroll-host {
      height: 160px;
      overflow: auto;
      outline: 2px dashed green;
      width: 260px;
    }
    .spacer {
      height: 100px;
    }
  `;
}
