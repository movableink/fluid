import Component from '@glimmer/component';
import { action } from '@ember/object';
import tinycolor from 'tinycolor2';

export default class ColorInputComponent extends Component {
  get _color() {
    return tinycolor(this.args.color);
  }

  get value() {
    return this._color.toHexString();
  }

  get alpha() {
    return this._color.getAlpha();
  }

  set alpha(percentage) {
    this._color.setAlpha(percentage);
  }

  @action
  setColor(desiredColor) {
    this.args.color = tinycolor(desiredColor).toRgbString();
  }
}
