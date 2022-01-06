import { UUIIconRegistry } from '@umbraco-ui/uui-icon-registry/lib/UUIIconRegistry';
import { iconCheck, iconWrong } from '@umbraco-ui/uui-base/lib/svgs';
import { iconPicture } from './svgs/icon-picture';

export class UUIIconRegistryEssential extends UUIIconRegistry {
  constructor() {
    super();
    this.defineIcon('check', iconCheck.strings[0]);
    this.defineIcon('wrong', iconWrong.strings[0]);
    this.defineIcon('picture', iconPicture.strings[0]);
  }
}
