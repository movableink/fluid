---
order: 6
---

# Block Mode

If you need direct access to the inner `input` tag, you can render `FluidTextInput` in block-mode rather than inline-mode. This is more verbose, but allows for more control.

Arguments can be passed to `FluidTextInput` as before, or bound directly to the yielded input component. If you're not sure which to do, provide arguments to the `FluidTextInput` directly!

Note that this should not be used to provide additional styling to the `input` field -- it is already styled correctly!

```hbs template
<FluidTextInput @value='Value' @placeholder='Fill me in!' as |ft|>
  <ft.input />
</FluidTextInput>
```
