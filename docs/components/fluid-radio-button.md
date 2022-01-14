---
title: Fluid Radio Button
category: components
arguments:
  groupValue:
    type: string
    required: true
    description: what group does the radio button belong to
  value:
    type: any
    require: true
    description: populates the `value` attribute of the radio button
  label:
    type: string
    required: false
    description: label associated with radio button
  changed:
    type: function
    required: true
    description: what happens when the radio button is changed
---

# Fluid Radio Button

Built with [ember-radio-button](https://github.com/yapplabs/ember-radio-button)

A fluid-radio-button will be in a checked state when the value property matches the groupValue property. value should be unique per fluid-radio-button, while the same groupValue should be provided to each fluid-radio-button in the group.

#### Example

```hbs preview-template
<FluidRadioButton
  @label='Option 1'
  @value='foo'
  @changed={{action (mut this.selectedValue)}}
  @groupValue={{this.selectedValue}}
/>

<FluidRadioButton
  @label='Option 2'
  @value='bar'
  @changed={{action (mut this.selectedValue)}}
  @groupValue={{this.selectedValue}}
/>

<dl class='mt-4'>
  <dt>Selected:</dt>
  <dd class='text-red-400'>{{this.selectedValue}}</dd>
</dl>
```
