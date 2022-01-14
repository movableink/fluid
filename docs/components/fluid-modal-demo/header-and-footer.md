---
order: 2
---

# With Header & Footer

```hbs template
<button class='fluid-button type:primary' {{on 'click' (set this 'header' true)}}>
  With Header & Footer
</button>

{{#if this.header}}
  <FluidModal @title='Header Content' @onClose={{action (set this 'header' false)}}>
    <:default>
      Modal Content
    </:default>

    <:footer>
      <button class='fluid-button size:lg' {{on 'click' (set this 'header' false)}}>
        Close
      </button>
    </:footer>
  </FluidModal>
{{/if}}
```
