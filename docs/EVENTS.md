# Events

**Change in version X.Y.Z?**
In version X.Y.Z? the events Bubbles and Composed properties has changed, here is a list of events and the change of them:

| Name                      | Bubbles | Composed | Description                                                                         |
| ------------------------- | ------- | -------- | ----------------------------------------------------------------------------------- |
| UUIEvent                  | No      | No       | No longer bubbles or composed by default.                                           |
| UUIFormControlEvent       | Yes     | No       | No longer composed.                                                                 |
| UUISelectableEvent        | Yes     | No       | No longer composed.                                                                 |
| UUIBooleanInputEvent      | Yes     | No       | No longer composed.                                                                 |
| UUIButtonInlineEvent      | Yes     | Yes      | Not affected.                                                                       |
| UUICardEvent              | No      | No       | No longer bubbles or composed.                                                      |
| UUIColorAreaEvent(s)      | Yes     | No       | No longer composed.                                                                 |
| UUIColorPickerEvent(s)    | Yes     | No       | No longer composed.                                                                 |
| UUIColorSliderEvent(s)    | Yes     | No       | No longer composed.                                                                 |
| UUIColorSwatchesEvent(s)  | Yes     | No       | No longer composed.                                                                 |
| UUIComboboxEvent          | Yes     | No       | No longer composed.                                                                 |
| UUIComboboxListEvent      | Yes     | No       | The event name 'slot-change' is changed to 'inner-slot-change'. No longer composed. |
| UUIFileDropzoneEvent(s)   | Yes     | No       | The event name 'file-change' is changed to 'change'. No longer composed.            |
| UUIIconRequestEvent       | Yes     | Yes      | Not affected.                                                                       |
| UUIInputEvent             | Yes     | No       | No longer composed.                                                                 |
| UUIMenuItemEvent          | No      | No       | No longer bubbles or composed.                                                      |
| UUIPaginationEvent        | Yes     | No       | No longer composed.                                                                 |
| UUIPopoverEvent           | No      | No       | No longer bubbles or composed.                                                      |
| UUIRadioEvent             | Yes     | No       | No longer composed.                                                                 |
| UUIRadioGroupEvent        | Yes     | No       | No longer composed.                                                                 |
| UUIRangeSliderEvent       | Yes     | No       | No longer composed.                                                                 |
| UUIRefEvent               | No      | No       | No longer bubbles or composed.                                                      |
| UUISelectEvent            | Yes     | No       | No longer composed.                                                                 |
| UUISliderEvent(s)         | Yes     | No       | No longer composed.                                                                 |
| UUITabEvent               | No      | No       | No one is dispatching this class.                                                   |
| UUITabGroupEvent          | No      | No       | No one is dispatching this class.                                                   |
| UUITextAreaEvent          | Yes     | No       | No longer composed.                                                                 |
| UUIToastNotificationEvent | No      | No       | No longer bubbles or composed.                                                      |

Also notice events files previously named with a 's' in the end is no longer named this way, they are without the 's' now. (notice only affects direct paths)
