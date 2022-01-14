import EmberRouter from '@ember/routing/router';
import config from 'dummy/config/environment';
import { addDocfyRoutes } from '@docfy/ember';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function () {
  addDocfyRoutes(this);
  this.route('test', function () {
    this.route('is-active', function () {
      this.route('named');
      this.route('model', { path: '/model/:id' });
      this.route('query-params');
    });
  });
});

export default Router;
