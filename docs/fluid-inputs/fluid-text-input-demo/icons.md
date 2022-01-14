---
order: 7
---

# Icons in Inputs

Building on the block-mode rendering of `FluidTextInput`, you are able to render icons within the input field.

The `@name` argument can be any identifier accepted by `ember-svg-jar`.

```hbs template
<div class='flex flex-col items-start space-y-2'>
  <FluidTextInput @value='Value' @placeholder='Fill me in!' as |ft|>
    <ft.icon @name='search' />
    <ft.input />
  </FluidTextInput>

  <FluidTextInput @useSmallSize={{true}} @value='Value' @placeholder='Fill me in!' as |ft|>
    <ft.icon @name='search' />
    <ft.input />
  </FluidTextInput>
</div>
```
