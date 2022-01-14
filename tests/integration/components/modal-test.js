import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, find, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import td from 'testdouble';
import percySnapshot from '@percy/ember';

module('Integration | Component | modal', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.onClose = td.function();
  });

  test('it renders', async function (assert) {
    await render(hbs`
      <Modal @onClose={{this.onClose}} as |modal|>
        <modal.Title data-test-title>
          This is the title
        </modal.Title>

        <modal.Description data-test-description>
          This is the description
        </modal.Description>

        <button>Modal needs a focus-able child</button>
      </Modal>
    `);

    await percySnapshot(assert);

    assert.dom('[data-test-title]').exists('The content in the modal is displayed');

    await click('[data-test-modal-overlay]');

    assert.verify(this.onClose(), '`@onClose` is called when clicking the overlay');

    const dialog = find('[data-test-modal-dialog]');
    const titleId = dialog.getAttribute('aria-labelledby');
    const descriptionId = dialog.getAttribute('aria-describedby');

    assert
      .dom('[data-test-title]')
      .hasAttribute('id', titleId, 'The `modal.Title` component labels the dialog');
    assert
      .dom('[data-test-description]')
      .hasAttribute('id', descriptionId, 'The `modal.Description` component describes the dialog');
  });
});
