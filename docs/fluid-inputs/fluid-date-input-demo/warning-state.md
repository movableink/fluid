---
order: 2
---

# Warning State

A `@hasWarning` property can be provided to the **FluidDateInput** that signals that the value in the input is might be incorrect. The value should still be accepted, but we need to draw attention to the input for some reason.

```hbs template
<FluidDateInput @value={{this.date}} @onSelect={{set this 'date'}} @hasWarning={{true}} />
```
