import Service from '@ember/service';

/**
 * This service is provided to the "real" apps by `fantastic-beasts`
 */
export default class CurrentUserService extends Service {
  revisions = {
    dummy: null,
  };
}
