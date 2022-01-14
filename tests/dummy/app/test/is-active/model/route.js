import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return parseInt(params.id, 10);
  },
});
