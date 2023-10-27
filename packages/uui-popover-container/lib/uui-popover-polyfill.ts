// @ts-nocheck
export function polyfill() {
  const originalAddEventListener = this.addEventListener;

  let onBeforeToggle = null;

  // This is the only way to get access to the private functions onFocusOut and onBeforeToggle.
  this.addEventListener = function (type, listener, options) {
    if (type === 'focusout') {
      // focusout doesn't work properly in firefox, so we ignore it.
      return;
    }
    if (type === 'beforetoggle') {
      onBeforeToggle = listener;
      return;
    }
    originalAddEventListener.call(this, type, listener, options);
  };

  const onBeforeToggleProxy = event => {
    this.dispatchEvent(
      new CustomEvent('beforetoggle-polyfill', {
        bubbles: false,
        composed: false,
        detail: {
          oldState: event.oldState,
          newState: event.newState,
        },
      })
    );

    onBeforeToggle(event);
  };

  const findParentPopover = element => {
    if (!element.parentElement) return null;
    if (element.parentElement?.tagName === 'UUI-POPOVER-CONTAINER') {
      return element.parentElement;
    }
    return findParentPopover(element.parentElement);
  };

  const onBeforeTogglePolyfill = event => {
    if (event.detail.newState === 'closed') {
      this.hidePopover();
    }
  };

  this.style.display = 'none';
  this.style.position = 'fixed';
  this.style.inset = '0';
  this.showPopover = () => {
    this.polyfillParent = findParentPopover(this);
    if (this.parentNode !== document.body && this.hasBeenMovedToBody !== true) {
      this.parentNode?.removeChild(this);
      document.body.appendChild(this);

      this.hasBeenMovedToBody = true;
    }
    onBeforeToggleProxy({
      oldState: 'closed',
      newState: 'open',
    });
    this.style.display = 'block';
    this.polyfillParent?.addEventListener(
      'beforetoggle-polyfill',
      onBeforeTogglePolyfill
    );
  };
  this.hidePopover = () => {
    this.polyfillParent?.removeEventListener(
      'beforetoggle-polyfill',
      onBeforeTogglePolyfill
    );
    onBeforeToggleProxy({
      oldState: 'open',
      newState: 'closed',
    });
    this.style.display = 'none';
  };
}
