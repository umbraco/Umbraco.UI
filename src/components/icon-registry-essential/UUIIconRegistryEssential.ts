import { UUIIconRegistry } from '../icon-registry/UUIIconRegistry.js';

import {
  iconAdd,
  iconAlert,
  iconAttachment,
  iconCalendar,
  iconCheck,
  iconClipboard,
  iconCode,
  iconColorPicker,
  iconCopy,
  iconDelete,
  iconDocument,
  iconDownload,
  iconEdit,
  iconFavorite,
  iconFolder,
  iconForbidden,
  iconDrag,
  iconInfo,
  iconLink,
  iconLock,
  iconPause,
  iconPicture,
  iconPlay,
  iconRemove,
  iconSearch,
  iconSee,
  iconSettings,
  iconSubtract,
  iconSync,
  iconUnlock,
  iconUnsee,
  iconWand,
  iconWrong,
} from './svgs/index.js';

export class UUIIconRegistryEssential extends UUIIconRegistry {
  constructor() {
    super();

    this.defineIcon('add', iconAdd.strings[0]);
    this.defineIcon('alert', iconAlert.strings[0]);
    this.defineIcon('attachment', iconAttachment.strings[0]);
    this.defineIcon('calendar', iconCalendar.strings[0]);
    this.defineIcon('check', iconCheck.strings[0]);
    this.defineIcon('clipboard', iconClipboard.strings[0]);
    this.defineIcon('code', iconCode.strings[0]);
    this.defineIcon('colorpicker', iconColorPicker.strings[0]);
    this.defineIcon('copy', iconCopy.strings[0]);
    this.defineIcon('delete', iconDelete.strings[0]);
    this.defineIcon('document', iconDocument.strings[0]);
    this.defineIcon('download', iconDownload.strings[0]);
    this.defineIcon('drag', iconDrag.strings[0]);
    this.defineIcon('edit', iconEdit.strings[0]);
    this.defineIcon('favorite', iconFavorite.strings[0]);
    this.defineIcon('folder', iconFolder.strings[0]);
    this.defineIcon('forbidden', iconForbidden.strings[0]);
    this.defineIcon('info', iconInfo.strings[0]);
    this.defineIcon('link', iconLink.strings[0]);
    this.defineIcon('lock', iconLock.strings[0]);
    this.defineIcon('pause', iconPause.strings[0]);
    this.defineIcon('picture', iconPicture.strings[0]);
    this.defineIcon('play', iconPlay.strings[0]);
    this.defineIcon('remove', iconRemove.strings[0]);
    this.defineIcon('search', iconSearch.strings[0]);
    this.defineIcon('see', iconSee.strings[0]);
    this.defineIcon('settings', iconSettings.strings[0]);
    this.defineIcon('subtract', iconSubtract.strings[0]);
    this.defineIcon('sync', iconSync.strings[0]);
    this.defineIcon('unlock', iconUnlock.strings[0]);
    this.defineIcon('unsee', iconUnsee.strings[0]);
    this.defineIcon('wand', iconWand.strings[0]);
    this.defineIcon('wrong', iconWrong.strings[0]);
  }
}
