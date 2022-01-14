import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'FluidModal',
  argTypes: {
    onClose: { action: 'clicked' },
    onPrimaryAction: { action: 'clicked' },
  },
};

export const BasicUsage = (args) => ({
  template: hbs`
    <FluidModal @title="Modal Title" @onClose={{this.onClose}}>
      <:default>
        Modal Body
      </:default>

      <:footer>
        <button class="fluid-button type:primary size:lg" {{on 'click' this.onPrimaryAction}}>
          Primary Action
        </button>

        <button class="fluid-button size:lg" {{on 'click' this.onClose}}>
          Cancel
        </button>
      </:footer>
    </FluidModal>
  `,
  context: {
    ...args,
  },
});

export const HeaderWithIcon = (args) => ({
  template: hbs`
    <FluidModal @onClose={{this.onClose}}>
      <:header as |Title Icon|>
        <Icon @name="alert" @class="text-yellow-400 fill-current" />
        <Title>Modal Title</Title>
      </:header>

      <:default>
        Modal Body
      </:default>

      <:footer>
        <button class="fluid-button type:primary size:lg" {{on 'click' this.onPrimaryAction}}>
          Primary Action
        </button>

        <button class="fluid-button size:lg" {{on 'click' this.onClose}}>
          Cancel
        </button>
      </:footer>
    </FluidModal>
  `,
  context: {
    ...args,
  },
});
