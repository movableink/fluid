import Component from '@ember/component';
import { action, set } from '@ember/object';
import { reads } from '@ember/object/computed';
import { guidFor } from '@ember/object/internals';
import { restartableTask } from 'ember-concurrency';
import { warn } from '@ember/debug';

const OPTION_SELECTOR = '[role="option"]:not([aria-disabled="true"])';
const HIGHLIGHT_CLASS = 'fluid-select__option--highlighted';

export default class FluidSelect extends Component {
  tagName = '';

  @reads('searchTask.isRunning') searchLoading;
  @reads('searchTask.lastSuccessful') lastSearch;

  searchQuery = '';

  listId = `${guidFor(this)}-listbox`;

  activeOptionId = null;
  listElement = null;
  previouslyFocusedElement = null;
  dropdownApi = null;

  @restartableTask
  searchTask = function* (searchTerm) {
    if (searchTerm == null || searchTerm === '') {
      return;
    }

    if (this.search) {
      return yield this.search(searchTerm);
    }
  };

  /**
   * Options are consumer-composable — `list` yields its own block and the popup can be
   * assembled by hand — so read them back out of the DOM rather than tracking them.
   */
  get optionElements() {
    if (!this.listElement) {
      return [];
    }

    return Array.from(this.listElement.querySelectorAll(OPTION_SELECTOR));
  }

  get activeOption() {
    return this.optionElements.find(({ id }) => id === this.activeOptionId) ?? null;
  }

  @action
  registerList(element) {
    this.listElement = element;

    const popup = element.closest('.ember-basic-dropdown-content') ?? element.parentElement;

    if (!popup?.contains(document.activeElement)) {
      element.focus({ preventScroll: true });
    }
  }

  /**
   * Options report themselves rather than the list enumerating them: `list` renders them
   * through the `await` helper, so none of them exist yet when the list is inserted.
   */
  @action
  registerOption(element) {
    if (element.getAttribute('aria-selected') === 'true' || !this.activeOptionId) {
      this.activateOption(element);
    }
  }

  @action
  handleOpen(dropdown, event) {
    this.dropdownApi = dropdown;
    this.previouslyFocusedElement = document.activeElement;

    if (this.onOpen) {
      this.onOpen(dropdown, event);
    }
  }

  @action
  handleClose(dropdown, event) {
    this.dropdownApi = null;
    this.activeOptionId = null;
    this.listElement = null;

    const previous = this.previouslyFocusedElement;
    this.previouslyFocusedElement = null;

    if (previous && previous.isConnected) {
      previous.focus();
    }

    if (this.onClose) {
      this.onClose(dropdown, event);
    }
  }

  /**
   * Written straight to the DOM. Routing the active option through the template
   * re-renders the popup, which makes ember-basic-dropdown recompute its position,
   * which re-renders the popup — an unbreakable loop.
   */
  activateOption(option) {
    this.activeOption?.classList.remove(HIGHLIGHT_CLASS);
    this.activeOptionId = option?.id ?? null;

    // Whichever element holds focus is the one that must carry the pointer: the search
    // input when there is one, otherwise the listbox itself.
    const popup = this.listElement?.closest('.ember-basic-dropdown-content');

    for (const host of [this.listElement, popup?.querySelector('[role="combobox"]')]) {
      if (!host) {
        continue;
      } else if (this.activeOptionId) {
        host.setAttribute('aria-activedescendant', this.activeOptionId);
      } else {
        host.removeAttribute('aria-activedescendant');
      }
    }

    if (option) {
      option.classList.add(HIGHLIGHT_CLASS);
      option.scrollIntoView({ block: 'nearest' });
    }
  }

  moveActiveOption(offset) {
    const options = this.optionElements;

    if (!options.length) {
      return;
    }

    const current = options.indexOf(this.activeOption);
    const next = current === -1 ? 0 : (current + offset + options.length) % options.length;

    this.activateOption(options[next]);
  }

  activateOptionAt(index) {
    const options = this.optionElements;
    this.activateOption(index < 0 ? options[options.length - 1] : options[index]);
  }

  selectActiveOption() {
    this.activeOption?.click();
  }

  @action
  handleKeyDown(event) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.moveActiveOption(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.moveActiveOption(-1);
        break;
      case 'Home':
        event.preventDefault();
        this.activateOptionAt(0);
        break;
      case 'End':
        event.preventDefault();
        this.activateOptionAt(-1);
        break;
      case 'Enter':
        event.preventDefault();
        this.selectActiveOption();
        break;
      case ' ':
        // Never in the search input, where the space bar has to keep typing spaces.
        if (event.target.tagName !== 'INPUT') {
          event.preventDefault();
          this.selectActiveOption();
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.dropdownApi?.actions.close(event);
        break;
      default:
        break;
    }
  }

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
