import { hbs } from "ember-cli-htmlbars";
import FluidBannerDocs from './docs.mdx';

export default {
  title: 'Components/Fluid Banner',
  argTypes: {
    header: {
      name: 'Fluid Banner Header',
      control: { type: 'text' },
      defaultValue: 'Fluid Banner Header'
    },
    body: {
      name: 'Fluid Banner Body',
      control: { type: 'text' },
      defaultValue: 'Fluid Banner Body',
    },
    hasIcon: {
      name: 'Fluid Banner Icon',
      control: { type: 'boolean' },
      defaultValue: false,
    }
  },
  parameters: {
    docs: {
      page: FluidBannerDocs
    }
  }
}

const Template = args => ({
  template: hbs`
  <div class='fluid-banner'>
    {{#if hasIcon}}
      <div class='fluid-banner__icon'>
        {{svg-jar 'fallback-icon'}}
      </div>
    {{/if}}
    <div class='fluid-banner__content'>
      <header class='fluid-banner__header'>
        <h1>{{header}}</h1>
      </header>
      <section class='fluid-banner__body'>
        <p>{{body}}</p>
      </section>
    </div>
  </div>
  `,
  context: { ...args }
})

export const Default = Template.bind({});
export const WithIcon = Template.bind({});
WithIcon.args = {
  ...Default.args,
  hasIcon: true,
}