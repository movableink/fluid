/**
  @module fluid
 */
import FormattableField from '@movable/fluid/components/formattable-field';

/**
  {{url-field}} is a simple text field component
  that extends from {{formattable-field}} to provide a simple input
  for formattable urls.

  ex.
  ```handlebars
  {{url-field value=value
              placeholder=placeholder
              disabled=disabled
              onchange=onchange}}
  ```

  The default formatting checks to see if `value` starts with
  `http://`, and automatically prepends it with `http://` if it does
  not have one on blur.

  You can override `format(url)` by extending this component for your
  formatting needs.

  @public
  @class UrlField
  @extends FormattableField
 */

export default FormattableField.extend({
  classNames: ['url-field'],

  format: function (url) {
    if (url === null) {
      return;
    }
    if (!url.match(/^https?:\/\//)) {
      url = `http://${url}`;
    }

    this.onchange?.(url);
  },
});
