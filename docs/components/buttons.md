---
order: 1
title: Fluid Buttons
category: components
---

# Fluid Buttons

Fluid defines a set of CSS classes for styling buttons. These classes are shipped as part of our Tailwind CSS plugin and are meant to be used with Tailwind.

## Button Types

##### Basic

```hbs preview-template
<button class='fluid-button'>
  Basic
</button>
```

##### Primary

```hbs preview-template
<button class='fluid-button type:primary'>
  Primary
</button>
```

##### Destructive

```hbs preview-template
<button class='fluid-button type:destructive'>
  Destructive
</button>
```

##### Outline

The style to use when de-emphasizing the button.

The background is transparent, taking on the color of whatever is behind it.

```hbs preview-template
<button class='fluid-button type:outline'>
  Outline
</button>
```

##### Plain

The style to use when de-emphasizing the button.

The background is transparent, taking on the color of whatever is behind it.

```hbs preview-template
<button class='fluid-button type:plain'>
  Plain
</button>
```

###### Customization

The Plain button is can be easily customized to use a different text color, if need be. Any of the Tailwind text- utilities can be applied to override the original color.

```hbs preview-template
<button class='fluid-button type:plain text-green-400 hover:text-green-500'>
  Click Me
</button>
```

## Button Sizes

##### Basic

```hbs preview-template
<button class='fluid-button size'>
  Basic
</button>
```

##### Extra Small

```hbs preview-template
<button class='fluid-button size:xs'>
  Extra Small
</button>
```

##### Small

```hbs preview-template
<button class='fluid-button size:sm'>
  Small
</button>
```

##### Large

```hbs preview-template
<button class='fluid-button size:lg'>
  Large
</button>
```

##### Extra Large

```hbs preview-template
<button class='fluid-button size:xl'>
  Extra Large
</button>
```
