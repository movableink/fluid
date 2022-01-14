---
order: 7
---

# Leading Add-On

The "leading add-on" provides a means for providing a short, one-character label as part of the input field.

The `@letter` argument determines what to display. It will always be rendered upper-case, regardless of what is provided.

```hbs template
<div class='flex flex-col items-start space-y-2'>
  <FluidTextInput @value='Value' @placeholder='Fill me in!' as |ft|>
    <ft.leading @letter='w' />
    <ft.input />
  </FluidTextInput>

  <FluidTextInput @useSmallSize={{true}} @value='Value' @placeholder='Fill me in!' as |ft|>
    <ft.leading @letter='w' />
    <ft.input />
  </FluidTextInput>
</div>
```
