---
order: 2
title: Fluid Text Input
category: inputs
arguments:
  value:
    type: string
    required: true
    description: value the input has
  placeholder:
    type: string
    required: false
    description: helper text to display while input has no value
  disabled:
    type: boolean
    required: false
    description: used to disable the input from user interaction
  hasError:
    type: boolean
    required: false
    description: used to enable error state for the input
  hasWarning:
    type: boolean
    required: false
    description: used to enable warning state for input
  useSmallSize:
    type: boolean
    required: false
    description: reduces the size of the input box
---

# Fluid Text Input

Fluid defines a custom Glimmer component that is used to render a text input field: FluidTextInput. This component comes pre-styled to match our design system and supports a number of different states to indicate potential issues to the user.

The basic usage of the component looks like this:

```hbs preview-template
<FluidTextInput @value='Some Value' @placeholder='Fill Me In!' />
```

`@value`, `@placeholder` and `@disabled` are passed as attributes to the underlying input field.

Events can be listened to using the `{{on}}` modifier, the same way you would bind events to a normal `input` element.

```hbs preview-template
<FluidTextInput
  @value={{this.value}}
  @placeholder='Fill Me In!'
  {{on 'input' (pick 'target.value' (set this 'value'))}}
/>
<p>Value: <b>{{this.value}}</b></p>
```
