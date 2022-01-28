import { defineElement } from '@umbraco-ui/uui-base/lib/registration';

import { UUIRadioGroupElement } from '../lib/uui-radio-group.element';
import { UUIRadioElement } from '../lib/uui-radio.element';

defineElement('uui-radio', UUIRadioElement);
defineElement('uui-radio-group', UUIRadioGroupElement);
