/**
  @module fluid
 */
import { inject as service } from '@ember/service';

import Helper from '@ember/component/helper';
import { get } from '@ember/object';

/**
  Returns whether a feature is enabled or not.

  Example:

  ```handlebars
  {{#if (feature-enabled 'new-nav-bar')}}
    {{partial 'new-nav'}}
  {{else}}
    {{partial 'nav'}}
  {{/if}}
  ```

  @public
  @method feature-enabled
  @param {String} flag The feature flag to check for
  @return {Boolean} Whether the flag is enabled
  @for Helpers
 */
export default Helper.extend({
  features: service(),

  compute([flag]) {
    return get(this, `features.${flag}`);
  },
});
