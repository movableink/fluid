---
order: 3
---

# All Steps Complete

```hbs template
<FluidStepBreadcrumb @steps={{this.allSteps}} />
```

```js component
import Component from '@glimmer/component';

export default class MyDemo extends Component {
  allSteps = [
    { name: 'First', completed: true },
    { name: 'Second', completed: true },
    { name: 'Third', completed: true },
  ];
}
```
