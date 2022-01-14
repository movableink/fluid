---
title: Fluid Tooltip
category: components
---

# Fluid Tooltip

```hbs preview-template
<FluidTooltip>
  <:tooltip>
    template block text
  </:tooltip>

  <:default as |attachTooltip|>
    <button {{attachTooltip}}>
      Hover me!
    </button>
  </:default>
</FluidTooltip>
```
