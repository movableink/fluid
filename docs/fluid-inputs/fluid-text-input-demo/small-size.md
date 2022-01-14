---
order: 4
---

# Small Size

A "small" input can be used for cases where the size constraints of the environment are severely limited.

These should be used very sparingly, as the smaller input size is less accessible for users.

```hbs template
<div class='flex flex-col items-start space-y-2'>
  <FluidTextInput @value='Some Value' @placeholder='Fill Me In!' @useSmallSize={{true}} />
  <FluidTextInput
    @value='Some Value'
    @placeholder='Fill Me In!'
    @useSmallSize={{true}}
    @hasError={{true}}
  />
  <FluidTextInput
    @value='Some Value'
    @placeholder='Fill Me In!'
    @useSmallSize={{true}}
    @hasWarning={{true}}
  />
  <FluidTextInput
    @value='Some Value'
    @placeholder='Fill Me In!'
    @useSmallSize={{true}}
    @disabled={{true}}
  />
</div>
```
