---
order: 1
category: date input
---

# Error State

A `@hasError` property can be provided to the **FluidDateInput** that signals that the value in the input is incorrect and must be changed.

```hbs template
<FluidDateInput @value={{this.date}} @onSelect={{set this 'date'}} @hasError={{true}} />
```
