---
order: 1
---

# No Steps Complete

```hbs template
<FluidStepBreadcrumb @steps={{this.noSteps}} />
```

```js component
import Component from '@glimmer/component';

export default class MyDemo extends Component {
  noSteps = [
    { name: 'First', completed: false },
    { name: 'Second', completed: false },
    { name: 'Third', completed: false },
  ];
}
```
