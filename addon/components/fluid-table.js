import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';

/*
  @class FluidTable
  @yield {Hash} table
  @yield {Component} table.header
  @yield {Component} table.body
  @yield {Component} table.th
  @yield {Component} table.hd
  @argument boolean? isCompressed used for compressing padding.
*/
export default class FluidTableComponent extends Component {
  get tableId() {
    return `${guidFor(this)}`;
  }
}
