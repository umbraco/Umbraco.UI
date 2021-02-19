import { UUIDesignElement } from './uui-design.element';
import { UUIDesignMeasurementElement } from './uui-design-measurement.element';
import { UUIDesignMeasurementBoxElement } from './uui-design-measurement-box.element';

customElements.define('uui-design', UUIDesignElement);
customElements.define('uui-design-measurement', UUIDesignMeasurementElement);
customElements.define(
  'uui-design-measurement-box',
  UUIDesignMeasurementBoxElement
);
