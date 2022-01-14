---
title: Fluid Select
category: components
arguments:
  options:
    type: array
    required: true
    description: array of options to be displayed
  label:
    type: string
    required: false
    description: label associated with the select
  select:
    type: function
    required: true
    description: what happens when the select is changed
  selected:
    type: string | value
    required: false
    description: what value is active within the select
  disabled:
    type: boolean
    required: false
    description: disables select
  labelPath:
    type: string
    required: false
    description: when passing option object to select option
  multiple:
    type: boolean
    required: false
    description: enabled multiple selection of options
  search:
    type: function
    required: false
    description: async ability to query on user input
---

# Fluid Select

## Basic

```hbs preview-template
<FluidSelect @options={{array 'apple' 'banana' 'orange'}} @label='fruit' />
```
