import { hbs } from 'ember-cli-htmlbars';
import { action } from '@ember/object';
import SplitButtonDocs from './docs.mdx';

export default {
  title: 'Components/Fluid Button/Split Button',
  argTypes: {
    primaryButtonLabel: {
      name: 'Button Label',
      control: { type: 'text' },
      defaultValue: 'Primary Button'
    },
    options: {
      name: 'Options',
    }
  },
  parameters: {
    docs: {
      page: SplitButtonDocs,
    },
    action: {
      handles: ['click']
    }
  },
}

const Template = (args) => ({
  template: hbs`
    <FluidSplitButton as |s|>
      <s.PrimaryButton
        {{on 'click' this.primaryAction}}
      >
        {{this.primaryButtonLabel}}
      </s.PrimaryButton>

      {{#each this.options as |option|}}
        <s.MenuItem data-test-menu-item {{on 'click' this.menuItemAction}}>
          {{option}}
        </s.MenuItem>
      {{/each}}
    </FluidSplitButton>
  `,
  context: {
    ...args,
    primaryAction: action(function (value) {}),
    menuItemAction: action(function (value) {}),
  },
});

export const Default = Template.bind({});
Default.args = {
  options: [
    'First Item',
    'Second Item',
  ]
};