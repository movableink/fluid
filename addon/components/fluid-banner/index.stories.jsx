import { hbs } from 'ember-cli-htmlbars';
import { action } from '@ember/object';
import FluidBannerDocs from './docs.mdx';

export default {
  title: 'Components/Fluid Banner',
  argTypes: {
    header: {
      name: '@header',
      control: { type: 'text' },
      defaultValue: 'Default Header',
    },
    icon: {
      name: '@icon',
      control: { type: 'text' },
      defaultValue: false,
    },
  },
  parameters: {
    docs: {
      page: FluidBannerDocs,
    },
  },
  actions: {
    handles: ['click', 'click .fluid-banner--close'],
  },
};

const Template = (args) => ({
  template: hbs`
    <FluidBanner @header={{header}} @icon={{icon}} @type={{type}} @onClose={{onClose}}>
      <p>Body Context</p>
    </FluidBanner>
  `,
  context: {
    ...args,
    onClose: args.onClose
      ? action(function () {
          console.log('Banner Closed');
        })
      : false,
  },
});

export const Destructive = Template.bind({});
Destructive.args = {
  header: 'Destructive Header',
  type: 'destructive',
  icon: 'fluid-banner-destructive',
  onClose: true,
};
export const Informative = Template.bind({});
Informative.args = {
  header: 'Informative Header',
  type: 'info',
  icon: 'fluid-banner-info',
  onClose: true,
};
export const Confirmation = Template.bind({});
Confirmation.args = {
  header: 'Confirmation Header',
  type: 'confirm',
  icon: 'fluid-banner-confirm',
  onClose: true,
};
export const Alert = Template.bind({});
Alert.args = {
  header: 'Alert Header',
  type: 'alert',
  icon: 'fluid-banner-alert',
  onClose: true,
};
export const Default = Template.bind({});
Default.args = {
  header: 'Default Header',
  type: false,
  icon: 'fluid-banner-archive',
  onClose: true,
};

export const WithoutIcon = Template.bind({});
WithoutIcon.args = {
  header: 'Default Header',
  type: false,
  icon: false,
  onClose: true,
};

export const WithoutClose = Template.bind({});
WithoutClose.args = {
  header: 'Default Header',
  type: false,
  icon: 'fluid-banner-archive',
  onClose: false,
};
