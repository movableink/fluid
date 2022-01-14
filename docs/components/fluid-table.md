# Fluid Table

This component is just a wrapper for the following yields:

- `<table.header>`
- `<table.body>`
- `<table.th>`
- `<table.td>`

#### Default

```hbs preview-template
<FluidTable as |table|>
  <table.header>
    <table.th>CSS Selector</table.th>
    <table.th>Label</table.th>
    <table.th>Preview</table.th>
    <table.th>Type</table.th>
  </table.header>
  <table.body>
    <tr>
      <table.td>.pip-summary &gt; h1</table.td>
      <table.td>column-row</table.td>
      <table.td>Teal Ombre Reactive Glaze Vase</table.td>
      <table.td>Text</table.td>
    </tr>
    <tr>
      <table.td>.hero-container .hero-image #hero</table.td>
      <table.td>column-row</table.td>
      <table.td>{{svg-jar 'picture-file'}}</table.td>
      <table.td>Image</table.td>
    </tr>
    <tr>
      <table.td>.accordion-component li</table.td>
      <table.td>column-row</table.td>
      <table.td>
        Handcrafted of china clay using a reactive technique that allows shades of green.
      </table.td>
      <table.td>Text</table.td>
    </tr>
  </table.body>
</FluidTable>
```

#### Compressed

```hbs preview-template
<FluidTable @isCompressed={{true}} as |table|>
  <table.header>
    <table.th>CSS Selector</table.th>
    <table.th>Label</table.th>
    <table.th>Preview</table.th>
    <table.th>Type</table.th>
  </table.header>
  <table.body>
    <tr>
      <table.td>.pip-summary &gt; h1</table.td>
      <table.td>column-row</table.td>
      <table.td>Teal Ombre Reactive Glaze Vase</table.td>
      <table.td>Text</table.td>
    </tr>
    <tr>
      <table.td>.hero-container .hero-image #hero</table.td>
      <table.td>column-row</table.td>
      <table.td>{{svg-jar 'picture-file'}}</table.td>
      <table.td>Image</table.td>
    </tr>
    <tr>
      <table.td>.accordion-component li</table.td>
      <table.td>column-row</table.td>
      <table.td>
        Handcrafted of china clay using a reactive technique that allows shades of green.
      </table.td>
      <table.td>Text</table.td>
    </tr>
  </table.body>
</FluidTable>
```
