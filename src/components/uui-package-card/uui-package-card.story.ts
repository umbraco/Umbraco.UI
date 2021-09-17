import { html } from 'lit-html';
import './index';

export default {
  title: 'Displays/Card/Package Card',
  component: 'uui-package-card',
};

export const Default = () => html`
  <div style="width: 300px">
    <uui-package-card selectable>
      <div
        style="border-radius: 3px;border: 1px solid transparent;text-decoration: none!important;background-color: #fff;"
      >
        <div style="display:flex; justify-content:center; padding:10px;">
          <img
            style="max-width: 70px;"
            src="https://our.umbraco.com/media/wiki/7686/635995894969426269_forms-logopng.png"
          />
        </div>

        <div style="padding: 15px;text-align: center;">
          <div
            style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:14px;font-weight:700;margin-bottom:5px;"
          >
            Umbraco Forms
          </div>
          <div
            style="font-size:12px;color:#68676b;word-wrap:break-word;line-height:1.1rem;"
          >
            Everyone deserves a form creator that's
            <!----><span
              ng-if="package.excerpt > (package.excerpt | limitTo: 40)"
              >...</span
            ><!---->
          </div>

          <div
            style="display:flex;flex-wrap:wrap;flex-direction:row;justify-content:center;opacity:.6;margin-top:10px;"
          >
            <small
              style="padding:0 5px;display:flex;alignt-items:center;justify-content:center"
            >
              <span
                style="display:inline-block;width:1em;height:1em;flex-shrink:0;"
                aria-hidden="true"
                icon="icon-download-alt"
              >
                <!----><span ng-if="svgString" ng-bind-html="svgString"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M348.842 268.008v30.672h59.451v91.495h-304.42V298.68h59.484v-30.672H73.23v152.807h365.737V268.008h-90.125zm25.343-78.879h-77.666V90.827h-82.768v98.302h-77.632l119.033 144.245 119.033-144.245z"
                    ></path></svg></span
                ><!---->
                <!---->
              </span>
              <strong>968066</strong>
            </small>
            <small
              style="padding:0 5px;display:flex;alignt-items:center;justify-content:center"
            >
              <span
                style="display:inline-block;width:1em;height:1em;flex-shrink:0;"
                aria-hidden="true"
                icon="icon-hearts"
              >
                <!----><span ng-if="svgString" ng-bind-html="svgString"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M343.37 94.976c-42.628 0-82.753 17.632-87.626 59.189-4.857-41.558-44.981-59.189-87.64-59.189-45.962 0-78.255 49.901-78.255 96.14 0 105.434 166.958 225.643 166.958 225.643S421.64 296.549 421.64 191.115c0-46.238-32.277-96.139-78.27-96.139z"
                    ></path></svg></span
                ><!---->
                <!---->
              </span>
              <strong>59</strong>
            </small>
          </div>
          <div style="margin-top:8px;font-size:11px;height:11px;">
            <div>
              <span
                style="color:#2eadaf!important;display:inline-block;width:1em;height:1em;flex-shrink:0;"
                aria-hidden="true"
                icon="icon-cloud"
              >
                <!----><span
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M413.692 236.421a103.48 103.48 0 003.359-26.2c0-57.111-46.296-103.405-103.403-103.405-42.939 0-79.759 26.176-95.39 63.438-13.423-15.778-33.413-25.799-55.753-25.799-40.423 0-73.194 32.77-73.194 73.194 0 6.952.989 13.667 2.8 20.039-33.008 12.104-56.537 43.798-56.537 81.021 0 47.615 38.58 86.271 86.245 86.271h265.897c47.688 0 86.269-38.656 86.269-86.271-.001-38.613-25.323-71.271-60.293-82.288z"
                    ></path></svg></span
                ><!---->
                <!---->
              </span>
              <span
                ><localize key="packager_verifiedToWorkOnUmbracoCloud"
                  >Verified to work on Umbraco Cloud</localize
                ></span
              >
            </div>
          </div>
        </div>
      </div>
    </uui-package-card>
  </div>
`;
