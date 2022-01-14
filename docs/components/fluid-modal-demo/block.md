---
order: 3
---

# Block Mode

```hbs template
<button class='fluid-button type:primary' {{on 'click' (set this 'block' true)}}>
  Block Mode
</button>

{{#if this.block}}
  <FluidModal @onClose={{action (set this 'block' false)}}>
    <:header as |Title Icon|>
      <Icon @name='alert' @class='text-yellow-400 fill-current' />
      <Title>Header Content</Title>
    </:header>

    <:default>
      Modal Content
    </:default>

    <:footer>
      <button class='fluid-button size:lg' {{on 'click' (set this 'block' false)}}>
        Close
      </button>
    </:footer>
  </FluidModal>
{{/if}}
```
