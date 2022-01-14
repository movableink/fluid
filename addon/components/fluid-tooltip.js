import component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { modifier } from 'ember-modifier';

export default class TooltipComponent extends component {
  /** @type {HTMLElement} */
  @tracked attachment;
  @tracked displayTooltip = false;

  attachTooltipModifier = modifier((element) => {
    this.attachment = element;
    this.attachment.addEventListener('mouseenter', () => {
      this.displayTooltip = true;
    });
    this.attachment.addEventListener('mouseleave', () => {
      this.displayTooltip = false;
    });
  });
}
