---
order: 5
---

# Button Pairings

```hbs template
<div class='flex items-center space-x-2 mb-2'>
  <FluidTextInput @value='Some Value' @placeholder='Fill Me In!' />
  <button class='fluid-button size:lg'>
    Click Me
  </button>
</div>

<div class='flex items-center space-x-2'>
  <FluidTextInput @value='Some Value' @placeholder='Fill Me In!' @useSmallSize={{true}} />
  <button class='fluid-button'>
    Click Me
  </button>
</div>
```
