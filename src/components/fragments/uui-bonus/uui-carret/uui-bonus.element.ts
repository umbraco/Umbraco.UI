import {
  LitElement,
  html,
  css,
  svg,
  query,
  queryAll,
  property,
} from 'lit-element';

const logo = svg`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 23.0.3, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
	 viewBox="0 0 530 627.8" x="0px" y="0px">
   <g>

		<path class="st0" d="M48,625c0.4,0.6,1,1,1.8,1h5.7c1.1,0,2-0.9,2-2v-64.4c0-1.1-0.9-2-2-2H44.1c-1.1,0-2,0.9-2,2v51.1
			c-4.8,2.7-10.3,4.1-15.9,4c-7.2,0-10.8-3.2-10.8-10.1v-45c0-1.1-0.9-2-2-2H2c-1.1,0-2,0.9-2,2v46.3c0,13.1,6.2,21.8,23.5,21.8
			c7.9-0.1,15.7-2.6,22.2-7.1l2,4.5L48,625z"/>
		<path class="st0" d="M175.7,577.7c0-13-6.4-21.8-22.7-21.8c-7.8,0-15.4,2.4-21.9,6.8c-2.9-4.2-8.4-6.8-17.5-6.8
			c-7.5,0.1-14.7,2.6-20.6,7.1l-2-4.5l0,0c-0.4-0.6-1-1-1.8-1h-5.7c-1.1,0-2,0.9-2,2v64.4c0,1.1,0.9,2,2,2h11.3c1.1,0,2-0.9,2-2v-51
			c4.3-2.6,9.3-4,14.4-4c6.2,0,9.7,2.3,9.7,8.8V624c0,1.1,0.9,2,2,2h11.3c1.1,0,2-0.9,2-2v-51.1c4.3-2.7,9.3-4.1,14.4-4
			c6,0,9.7,2.3,9.7,8.8V624c0,1.1,0.9,2,2,2h11.3c1.1,0,2-0.9,2-2L175.7,577.7z"/>
		<path class="st0" d="M210.7,620.6c6.4,4.8,14.2,7.3,22.2,7.1c20,0,27.4-13.4,27.4-35.9s-7.4-35.9-27.4-35.9
			c-6.5,0-12.9,1.9-18.4,5.3v-20.7c0-1.1-0.8-2-1.9-2.1c0,0,0,0-0.1,0h-11.4c-1.1,0-2,0.9-2,2V624c0,1.1,0.9,2,2,2h5.7
			c0.7,0,1.4-0.4,1.8-1l0,0L210.7,620.6z M229.3,614.7c-5.2,0-10.3-1.4-14.8-4v-37.8c4.5-2.6,9.6-4,14.8-4
			c13.4,0,15.5,10.3,15.5,22.9S242.8,614.7,229.3,614.7L229.3,614.7z"/>
		<path class="st0" d="M317,569.4c-1.8-0.2-3.5-0.4-5.3-0.3c-6.1-0.3-12.2,1.2-17.5,4.1V624c0,1.1-0.9,2-2,2h-11.3c-1.1,0-2-0.9-2-2
			v-64.4c0-1.1,0.9-2,2-2h5.7c0.7,0,1.4,0.4,1.8,1l0,0l2,4.5c6.2-4.7,13.8-7.2,21.6-7.1c1.8,0,3.6,0.2,5.4,0.5l0,0
			c1,0,1.9,1.7,1.9,2.8v8.2c0,1.1-0.9,2-2,2L317,569.4"/>
		<path class="st0" d="M356.2,594.4c-6.8,0.8-10.8,3.4-10.8,10.5c0,5.2,2.3,10.1,10.5,10.1c5.2,0,10.4-1.5,14.7-4.5v-17.7
			L356.2,594.4z M374.4,620.6c-5.9,4.6-13.2,7.1-20.7,7.1c-17.7,0-23.5-10.9-23.5-21.9c0-14.8,9.6-21.1,25.1-22.3l15.3-1.2v-3.4
			c0-7-3.3-9.7-13.4-9.7c-6.4,0-12.7,1.1-18.7,3.1c-0.2,0-0.4,0-0.6,0c-1.1,0-2-0.9-2-2v-9.1c0-0.9,0.5-1.6,1.3-1.9l0,0
			c6.8-2.3,14-3.4,21.1-3.4c22.5,0,27.6,9.8,27.6,24.4v43.7c0,1.1-0.9,2-2,2h-5.7c-0.7,0-1.4-0.4-1.8-1l0,0L374.4,620.6z"/>
		<path class="st0" d="M452.4,611.9c0.2,0,0.4,0,0.6,0c1.1,0,2,0.9,2,2v9.1c0,0.8-0.5,1.6-1.2,1.9l0,0c-5.7,2-11.6,3-17.6,2.9
			c-24.2,0-31.7-14.5-31.7-35.9s7.4-35.9,31.7-35.9c6-0.2,11.9,0.8,17.5,2.8l0,0c0.8,0.3,1.3,1.1,1.3,1.9v9.1c0,1.1-0.9,2-2,2
			c-0.2,0-0.4,0-0.7,0l0,0c-4.9-1.6-10.1-2.3-15.3-2.2c-13.3,0-17.1,9.1-17.1,22.3s3.8,22.3,17.1,22.3c5.2,0.1,10.3-0.7,15.3-2.3"/>
      <path class="st0" d="M469.1,591.8c0-21.1,6-35.9,30.4-35.9s30.4,14.8,30.4,35.9s-6,35.9-30.4,35.9S469.1,612.9,469.1,591.8z
			 M514.4,591.8c0-14.7-1.9-23-14.9-23s-14.9,8.4-14.9,23s1.9,23,14.9,23S514.4,606.4,514.4,591.8z"/>
	</g>

</svg>
`;

export class UUIBonusElement extends LitElement {
  static styles = [
    css`
      #carret-container {
        width: 100px;
        display: block;
        margin: 30px auto;
        fill: var(--uui-color-violet-blue);
      }
      .st0 {
        transform-origin: center;
      }
    `,
  ];

  @query('#carret-container')
  container!: HTMLElement;

  @queryAll('.st0')
  paths!: SVGPathElement[];

  @property({ type: Boolean, reflect: true, attribute: 'open' })
  isOpen = false;

  private _keyframes = [
    { transform: 'rotateX( 0deg )' },
    { transform: 'rotateX( 180deg )' },
  ];

  private _options: KeyframeAnimationOptions = {
    duration: 1000,
    fill: 'auto',
    // endDelay: -500,
    easing: 'cubic-bezier(.17,-0.88,.82,1.84)',
  };

  public animateLetter(n: number) {
    if (n >= 0) {
      const animation = this.paths[n].animate(this._keyframes, this._options);
      animation.pause();

      animation.play();
      animation.finished.then(() => {
        this.animateLetter(n - 1);
      });
    }
  }

  render() {
    return html`
      <div id="carret-container">${logo}</div>

      <button @click="${() => this.animateLetter(this.paths.length - 1)}">
        Play
      </button>
    `;
  }
}
