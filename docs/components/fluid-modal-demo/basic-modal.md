---
order: 1
---

# Basic

```hbs template
<button class='fluid-button type:primary' {{on 'click' (set this 'basic' true)}}>
  Basic Modal
</button>

{{#if this.basic}}
  <FluidModal @onClose={{action (set this 'basic' false)}}>
    <button>I am a bare modal</button>
  </FluidModal>
{{/if}}
```
