/**
	@module fluid
	*/
import { inject as service } from '@ember/service';

import Helper from '@ember/component/helper';
import { registerDestructor } from '@ember/destroyable';

/**
	Returns whether a route is currently active

	Example:

	```handlebars
	<li class="{{if (is-active 'blog.post') 'active'}}">
		{{link-to post.name "blog.post" post}}
	</li>
	```

	```handlebars
	<li class="{{if (is-active 'blog.post') 'active'}}">
		{{link-to post.name "blog.posts" (query-params page=1)}}
	</li>
	```

	@public
	@method is-active
	@param {String} routeName The route name to check
	@return {Boolean} Whether the route is active
	*/
export default class IsActiveHelper extends Helper {
  @service router;

  constructor(...args) {
    super(...args);
    const routerDidChangeListner = () => {
      this.recompute();
    };
    this.router.on('routeDidChange', routerDidChangeListner);

    registerDestructor(this, () => {
      this.router.off('routeDidChange', routerDidChangeListner);
    });
  }

  compute(positionalParams) {
    return this.router.isActive(...positionalParams);
  }
}
