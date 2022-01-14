import Mixin from '@ember/object/mixin';
import $ from 'jquery';

const HANDLERS = '_HANDLERS_' + new Date().getTime();
const SCOPE = '_SCOPE_' + new Date().getTime();

function sync(scope, type, handlers) {
  Object.keys(handlers).forEach(function (key) {
    $(scope)[type](key, handlers[key]);
  });
}

export default Mixin.create({
  willDestroyElement() {
    this._super();
    this.unbindEventsFrom(this[SCOPE]);
    this[SCOPE] = null;
  },

  bindEventsFrom(scope, handlers) {
    this[HANDLERS] = handlers;
    this[SCOPE] = scope;
    sync(scope, 'on', handlers);
  },

  unbindEventsFrom(scope) {
    if (this[HANDLERS]) {
      sync(scope, 'off', this[HANDLERS]);
      this[HANDLERS] = null;
    }
  },
});
