---
order: 2
---

# Some Steps Complete

```hbs template
<FluidStepBreadcrumb @steps={{this.firstStep}} />
```

```js component
import Component from '@glimmer/component';

export default class MyDemo extends Component {
  firstStep = [
    { name: 'First', completed: true },
    { name: 'Second', completed: false },
    { name: 'Third', completed: false },
  ];
}
```
