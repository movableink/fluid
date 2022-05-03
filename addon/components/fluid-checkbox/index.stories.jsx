import { hbs } from 'ember-cli-htmlbars';
import { action } from '@ember/object';

import CheckboxDocs from './docs.mdx';

export default {
  title: 'Components/Fluid Checkbox',
  parameters: {
    docs: {
      page: CheckboxDocs,
    },
    actions: {
      handles: ['click', 'click .btn'],
    },
  },
};
const Template = (args) => ({
  template: hbs`
    {{#unless blockHtml}}
      <FluidCheckbox
        @label={{label}}
        @disabled={{disabled}}
        @checked={{this.checked}}
        @onchange={{onchange}}
      />
    {{else}}
      <div class='mb-6'>
        <div class='fluid-banner'>
          <div class='fluid-banner__icon'>
            {{svg-jar 'fallback-icon'}}
          </div>
          <div class='fluid-banner__content'>
            <header class='fluid-banner__header'>
              <h1>Warning:</h1>
            </header>
            <section class='fluid-banner__body'>
              <p>Passing HTML as label will not allow \`label\` to be checked. You <em>MUST</em> click the \`checkbox\` directly.</p>
            </section>
          </div>
        </div>
      </div>


      <FluidCheckbox
        @disabled={{disabled}}
        @checked={{this.checked}}
        @onchange={{onchange}}
      >
        {{{blockHtml}}}
      </FluidCheckbox>

    {{/unless}}
  `,
  context: {
    ...args,
    onchange: action(function (value) {
      this.set('checked', value);
    }),
  },
});

export const Default = Template.bind({});
Default.args = {
  label: 'Default Checkbox',
  checked: false,
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled Checkbox',
  checked: false,
  disabled: true,
};

export const Block = Template.bind({});
Block.args = {
  blockHtml: '<span>Block Label</span>',
  checked: false,
  disabled: false,
};
