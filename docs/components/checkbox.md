---
title: Fluid Checkbox
category: components
arguments:
  checked:
    type: boolean
    required: false
    description: Is the value checked
  disabled:
    type: boolean
    required: false
    description: Is the checkbox disabled
  label:
    type: string
    required: false
    description: label for checkbox
  onchange:
    type: function
    required: true
    description: what does the checkbox do if changed
---

# Fluid Checkbox

Our checkbox uses [Ember-HeadlessUI Switch Checkbox](https://gavinjoyce.github.io/ember-headlessui/switch/switch-checkbox) as a base. We style it to match our needs.

#### Default

```hbs preview-template
<FluidCheckbox @label='Default' @checked={{this.default}} @onchange={{action (mut this.default)}} />
```

#### Disabled

```hbs preview-template
<FluidCheckbox
  @label='Disabled'
  @disabled={{true}}
  @checked={{this.disabled}}
  @onchange={{action (mut this.disabled)}}
/>
```

#### Block

This option is provided to an escape hatch when needed to pass more than just a title to the component. Please use the [#default](#default) above for most cases.

> Label **Not** Accessible!

```hbs preview-template
<FluidCheckbox @checked={{this.block}} @onchange={{action (mut this.block)}}>
  <span>Block</span>
</FluidCheckbox>
```
