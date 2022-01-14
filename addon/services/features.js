import { assign } from '@ember/polyfills';
import Service, { inject as service } from '@ember/service';
import { underscore } from '@ember/string';
import { get, computed } from '@ember/object';
import { copy } from 'ember-copy';

/**
  Provides access to features enable for a user's account,
  including products that are enabled for a company.

  To access features in a route / controller / component,
  inject the service and access the name of the feature by
  its known name:

  ```javascript
  import Ember from 'ember';

  let { get } = Ember;

  export default Ember.Route.extend({
    features: Ember.inject.service(),

    beforeModel() {
      if (!get(this, 'features.liveContent')) {
        this.transitionTo('edit');
      }
    }
  });
  ```

  @class Features
  @namespace Services
  @public
 */
export default Service.extend({
  currentUser: service(),

  unknownProperty(key) {
    return (
      !!get(this, `currentUser.features.${underscore(key)}`) ||
      !!get(this, `currentUser.company.products.${underscore(key)}`)
    );
  },

  /**
    A list of all enabled features, sorted alphabetically.
    @property enabled
    @return {String[]} An array of enabled features / products.
    @public
   */
  enabled: computed(function () {
    const features = assign(
      copy(get(this, 'currentUser.features')),
      get(this, 'currentUser.company.products')
    );

    return Object.keys(features)
      .reduce(function (E, key) {
        if (features[key]) {
          E.push(key);
        }
        return E;
      }, [])
      .sort();
  }),
});
