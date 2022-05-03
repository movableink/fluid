import { hbs } from 'ember-cli-htmlbars';
import Docs from './fluid-tooltip.docs.mdx';

export default {
  title: 'Components/Fluid Tooltip',
  component: 'fluid-tooltip',
  excludeStories: /.*PlacementWarning$/,
  argTypes: {
    tooltipMessage: {
      description: 'String to be displayed on element hover',
      control: { type: 'text', required: false },
      defaultValue: 'template block text',
    },
  },
  parameters: {
    docs: {
      page: Docs,
    },
  },
};

const Template = (args) => ({
  template: hbs`
    <FluidTooltip>
      <:tooltip>
        {{tooltipMessage}}
      </:tooltip>

      <:default as |attachTooltip|>
        <button {{attachTooltip}}>
          Show ToolTip
        </button>
      </:default>
    </FluidTooltip>
  `,
  context: args,
});

export const Default = Template.bind();
