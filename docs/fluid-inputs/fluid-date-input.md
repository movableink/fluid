---
order: 3
category: inputs
arguments:
  value:
    type: date
    required: false
    description: The selected date in the picker
  placeholder:
    type: string
    required: false
    description: Text to display if the @value is undefined
  minDate:
    type: date
    required: false
    description: The earliest date that is allowed to be selected
  maxDate:
    type: date
    required: false
    description: The latest date that is allowed to be selected
  onSelect:
    type: function
    required: true
    description: Called with the updated value when a new date is selected
  hasError:
    type: boolean
    required: false
    description: Displays the input in an "error" state
  hasWarning:
    type: boolean
    required: false
    description: Displays the input in a "warning" state
---

# Fluid Date Input

Fluid defines a custom Glimmer component that is used to render a date picker: `FluidDateInput`. This component comes pre-styled to match our design system and supports a number of different states to indicate potential issues to the user.

The basic usage of the component looks like this:

```hbs preview-template
<FluidDateInput @value={{this.date}} @placeholder='Select a Date' @onSelect={{set this 'date'}} />
```

The button, when clicked, triggers a date picker pop-up powered by `ember-power-calendar`.

When clicking outside of the popup, or upon selecting a new date, the
