import Component from '@ember/component';
import { action, set } from '@ember/object';
import { reads } from '@ember/object/computed';
import { restartableTask } from 'ember-concurrency';
import { warn } from '@ember/debug';

export default class FluidSelect extends Component {
  tagName = '';

  @reads('searchTask.isRunning') searchLoading;
  @reads('searchTask.lastSuccessful') lastSearch;

  searchQuery = '';

  @restartableTask
  searchTask = function* (searchTerm) {
    if (searchTerm == null || searchTerm === '') {
      return;
    }

    if (this.search) {
      return yield this.search(searchTerm);
    }
  };

  @action
  updateSearchQuery(query) {
    set(this, 'searchQuery', query);
  }

  @action
  updateSelected(value) {
    if (this.select) {
      this.select(value);
    } else {
      warn('`FluidSelect` should not depend on setting `selected` property', true, {
        id: 'fluid.select.ddau',
      });

      set(this, 'selected', value);
    }
  }
}
