---
title: Fluid Drawer
category: components
arguments:
  isOpen:
    type: boolean
    required: true
    description: used open the dialog component
  onClose:
    type: function
    required: true
    description: action fired on close
---

# Fluid Drawer

Component used to for adding content to drawers that slides in from the right side of the screen

## Yielded Blocks

Both `<:title>` and `<:content>` are used when populating the drawer.

```hbs preview-template
<button class='fluid-button type:primary' {{on 'click' (set this 'isOpen' true)}}>
  Title Drawer
</button>

{{#if this.isOpen}}
  <FluidDrawer @isOpen={{true}} @onClose={{set this 'isOpen' false}}>
    <:title>Drawer Title</:title>

    <:content>
      Content!
    </:content>
  </FluidDrawer>
{{/if}}
```
