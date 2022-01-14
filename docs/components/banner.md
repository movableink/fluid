---
title: Fluid Banner
category: components
---

# Fluid Banner

#### Default

```hbs preview-template
<div class='my-6'>
  <div class='fluid-banner'>
    <div class='fluid-banner__content'>
      <header class='fluid-banner__header'>
        <h1>Fluid banner Header</h1>
      </header>
      <section class='fluid-banner__body'>
        <p>Fluid banner body</p>
      </section>
    </div>
  </div>
</div>
```

#### With Icon

```hbs preview-template
<div class='mb-6'>
  <div class='fluid-banner'>
    <div class='fluid-banner__icon'>
      {{svg-jar 'fallback-icon'}}
    </div>
    <div class='fluid-banner__content'>
      <header class='fluid-banner__header'>
        <h1>Fluid banner Header</h1>
      </header>
      <section class='fluid-banner__body'>
        <p>Fluid banner body</p>
      </section>
    </div>
  </div>
</div>
```
