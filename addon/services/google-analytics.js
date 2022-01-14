/**
  @module fluid
 */
import Service, { inject as service } from '@ember/service';

import { get } from '@ember/object';

/**
  [Google Analytics](https://www.google.com/analytics/) is used to
  for device reporting.

  The easiest setup is to send a page event every time the page
  has transitioned:

  ```javascript
  export default Ember.Route.extend({
    googleAnalytics: Ember.service.inject(),
    sendPageEvent: function () {
      this.get('googleAnalytics').sendPageEvent();
    }.on('didTransition')
  });
  ```

  @class GoogleAnalytics
  @namespace Services
  @public
 */
export default Service.extend({
  pageTitleList: service(),
  router: service(),

  /**
    Sends the page event to Google Analytics.

    @method sendPageEvent
    @public
   */
  sendPageEvent() {
    if (!window.ga) {
      return;
    }

    const title = get(this, 'pageTitleList')
      .toString()
      .replace(/\s-\sMovable Ink$/, '');
    const page = (get(this, 'router.rootURL') + get(this, 'router.currentURL')).replace('//', '/');

    window.ga('send', 'pageview', {
      page,
      title,
    });
  },
});
