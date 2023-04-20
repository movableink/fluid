'use strict';

define("dummy/tests/assertions/testdouble", ["qunit", "testdouble", "testdouble-qunit"], function (_qunit, _testdouble, _testdoubleQunit) {
  "use strict";

  (0, _testdoubleQunit.default)(_qunit.default, _testdouble.default);
});
define("dummy/tests/helpers/assertions", [], function () {
  "use strict";

  /* global QUnit */

  function intersects(actual, expected) {
    return Object.keys(expected).every(function (key) {
      return QUnit.equiv(actual[key], expected[key]);
    });
  }
  QUnit.extend(QUnit.assert, {
    contains(actual, expected, message) {
      this.push(actual.indexOf(expected) !== -1, actual, expected, message);
    },
    intersects(actual, expected, message) {
      let ok = true;
      if (Array.isArray(expected)) {
        for (let i = 0, len = expected.length; i < len; i++) {
          ok = ok && intersects(actual[i], expected[i]);
        }
      } else {
        ok = intersects(actual, expected);
      }
      this.push(ok, actual, expected, message);
    }
  });
});
define("dummy/tests/helpers/destroy-app", ["exports", "@ember/runloop"], function (_exports, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = destroyApp;
  function destroyApp(application) {
    (0, _runloop.run)(application, 'destroy');
  }
});
define("dummy/tests/helpers/ember-power-calendar", ["exports", "@ember/test", "ember-power-calendar/test-support"], function (_exports, _test, _testSupport) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;
  function _default() {
    (0, _test.registerAsyncHelper)('calendarCenter', async function (app, selector, newCenter) {
      return (0, _testSupport.calendarCenter)(selector, newCenter);
    });
    (0, _test.registerAsyncHelper)('calendarSelect', async function (app, selector, selected) {
      return (0, _testSupport.calendarSelect)(selector, selected);
    });
  }
});
define("dummy/tests/helpers/module-for-acceptance", ["exports", "qunit", "rsvp", "dummy/tests/helpers/start-app", "dummy/tests/helpers/destroy-app"], function (_exports, _qunit, _rsvp, _startApp, _destroyApp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;
  function _default(name, options = {}) {
    (0, _qunit.module)(name, {
      beforeEach() {
        this.application = (0, _startApp.default)();
        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },
      afterEach() {
        const afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return (0, _rsvp.resolve)(afterEach).then(() => (0, _destroyApp.default)(this.application));
      }
    });
  }
});
define("dummy/tests/helpers/percy-snapshot", ["exports", "@percy/ember"], function (_exports, _ember) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.createSnapshotName = createSnapshotName;
  _exports.default = percySnapshotWithLabel;
  _exports.nameFromAssert = nameFromAssert;
  /**
   * @param {Assert|string} assert
   * @return {string}
   */
  function nameFromAssert(assert) {
    if (assert.test?.module?.name && assert.test?.testName) {
      return `${assert.test.module.name} | ${assert.test.testName}`;
    } else {
      return assert;
    }
  }

  /**
   * @param {Assert|string} assert
   * @param {string} label
   * @return {string}
   */
  function createSnapshotName(assert, label) {
    if (label) {
      return `${nameFromAssert(assert)} | ${label}`;
    }
    return nameFromAssert(assert);
  }

  /**
   * Wrapper for the default `percySnapshot` helper that allows for optionally
   * providing an extra label for your assertion. This is useful when putting multiple
   * snapshots in a single test.
   *
   * @param {Assert|string} assert
   * @param {string|object} labelOrOptions
   * @param {object} optionsOrNothing
   */
  function percySnapshotWithLabel(assert, labelOrOptions, optionsOrNothing) {
    let label = labelOrOptions;
    let options = optionsOrNothing;

    // Handle options provided as second argument w/o additional label
    if (typeof labelOrOptions !== 'string') {
      options = label;
      label = undefined;
    }
    return (0, _ember.default)(createSnapshotName(assert, label), options);
  }
});
define("dummy/tests/helpers/start-app", ["exports", "dummy/app", "dummy/config/environment", "@ember/polyfills", "@ember/runloop", "dummy/tests/helpers/percy/register-helpers"], function (_exports, _app, _environment, _polyfills, _runloop, _registerHelpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = startApp;
  function startApp(attrs) {
    let attributes = (0, _polyfills.assign)({}, _environment.default.APP);
    attributes.autoboot = true;
    attributes = (0, _polyfills.assign)(attributes, attrs); // use defaults, but you can override;

    return (0, _runloop.run)(() => {
      const application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define("dummy/tests/integration/components/expanding-list-test", ["@ember/template-factory", "sinon", "qunit", "ember-qunit", "@percy/ember", "@ember/test-helpers"], function (_templateFactory, _sinon, _qunit, _emberQunit, _ember, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | component | fluid-lab/expanding-list', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('the header and content subcomponents yield to a block', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidLab::ExpandingList as |list|>
              <list.Header>
                <div data-test-expanding-list-header-block>
                  Header
                </div>
              </list.Header>
              <list.Content>
                <div data-test-expanding-list-content-block>
                  Content
                </div>
              </list.Content>
            </FluidLab::ExpandingList>
          
      */
      {
        "id": "uNMJjhT1",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        \"],[8,[30,1,[\"Header\"]],null,null,[[\"default\"],[[[[1,\"\\n          \"],[10,0],[14,\"data-test-expanding-list-header-block\",\"\"],[12],[1,\"\\n            Header\\n          \"],[13],[1,\"\\n        \"]],[]]]]],[1,\"\\n        \"],[8,[30,1,[\"Content\"]],null,null,[[\"default\"],[[[[1,\"\\n          \"],[10,0],[14,\"data-test-expanding-list-content-block\",\"\"],[12],[1,\"\\n            Content\\n          \"],[13],[1,\"\\n        \"]],[]]]]],[1,\"\\n      \"]],[1]]]]],[1,\"\\n    \"]],[\"list\"],false,[\"fluid-lab/expanding-list\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('[data-test-expanding-list-header-block]').exists();
      assert.dom('[data-test-expanding-list-content-block]').exists();
    });
    (0, _qunit.test)('the header expands the content on click', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidLab::ExpandingList
              @expanded={{false}} as |list|>
              <list.Header>
                <h2>Header</h2>
              </list.Header>
              <list.Content>
                <div data-test-expanding-list-content>
                  Content
                </div>
              </list.Content>
            </FluidLab::ExpandingList>
          
      */
      {
        "id": "IBwrwoMr",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@expanded\"],[false]],[[\"default\"],[[[[1,\"\\n        \"],[8,[30,1,[\"Header\"]],null,null,[[\"default\"],[[[[1,\"\\n          \"],[10,\"h2\"],[12],[1,\"Header\"],[13],[1,\"\\n        \"]],[]]]]],[1,\"\\n        \"],[8,[30,1,[\"Content\"]],null,null,[[\"default\"],[[[[1,\"\\n          \"],[10,0],[14,\"data-test-expanding-list-content\",\"\"],[12],[1,\"\\n            Content\\n          \"],[13],[1,\"\\n        \"]],[]]]]],[1,\"\\n      \"]],[1]]]]],[1,\"\\n    \"]],[\"list\"],false,[\"fluid-lab/expanding-list\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('[data-test-expanding-list-content]').doesNotExist();
      await (0, _testHelpers.click)('[data-test-fluid-lab-expanding-list-header]');
      assert.dom('[data-test-expanding-list-content]').exists();
    });
    (0, _qunit.test)('the toggle expands the content on click', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidLab::ExpandingList @expanded={{false}} as |list|>
              <list.Toggle/>
              <list.Content>
                <div data-test-toggle-content>
                  Content
                </div>
              </list.Content>
            </FluidLab::ExpandingList>
          
      */
      {
        "id": "3eH3RSqp",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@expanded\"],[false]],[[\"default\"],[[[[1,\"\\n        \"],[8,[30,1,[\"Toggle\"]],null,null,null],[1,\"\\n        \"],[8,[30,1,[\"Content\"]],null,null,[[\"default\"],[[[[1,\"\\n          \"],[10,0],[14,\"data-test-toggle-content\",\"\"],[12],[1,\"\\n            Content\\n          \"],[13],[1,\"\\n        \"]],[]]]]],[1,\"\\n      \"]],[1]]]]],[1,\"\\n    \"]],[\"list\"],false,[\"fluid-lab/expanding-list\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('[data-test-toggle-content]').doesNotExist();
      await (0, _testHelpers.click)('[data-test-fluid-lab-expanding-list-toggle]');
      assert.dom('[data-test-toggle-content]').exists();
    });
    (0, _qunit.test)('the toggle expands the content on click when nested inside the header', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidLab::ExpandingList @expanded={{false}} as |list|>
              <list.Header>
                <list.Toggle/>
              </list.Header>
              <list.Content>
                <div data-test-toggle-content>
                  Content
                </div>
              </list.Content>
            </FluidLab::ExpandingList>
          
      */
      {
        "id": "WYsuQjnO",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@expanded\"],[false]],[[\"default\"],[[[[1,\"\\n        \"],[8,[30,1,[\"Header\"]],null,null,[[\"default\"],[[[[1,\"\\n          \"],[8,[30,1,[\"Toggle\"]],null,null,null],[1,\"\\n        \"]],[]]]]],[1,\"\\n        \"],[8,[30,1,[\"Content\"]],null,null,[[\"default\"],[[[[1,\"\\n          \"],[10,0],[14,\"data-test-toggle-content\",\"\"],[12],[1,\"\\n            Content\\n          \"],[13],[1,\"\\n        \"]],[]]]]],[1,\"\\n      \"]],[1]]]]],[1,\"\\n    \"]],[\"list\"],false,[\"fluid-lab/expanding-list\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('[data-test-toggle-content]').doesNotExist();
      await (0, _testHelpers.click)('[data-test-fluid-lab-expanding-list-toggle]');
      assert.dom('[data-test-toggle-content]').exists();
    });
    (0, _qunit.test)('the component can be rendered DDAU', async function (assert) {
      this.set('expanded', false);
      const callback = _sinon.default.fake();
      this.onChange = () => {
        this.set('expanded', !this.expanded);
        callback();
      };
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidLab::ExpandingList
              @expanded={{this.expanded}}
              @onChange={{action this.onChange}}
              as |list|
            >
              <list.Header/>
            </FluidLab::ExpandingList>
          
      */
      {
        "id": "3oL12n4I",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@expanded\",\"@onChange\"],[[30,0,[\"expanded\"]],[28,[37,1],[[30,0],[30,0,[\"onChange\"]]],null]]],[[\"default\"],[[[[1,\"\\n        \"],[8,[30,1,[\"Header\"]],null,null,null],[1,\"\\n      \"]],[1]]]]],[1,\"\\n    \"]],[\"list\"],false,[\"fluid-lab/expanding-list\",\"action\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _testHelpers.click)('[data-test-fluid-lab-expanding-list-header]');
      await (0, _testHelpers.click)('[data-test-fluid-lab-expanding-list-header]');
      assert.equal(callback.callCount, 2);
    });
    (0, _qunit.module)('percy tests', function () {
      (0, _qunit.test)('renders all possible states', async function (assert) {
        await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
        /*
          
                <div class="cartridge-form studio-sidebar" style="margin:0 auto;">
                  <FluidLab::ExpandingList as |list|>
                    <list.Header>
                      {{list.Toggle}}
                      <h5>
                        Expanded w/toggle
                      </h5>
                    </list.Header>
                    <list.Content>
                      <section data-test-expanded-with-toggle-content>
                        <p>
                          Crew of the Planet Express:
                        </p>
                        <ul>
                          <li>
                            Leela
                          </li>
                          <li>
                            Bender
                          </li>
                          <li>
                            Fry
                          </li>
                        </ul>
                      </section>
                    </list.Content>
                  </FluidLab::ExpandingList>
                  <FluidLab::ExpandingList @expanded={{false}} as |list|>
                    <list.Header>
                      {{list.Toggle}}
                      <h5>
                        Collapsed w/toggle
                      </h5>
                    </list.Header>
                    <list.Content>
                      <section data-test-collapsed-with-toggle-content>
                        <p>
                          Crew of the Planet Express:
                        </p>
                        <ul>
                          <li>
                            Leela
                          </li>
                          <li>
                            Bender
                          </li>
                          <li>
                            Fry
                          </li>
                        </ul>
                      </section>
                    </list.Content>
                  </FluidLab::ExpandingList>
                  <FluidLab::ExpandingList @disabled={{true}} as |list|>
                    <list.Header>
                      <h5>
                        Expanded w/o toggle
                      </h5>
                    </list.Header>
                    <list.Content>
                      <section data-test-expanded-without-toggle-content>
                        <p>
                          Crew of the Planet Express:
                        </p>
                        <ul>
                          <li>
                            Leela
                          </li>
                          <li>
                            Bender
                          </li>
                          <li>
                            Fry
                          </li>
                        </ul>
                      </section>
                    </list.Content>
                  </FluidLab::ExpandingList>
                  <FluidLab::ExpandingList @disabled={{true}} as |list|>
                    <list.Header>
                      {{list.Toggle}}
                      <h5>
                        Disabled w/toggle
                      </h5>
                    </list.Header>
                    <list.Content>
                      <section data-test-disabled-with-toggle-content>
                        <p>
                          Crew of the Planet Express:
                        </p>
                        <ul>
                          <li>
                            Leela
                          </li>
                          <li>
                            Bender
                          </li>
                          <li>
                            Fry
                          </li>
                        </ul>
                      </section>
                    </list.Content>
                  </FluidLab::ExpandingList>
                </div>
              
        */
        {
          "id": "PU7ZUodd",
          "block": "[[[1,\"\\n        \"],[10,0],[14,0,\"cartridge-form studio-sidebar\"],[14,5,\"margin:0 auto;\"],[12],[1,\"\\n          \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n            \"],[8,[30,1,[\"Header\"]],null,null,[[\"default\"],[[[[1,\"\\n              \"],[1,[30,1,[\"Toggle\"]]],[1,\"\\n              \"],[10,\"h5\"],[12],[1,\"\\n                Expanded w/toggle\\n              \"],[13],[1,\"\\n            \"]],[]]]]],[1,\"\\n            \"],[8,[30,1,[\"Content\"]],null,null,[[\"default\"],[[[[1,\"\\n              \"],[10,\"section\"],[14,\"data-test-expanded-with-toggle-content\",\"\"],[12],[1,\"\\n                \"],[10,2],[12],[1,\"\\n                  Crew of the Planet Express:\\n                \"],[13],[1,\"\\n                \"],[10,\"ul\"],[12],[1,\"\\n                  \"],[10,\"li\"],[12],[1,\"\\n                    Leela\\n                  \"],[13],[1,\"\\n                  \"],[10,\"li\"],[12],[1,\"\\n                    Bender\\n                  \"],[13],[1,\"\\n                  \"],[10,\"li\"],[12],[1,\"\\n                    Fry\\n                  \"],[13],[1,\"\\n                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n            \"]],[]]]]],[1,\"\\n          \"]],[1]]]]],[1,\"\\n          \"],[8,[39,0],null,[[\"@expanded\"],[false]],[[\"default\"],[[[[1,\"\\n            \"],[8,[30,2,[\"Header\"]],null,null,[[\"default\"],[[[[1,\"\\n              \"],[1,[30,2,[\"Toggle\"]]],[1,\"\\n              \"],[10,\"h5\"],[12],[1,\"\\n                Collapsed w/toggle\\n              \"],[13],[1,\"\\n            \"]],[]]]]],[1,\"\\n            \"],[8,[30,2,[\"Content\"]],null,null,[[\"default\"],[[[[1,\"\\n              \"],[10,\"section\"],[14,\"data-test-collapsed-with-toggle-content\",\"\"],[12],[1,\"\\n                \"],[10,2],[12],[1,\"\\n                  Crew of the Planet Express:\\n                \"],[13],[1,\"\\n                \"],[10,\"ul\"],[12],[1,\"\\n                  \"],[10,\"li\"],[12],[1,\"\\n                    Leela\\n                  \"],[13],[1,\"\\n                  \"],[10,\"li\"],[12],[1,\"\\n                    Bender\\n                  \"],[13],[1,\"\\n                  \"],[10,\"li\"],[12],[1,\"\\n                    Fry\\n                  \"],[13],[1,\"\\n                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n            \"]],[]]]]],[1,\"\\n          \"]],[2]]]]],[1,\"\\n          \"],[8,[39,0],null,[[\"@disabled\"],[true]],[[\"default\"],[[[[1,\"\\n            \"],[8,[30,3,[\"Header\"]],null,null,[[\"default\"],[[[[1,\"\\n              \"],[10,\"h5\"],[12],[1,\"\\n                Expanded w/o toggle\\n              \"],[13],[1,\"\\n            \"]],[]]]]],[1,\"\\n            \"],[8,[30,3,[\"Content\"]],null,null,[[\"default\"],[[[[1,\"\\n              \"],[10,\"section\"],[14,\"data-test-expanded-without-toggle-content\",\"\"],[12],[1,\"\\n                \"],[10,2],[12],[1,\"\\n                  Crew of the Planet Express:\\n                \"],[13],[1,\"\\n                \"],[10,\"ul\"],[12],[1,\"\\n                  \"],[10,\"li\"],[12],[1,\"\\n                    Leela\\n                  \"],[13],[1,\"\\n                  \"],[10,\"li\"],[12],[1,\"\\n                    Bender\\n                  \"],[13],[1,\"\\n                  \"],[10,\"li\"],[12],[1,\"\\n                    Fry\\n                  \"],[13],[1,\"\\n                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n            \"]],[]]]]],[1,\"\\n          \"]],[3]]]]],[1,\"\\n          \"],[8,[39,0],null,[[\"@disabled\"],[true]],[[\"default\"],[[[[1,\"\\n            \"],[8,[30,4,[\"Header\"]],null,null,[[\"default\"],[[[[1,\"\\n              \"],[1,[30,4,[\"Toggle\"]]],[1,\"\\n              \"],[10,\"h5\"],[12],[1,\"\\n                Disabled w/toggle\\n              \"],[13],[1,\"\\n            \"]],[]]]]],[1,\"\\n            \"],[8,[30,4,[\"Content\"]],null,null,[[\"default\"],[[[[1,\"\\n              \"],[10,\"section\"],[14,\"data-test-disabled-with-toggle-content\",\"\"],[12],[1,\"\\n                \"],[10,2],[12],[1,\"\\n                  Crew of the Planet Express:\\n                \"],[13],[1,\"\\n                \"],[10,\"ul\"],[12],[1,\"\\n                  \"],[10,\"li\"],[12],[1,\"\\n                    Leela\\n                  \"],[13],[1,\"\\n                  \"],[10,\"li\"],[12],[1,\"\\n                    Bender\\n                  \"],[13],[1,\"\\n                  \"],[10,\"li\"],[12],[1,\"\\n                    Fry\\n                  \"],[13],[1,\"\\n                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n            \"]],[]]]]],[1,\"\\n          \"]],[4]]]]],[1,\"\\n        \"],[13],[1,\"\\n      \"]],[\"list\",\"list\",\"list\",\"list\"],false,[\"fluid-lab/expanding-list\"]]",
          "moduleName": "(unknown template module)",
          "isStrictMode": false
        }));
        assert.dom('[data-test-expanded-with-toggle-content]').isVisible();
        assert.dom('[data-test-collapsed-with-toggle-content]').isNotVisible();
        assert.dom('[data-test-expanded-without-toggle-content]').isVisible();
        assert.dom('.expanding-list-header__disabled svg').isNotVisible();
        assert.dom('.expanding-list-header__disabled .expanding-list-toggle__disabled.expanded').exists();
        await (0, _ember.default)(assert);
      });
    });
  });
});
define("dummy/tests/integration/components/fluid-banner-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers", "dummy/tests/helpers/percy-snapshot"], function (_templateFactory, _qunit, _emberQunit, _testHelpers, _percySnapshot) {
  "use strict";

  (0, _qunit.module)('Integration | Component | fluid-banner', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function () {
      this.mockAction = () => {};
    });
    (0, _qunit.test)('it renders default type', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <div class="flex flex-col gap-4">
              <FluidBanner
                @header="Default w/Icon & Close"
                @icon="fluid-banner-archive"
                @onClose={{this.mockAction}}
              >
                <p>
                  Body Content
                </p>
              </FluidBanner>
      
              <FluidBanner
                @header="Default w/o Icon"
                @onClose={{this.mockAction}}
              >
                <p>
                  Body Content
                </p>
              </FluidBanner>
      
              <FluidBanner
                @header="Default w/o Close"
                @icon="fluid-banner-archive"
              >
                <p>
                  Body Content
                </p>
              </FluidBanner>
      
              <FluidBanner
                @header="Default w/o Icon or Close"
              >
                <p>
                  Body Content
                </p>
              </FluidBanner>
            </div>
          
      */
      {
        "id": "F1tVHLGe",
        "block": "[[[1,\"\\n      \"],[10,0],[14,0,\"flex flex-col gap-4\"],[12],[1,\"\\n        \"],[8,[39,0],null,[[\"@header\",\"@icon\",\"@onClose\"],[\"Default w/Icon & Close\",\"fluid-banner-archive\",[30,0,[\"mockAction\"]]]],[[\"default\"],[[[[1,\"\\n          \"],[10,2],[12],[1,\"\\n            Body Content\\n          \"],[13],[1,\"\\n        \"]],[]]]]],[1,\"\\n\\n        \"],[8,[39,0],null,[[\"@header\",\"@onClose\"],[\"Default w/o Icon\",[30,0,[\"mockAction\"]]]],[[\"default\"],[[[[1,\"\\n          \"],[10,2],[12],[1,\"\\n            Body Content\\n          \"],[13],[1,\"\\n        \"]],[]]]]],[1,\"\\n\\n        \"],[8,[39,0],null,[[\"@header\",\"@icon\"],[\"Default w/o Close\",\"fluid-banner-archive\"]],[[\"default\"],[[[[1,\"\\n          \"],[10,2],[12],[1,\"\\n            Body Content\\n          \"],[13],[1,\"\\n        \"]],[]]]]],[1,\"\\n\\n        \"],[8,[39,0],null,[[\"@header\"],[\"Default w/o Icon or Close\"]],[[\"default\"],[[[[1,\"\\n          \"],[10,2],[12],[1,\"\\n            Body Content\\n          \"],[13],[1,\"\\n        \"]],[]]]]],[1,\"\\n      \"],[13],[1,\"\\n    \"]],[],false,[\"fluid-banner\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _percySnapshot.default)(assert);
      assert.dom('.fluid-banner').exists({
        count: 4
      });
      assert.dom('.fluid-banner--icon').exists({
        count: 2
      });
      assert.dom('.fluid-banner--close').exists({
        count: 2
      });
    });
    ['destructive', 'info', 'confirm', 'alert'].forEach(type => {
      (0, _qunit.test)(`it renders ${type} type`, async function (assert) {
        this.type = type;
        await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
        /*
          
                <div class="flex flex-col gap-4">
                  <FluidBanner
                    @type={{this.type}}
                    @header={{concat this.type " w/Icon & Close"}}
                    @icon={{concat "fluid-banner-" this.type}}
                    @onClose={{this.mockAction}}
                  >
                    <p>
                      Body Content
                    </p>
                  </FluidBanner>
        
                  <FluidBanner
                    @type={{this.type}}
                    @header={{concat this.type " w/o Icon"}}
                    @onClose={{this.mockAction}}
                  >
                    <p>
                      Body Content
                    </p>
                  </FluidBanner>
        
                  <FluidBanner
                    @type={{this.type}}
                    @header={{concat this.type " w/o Close"}}
                    @icon={{concat "fluid-banner-" this.type}}
                  >
                    <p>
                      Body Content
                    </p>
                  </FluidBanner>
        
                  <FluidBanner
                    @type={{this.type}}
                    @header={{concat this.type " w/o Icon or Close"}}
                  >
                    <p>
                      Body Content
                    </p>
                  </FluidBanner>
                </div>
              
        */
        {
          "id": "3yHksrzT",
          "block": "[[[1,\"\\n        \"],[10,0],[14,0,\"flex flex-col gap-4\"],[12],[1,\"\\n          \"],[8,[39,0],null,[[\"@type\",\"@header\",\"@icon\",\"@onClose\"],[[30,0,[\"type\"]],[28,[37,1],[[30,0,[\"type\"]],\" w/Icon & Close\"],null],[28,[37,1],[\"fluid-banner-\",[30,0,[\"type\"]]],null],[30,0,[\"mockAction\"]]]],[[\"default\"],[[[[1,\"\\n            \"],[10,2],[12],[1,\"\\n              Body Content\\n            \"],[13],[1,\"\\n          \"]],[]]]]],[1,\"\\n\\n          \"],[8,[39,0],null,[[\"@type\",\"@header\",\"@onClose\"],[[30,0,[\"type\"]],[28,[37,1],[[30,0,[\"type\"]],\" w/o Icon\"],null],[30,0,[\"mockAction\"]]]],[[\"default\"],[[[[1,\"\\n            \"],[10,2],[12],[1,\"\\n              Body Content\\n            \"],[13],[1,\"\\n          \"]],[]]]]],[1,\"\\n\\n          \"],[8,[39,0],null,[[\"@type\",\"@header\",\"@icon\"],[[30,0,[\"type\"]],[28,[37,1],[[30,0,[\"type\"]],\" w/o Close\"],null],[28,[37,1],[\"fluid-banner-\",[30,0,[\"type\"]]],null]]],[[\"default\"],[[[[1,\"\\n            \"],[10,2],[12],[1,\"\\n              Body Content\\n            \"],[13],[1,\"\\n          \"]],[]]]]],[1,\"\\n\\n          \"],[8,[39,0],null,[[\"@type\",\"@header\"],[[30,0,[\"type\"]],[28,[37,1],[[30,0,[\"type\"]],\" w/o Icon or Close\"],null]]],[[\"default\"],[[[[1,\"\\n            \"],[10,2],[12],[1,\"\\n              Body Content\\n            \"],[13],[1,\"\\n          \"]],[]]]]],[1,\"\\n        \"],[13],[1,\"\\n      \"]],[],false,[\"fluid-banner\",\"concat\"]]",
          "moduleName": "(unknown template module)",
          "isStrictMode": false
        }));
        await (0, _percySnapshot.default)(assert);
        assert.dom('.fluid-banner').exists({
          count: 4
        });
        assert.dom('.fluid-banner').hasClass(`type:${this.type}`);
        assert.dom('.fluid-banner--icon').exists({
          count: 2
        });
        assert.dom('.fluid-banner--close').exists({
          count: 2
        });
      });
    });
  });
});
define("dummy/tests/integration/components/fluid-checkbox-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers", "testdouble", "@percy/ember"], function (_templateFactory, _qunit, _emberQunit, _testHelpers, _testdouble, _ember) {
  "use strict";

  (0, _qunit.module)('Integration | Component | fluid-checkbox', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.module)('rendering', function () {
      (0, _qunit.test)('with a `@label` argument', async function (assert) {
        await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
        /*
          
                <FluidCheckbox data-test-input @label="The label" />
              
        */
        {
          "id": "gWEp7aJO",
          "block": "[[[1,\"\\n        \"],[8,[39,0],[[24,\"data-test-input\",\"\"]],[[\"@label\"],[\"The label\"]],null],[1,\"\\n      \"]],[],false,[\"fluid-checkbox\"]]",
          "moduleName": "(unknown template module)",
          "isStrictMode": false
        }));
        await (0, _ember.default)(assert);
        assert.dom('[data-test-input]').hasText('The label', 'it renders the passed label');
        const {
          id: labelId
        } = (0, _testHelpers.find)('label');
        assert.dom('[data-test-input] [role="checkbox"]').hasAria('labelledby', labelId, 'It connects the label element to the checkbox');
      });
      (0, _qunit.test)('with a block label', async function (assert) {
        await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
        /*
          
                <FluidCheckbox data-test-input>
                  The block label
                </FluidCheckbox>
              
        */
        {
          "id": "EJcB5rui",
          "block": "[[[1,\"\\n        \"],[8,[39,0],[[24,\"data-test-input\",\"\"]],null,[[\"default\"],[[[[1,\"\\n          The block label\\n        \"]],[]]]]],[1,\"\\n      \"]],[],false,[\"fluid-checkbox\"]]",
          "moduleName": "(unknown template module)",
          "isStrictMode": false
        }));
        await (0, _ember.default)(assert);
        assert.dom('[data-test-input]').hasText('The block label', 'it accepts the label as a block');
      });
      (0, _qunit.test)('when `@checked` is `true`', async function (assert) {
        await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
        /*
          
                <FluidCheckbox
                  data-test-input
                  @checked={{true}}
                />
              
        */
        {
          "id": "icQtfbkr",
          "block": "[[[1,\"\\n        \"],[8,[39,0],[[24,\"data-test-input\",\"\"]],[[\"@checked\"],[true]],null],[1,\"\\n      \"]],[],false,[\"fluid-checkbox\"]]",
          "moduleName": "(unknown template module)",
          "isStrictMode": false
        }));
        await (0, _ember.default)(assert);
        assert.dom('[data-test-input] label').doesNotExist('The label is not rendered');
        assert.dom('[data-test-input] [role="checkbox"]').hasAria('checked', 'true');
      });
      (0, _qunit.test)('when `@checked` is `false`', async function (assert) {
        await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
        /*
          
                <FluidCheckbox
                  data-test-input
                  @checked={{false}}
                />
              
        */
        {
          "id": "LR6OQLIP",
          "block": "[[[1,\"\\n        \"],[8,[39,0],[[24,\"data-test-input\",\"\"]],[[\"@checked\"],[false]],null],[1,\"\\n      \"]],[],false,[\"fluid-checkbox\"]]",
          "moduleName": "(unknown template module)",
          "isStrictMode": false
        }));
        await (0, _ember.default)(assert);
        assert.dom('[data-test-input] [role="checkbox"]').hasAria('checked', 'false');
      });
      (0, _qunit.test)('when `@disabled` is `true`', async function (assert) {
        await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
        /*
          
                <FluidCheckbox
                  data-test-input
                  @disabled={{true}}
                />
              
        */
        {
          "id": "+AZTvE6t",
          "block": "[[[1,\"\\n        \"],[8,[39,0],[[24,\"data-test-input\",\"\"]],[[\"@disabled\"],[true]],null],[1,\"\\n      \"]],[],false,[\"fluid-checkbox\"]]",
          "moduleName": "(unknown template module)",
          "isStrictMode": false
        }));
        await (0, _ember.default)(assert);
        assert.dom('[data-test-input] [role="checkbox"]').isDisabled();
      });
    });
    (0, _qunit.test)('calling `@onchange` on click', async function (assert) {
      this.isChecked = false;
      this.onchange = _testdouble.default.function();
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidCheckbox
              data-test-input
              @checked={{this.isChecked}}
              @onchange={{this.onchange}}
            />
          
      */
      {
        "id": "2yXSBSD1",
        "block": "[[[1,\"\\n      \"],[8,[39,0],[[24,\"data-test-input\",\"\"]],[[\"@checked\",\"@onchange\"],[[30,0,[\"isChecked\"]],[30,0,[\"onchange\"]]]],null],[1,\"\\n    \"]],[],false,[\"fluid-checkbox\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));

      // Click while not checked
      await (0, _testHelpers.click)('[data-test-input] [role="checkbox"]');
      assert.verify(this.onchange(true));

      // Click while checked
      this.set('isChecked', true);
      await (0, _testHelpers.click)('[data-test-input] [role="checkbox"]');
      assert.verify(this.onchange(false));
    });
    (0, _qunit.test)('calling `@onchange` on key-press', async function (assert) {
      this.isChecked = false;
      this.onchange = _testdouble.default.function();
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidCheckbox
              data-test-input
              @checked={{this.isChecked}}
              @onchange={{this.onchange}}
            />
          
      */
      {
        "id": "2yXSBSD1",
        "block": "[[[1,\"\\n      \"],[8,[39,0],[[24,\"data-test-input\",\"\"]],[[\"@checked\",\"@onchange\"],[[30,0,[\"isChecked\"]],[30,0,[\"onchange\"]]]],null],[1,\"\\n    \"]],[],false,[\"fluid-checkbox\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));

      // key press while not checked
      await (0, _testHelpers.triggerKeyEvent)('[data-test-input] [role="checkbox"]', 'keyup', 32);
      assert.verify(this.onchange(true));

      // key press while checked
      this.set('isChecked', true);
      await (0, _testHelpers.triggerKeyEvent)('[data-test-input] [role="checkbox"]', 'keyup', 32);
      assert.verify(this.onchange(false));
    });
  });
});
define("dummy/tests/integration/components/fluid-date-input-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers", "@percy/ember", "testdouble", "sinon"], function (_templateFactory, _qunit, _emberQunit, _testHelpers, _ember, _testdouble, _sinon) {
  "use strict";

  (0, _qunit.module)('Integration | Component | fluid-date-input', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function () {
      // Ensure the "current date" is stable for Percy snapshots
      this.clock = _sinon.default.useFakeTimers({
        now: new Date('11/30/2020')
      });
      this.handleSelect = _testdouble.default.function();
    });
    (0, _qunit.test)('displaying the selected date', async function (assert) {
      this.date = new Date('11/20/2020');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidDateInput
              data-test-date-input=''
              @value={{this.date}}
              @onSelect={{this.handleSelect}}
            />
          
      */
      {
        "id": "Yyi/fJJD",
        "block": "[[[1,\"\\n      \"],[8,[39,0],[[24,\"data-test-date-input\",\"\"]],[[\"@value\",\"@onSelect\"],[[30,0,[\"date\"]],[30,0,[\"handleSelect\"]]]],null],[1,\"\\n    \"]],[],false,[\"fluid-date-input\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _ember.default)(assert);
      assert.dom('button').containsText('Nov 20, 2020', 'Shows the selected date in the expected format');
      await (0, _testHelpers.click)('[data-test-date-input]');
      assert.dom('[data-date="2020-11-20"]').hasAttribute('data-test-selected', '', 'The current value is selected in the calendar');
    });
    (0, _qunit.test)('displaying the placeholder', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidDateInput
              @placeholder="Select a Date"
              @onSelect={{this.handleSelect}}
            />
          
      */
      {
        "id": "xe6wHe2c",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@placeholder\",\"@onSelect\"],[\"Select a Date\",[30,0,[\"handleSelect\"]]]],null],[1,\"\\n    \"]],[],false,[\"fluid-date-input\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _ember.default)(assert);
      assert.dom('button').containsText('Select a Date', 'Shows the "placeholder" text');
    });
    (0, _qunit.test)('navigating to different months', async function (assert) {
      this.date = new Date('11/20/2020');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidDateInput
              data-test-date-input=''
              @value={{this.date}}
              @onSelect={{this.handleSelect}}
            />
          
      */
      {
        "id": "Yyi/fJJD",
        "block": "[[[1,\"\\n      \"],[8,[39,0],[[24,\"data-test-date-input\",\"\"]],[[\"@value\",\"@onSelect\"],[[30,0,[\"date\"]],[30,0,[\"handleSelect\"]]]],null],[1,\"\\n    \"]],[],false,[\"fluid-date-input\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _testHelpers.click)('[data-test-date-input]');
      assert.dom('[data-date="2020-11-20"]').exists('The calendar is centered on the selected date');
      await (0, _testHelpers.click)('[data-test-calendar-nav-control="next"]');
      assert.dom('[data-date="2020-11-20"]').doesNotExist('The selected date is no longer visible');
      assert.dom('[data-date="2020-12-20"]').exists('The next month is visible');

      // Select another date and re-open the calendar
      await (0, _testHelpers.click)('[data-date="2020-12-20"]');
      await (0, _testHelpers.click)('[data-test-date-input]');
      assert.dom('[data-date="2020-11-20"]').exists('The calendar is centered on the selected date again, rather than the previous "center" selection');
    });
    (0, _qunit.test)('selecting a new date', async function (assert) {
      this.date = new Date('11/20/2020');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidDateInput
              data-test-date-input=''
              @value={{this.date}}
              @onSelect={{this.handleSelect}}
            />
          
      */
      {
        "id": "Yyi/fJJD",
        "block": "[[[1,\"\\n      \"],[8,[39,0],[[24,\"data-test-date-input\",\"\"]],[[\"@value\",\"@onSelect\"],[[30,0,[\"date\"]],[30,0,[\"handleSelect\"]]]],null],[1,\"\\n    \"]],[],false,[\"fluid-date-input\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _testHelpers.click)('[data-test-date-input]');

      // Snapshot with the date picker open
      await (0, _ember.default)(assert);
      await (0, _testHelpers.click)('[data-date="2020-11-21"]');
      assert.verify(this.handleSelect(new Date('11/21/2020')), 'Called the `onSelect` handler with the selected date');
      assert.dom('[data-test-fluid-date-input-calendar]').doesNotExist('Date picker is dismissed after selecting a value');
    });
    (0, _qunit.test)('dismissing the popup when clicking outside', async function (assert) {
      this.date = new Date('11/20/2020');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <button data-test-some-outside-element></button>
      
            <FluidDateInput
              data-test-date-input=''
              @value={{this.date}}
              @onSelect={{this.handleSelect}}
            />
          
      */
      {
        "id": "G5eJXw7M",
        "block": "[[[1,\"\\n      \"],[10,\"button\"],[14,\"data-test-some-outside-element\",\"\"],[12],[13],[1,\"\\n\\n      \"],[8,[39,0],[[24,\"data-test-date-input\",\"\"]],[[\"@value\",\"@onSelect\"],[[30,0,[\"date\"]],[30,0,[\"handleSelect\"]]]],null],[1,\"\\n    \"]],[],false,[\"fluid-date-input\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));

      // Open the picker
      await (0, _testHelpers.click)('[data-test-date-input]');
      assert.dom('[data-test-fluid-date-input-calendar]').exists('Date picker is opened on click');

      // Open the picker again while it's already open
      await (0, _testHelpers.click)('[data-test-date-input]');
      assert.dom('[data-test-fluid-date-input-calendar]').exists('Date picker is still open after clicking the trigger again');

      // Click something inside the picker, that is *not* selecting a date
      await (0, _testHelpers.click)('[data-test-calendar-nav-control="next"]');
      assert.dom('[data-test-fluid-date-input-calendar]').exists('Date picker is still open after clicking something inside the picker');

      // Click something outside the picker elements
      await (0, _testHelpers.click)('[data-test-some-outside-element]');
      assert.dom('[data-test-fluid-date-input-calendar]').doesNotExist('Date picker is closed after clicking on an element outside the element');
    });
    (0, _qunit.test)('setting a minimum date', async function (assert) {
      this.date = new Date('11/20/2020');
      this.minDate = new Date('11/19/2020');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidDateInput
              data-test-date-input=''
              @value={{this.date}}
              @minDate={{this.minDate}}
              @onSelect={{this.handleSelect}}
            />
          
      */
      {
        "id": "wX43ysGA",
        "block": "[[[1,\"\\n      \"],[8,[39,0],[[24,\"data-test-date-input\",\"\"]],[[\"@value\",\"@minDate\",\"@onSelect\"],[[30,0,[\"date\"]],[30,0,[\"minDate\"]],[30,0,[\"handleSelect\"]]]],null],[1,\"\\n    \"]],[],false,[\"fluid-date-input\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _testHelpers.click)('[data-test-date-input]');
      await (0, _ember.default)(assert);
      assert.dom('[data-date="2020-11-19"]').isNotDisabled('The minimum date is still selectable');
      assert.dom('[data-date="2020-11-18"]').isDisabled('Dates before the minimum date are not selectable');
    });
    (0, _qunit.test)('setting a maximum date', async function (assert) {
      this.date = new Date('11/20/2020');
      this.maxDate = new Date('11/21/2020');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidDateInput
              data-test-date-input=''
              @value={{this.date}}
              @maxDate={{this.maxDate}}
              @onSelect={{this.handleSelect}}
            />
          
      */
      {
        "id": "srjDI7pG",
        "block": "[[[1,\"\\n      \"],[8,[39,0],[[24,\"data-test-date-input\",\"\"]],[[\"@value\",\"@maxDate\",\"@onSelect\"],[[30,0,[\"date\"]],[30,0,[\"maxDate\"]],[30,0,[\"handleSelect\"]]]],null],[1,\"\\n    \"]],[],false,[\"fluid-date-input\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _testHelpers.click)('[data-test-date-input]');
      await (0, _ember.default)(assert);
      assert.dom('[data-date="2020-11-21"]').isNotDisabled('The maximum date is still selectable');
      assert.dom('[data-date="2020-11-22"]').isDisabled('Dates after the maximum date are not selectable');
    });
  });
});
define("dummy/tests/integration/components/fluid-drawer-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers", "testdouble", "@percy/ember"], function (_templateFactory, _qunit, _emberQunit, _testHelpers, _testdouble, _ember) {
  "use strict";

  (0, _qunit.module)('Integration | Component | fluid-drawer', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function () {
      this.onClose = _testdouble.default.function();
    });
    (0, _qunit.test)('when the drawer is closed', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidDrawer
              @isOpen={{false}}
              @onClose={{this.onClose}}
              data-test-drawer
            >
              <:content>
                Content!
              </:content>
            </FluidDrawer>
          
      */
      {
        "id": "Tz9ltY9k",
        "block": "[[[1,\"\\n      \"],[8,[39,0],[[24,\"data-test-drawer\",\"\"]],[[\"@isOpen\",\"@onClose\"],[false,[30,0,[\"onClose\"]]]],[[\"content\"],[[[[1,\"\\n          Content!\\n        \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"fluid-drawer\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _ember.default)(assert);
      assert.dom('[data-test-drawer]').doesNotExist();
    });
    (0, _qunit.test)('when the drawer is open', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidDrawer
              @isOpen={{true}}
              @onClose={{this.onClose}}
              data-test-drawer
            >
              <:title>Drawer Title</:title>
      
              <:content>
                Content!
              </:content>
            </FluidDrawer>
          
      */
      {
        "id": "+qyt33wQ",
        "block": "[[[1,\"\\n      \"],[8,[39,0],[[24,\"data-test-drawer\",\"\"]],[[\"@isOpen\",\"@onClose\"],[true,[30,0,[\"onClose\"]]]],[[\"title\",\"content\"],[[[[1,\"Drawer Title\"]],[]],[[[1,\"\\n          Content!\\n        \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"fluid-drawer\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _ember.default)(assert);
      assert.dom('[data-test-drawer]').containsText('Content!');
    });
    (0, _qunit.test)('the `onClose` action is called', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidDrawer
              @isOpen={{true}}
              @onClose={{this.onClose}}
              data-test-drawer
            >
              <:title>Drawer Title</:title>
      
              <:content>
                Content!
              </:content>
            </FluidDrawer>
          
      */
      {
        "id": "+qyt33wQ",
        "block": "[[[1,\"\\n      \"],[8,[39,0],[[24,\"data-test-drawer\",\"\"]],[[\"@isOpen\",\"@onClose\"],[true,[30,0,[\"onClose\"]]]],[[\"title\",\"content\"],[[[[1,\"Drawer Title\"]],[]],[[[1,\"\\n          Content!\\n        \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"fluid-drawer\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _testHelpers.click)('[data-test-drawer-close]');
      assert.verify(this.onClose(_testdouble.default.matchers.isA(MouseEvent)), 'Called by clicking the "close button"');
      await (0, _testHelpers.click)('[data-test-drawer-overlay]');
      assert.verify(this.onClose(), 'Called by clicking the overlay');
    });
  });
});
define("dummy/tests/integration/components/fluid-form-field-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers", "@percy/ember"], function (_templateFactory, _qunit, _emberQunit, _testHelpers, _ember) {
  "use strict";

  (0, _qunit.module)('Integration | Component | fluid-form-field', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('linking the `label` to the input', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidFormField @label="My Label" as |field|>
              <field.Text />
            </FluidFormField>
          
      */
      {
        "id": "Og55mAuu",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@label\"],[\"My Label\"]],[[\"default\"],[[[[1,\"\\n        \"],[8,[30,1,[\"Text\"]],null,null,null],[1,\"\\n      \"]],[1]]]]],[1,\"\\n    \"]],[\"field\"],false,[\"fluid-form-field\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _ember.default)(assert);
      assert.dom('label').hasText('My Label', 'Passes along the `label` content');
      const label = (0, _testHelpers.find)('label');
      const labelFor = label.getAttribute('for');
      assert.ok(labelFor, 'Label has a `for` attribute');
      assert.dom('input').hasAttribute('id', labelFor, '`id` on the input and `for` on the label match');
    });
    (0, _qunit.test)('displaying the `required` corner hint', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidFormField @isRequired={{true}} as |field|>
              <field.Text />
            </FluidFormField>
          
      */
      {
        "id": "rqRwyO6W",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@isRequired\"],[true]],[[\"default\"],[[[[1,\"\\n        \"],[8,[30,1,[\"Text\"]],null,null,null],[1,\"\\n      \"]],[1]]]]],[1,\"\\n    \"]],[\"field\"],false,[\"fluid-form-field\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _ember.default)(assert);
      assert.dom().hasText('Required', 'Has the `Required` text');
    });
    (0, _qunit.test)('displaying the `optional` corner hint', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidFormField @isOptional={{true}} as |field|>
              <field.Text />
            </FluidFormField>
          
      */
      {
        "id": "cJQ2BHBk",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@isOptional\"],[true]],[[\"default\"],[[[[1,\"\\n        \"],[8,[30,1,[\"Text\"]],null,null,null],[1,\"\\n      \"]],[1]]]]],[1,\"\\n    \"]],[\"field\"],false,[\"fluid-form-field\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _ember.default)(assert);
      assert.dom().hasText('Optional', 'Has the `Optional` text');
    });
    (0, _qunit.test)('displaying error messages', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidFormField @errorMessages={{array "Foo" "Bar"}} as |field|>
              <field.Text />
            </FluidFormField>
          
      */
      {
        "id": "Krgxve5Q",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@errorMessages\"],[[28,[37,1],[\"Foo\",\"Bar\"],null]]],[[\"default\"],[[[[1,\"\\n        \"],[8,[30,1,[\"Text\"]],null,null,null],[1,\"\\n      \"]],[1]]]]],[1,\"\\n    \"]],[\"field\"],false,[\"fluid-form-field\",\"array\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _ember.default)(assert);
      assert.dom('li').exists({
        count: 2
      }, 'Renders 2 error messages');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidFormField @errorMessage="Foo" as |field|>
              <field.Text />
            </FluidFormField>
          
      */
      {
        "id": "k98oDE73",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@errorMessage\"],[\"Foo\"]],[[\"default\"],[[[[1,\"\\n        \"],[8,[30,1,[\"Text\"]],null,null,null],[1,\"\\n      \"]],[1]]]]],[1,\"\\n    \"]],[\"field\"],false,[\"fluid-form-field\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('li').exists({
        count: 1
      }, 'Renders 1 error message');
    });
    (0, _qunit.test)('displaying warning messages', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidFormField @warningMessages={{array "Foo" "Bar"}} as |field|>
              <field.Text />
            </FluidFormField>
          
      */
      {
        "id": "JUYZLL8q",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@warningMessages\"],[[28,[37,1],[\"Foo\",\"Bar\"],null]]],[[\"default\"],[[[[1,\"\\n        \"],[8,[30,1,[\"Text\"]],null,null,null],[1,\"\\n      \"]],[1]]]]],[1,\"\\n    \"]],[\"field\"],false,[\"fluid-form-field\",\"array\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _ember.default)(assert);
      assert.dom('li').exists({
        count: 2
      }, 'Renders 2 warning messages');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidFormField @warningMessage="Foo" as |field|>
              <field.Text />
            </FluidFormField>
          
      */
      {
        "id": "S+bD8giv",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@warningMessage\"],[\"Foo\"]],[[\"default\"],[[[[1,\"\\n        \"],[8,[30,1,[\"Text\"]],null,null,null],[1,\"\\n      \"]],[1]]]]],[1,\"\\n    \"]],[\"field\"],false,[\"fluid-form-field\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('li').exists({
        count: 1
      }, 'Renders 1 warning message');
    });
    (0, _qunit.test)('dynamically selecting field type', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidFormField @type="date" as |Field|>
              <Field />
            </FluidFormField>
          
      */
      {
        "id": "Lia6+pAW",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@type\"],[\"date\"]],[[\"default\"],[[[[1,\"\\n        \"],[8,[30,1],null,null,null],[1,\"\\n      \"]],[1]]]]],[1,\"\\n    \"]],[\"Field\"],false,[\"fluid-form-field\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _ember.default)(assert);
      assert.dom('button').exists('Renders calendar button');
    });
    (0, _qunit.test)('text overflow', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidFormField style="width:100px;border:1px solid black" @type="text" as |Field|>
              <Field @value="Value Is Very Very Very Very Very Very Very long" />
            </FluidFormField>
          
      */
      {
        "id": "0XtlK31b",
        "block": "[[[1,\"\\n      \"],[8,[39,0],[[24,5,\"width:100px;border:1px solid black\"]],[[\"@type\"],[\"text\"]],[[\"default\"],[[[[1,\"\\n        \"],[8,[30,1],null,[[\"@value\"],[\"Value Is Very Very Very Very Very Very Very long\"]],null],[1,\"\\n      \"]],[1]]]]],[1,\"\\n    \"]],[\"Field\"],false,[\"fluid-form-field\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _ember.default)(assert);
      assert.dom('input').exists('Renders input');
    });
  });
});
define("dummy/tests/integration/components/fluid-modal-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers", "@percy/ember", "testdouble"], function (_templateFactory, _qunit, _emberQunit, _testHelpers, _ember, _testdouble) {
  "use strict";

  (0, _qunit.module)('Integration | Component | FluidModal', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('rendering with a header and footer', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidModal @title="Header Content">
              <:default>
                Modal Content
              </:default>
      
              <:footer>
                <button class="fluid-button size:lg">
                  Close
                </button>
              </:footer>
            </FluidModal>
          
      */
      {
        "id": "jNKUfLsl",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@title\"],[\"Header Content\"]],[[\"default\",\"footer\"],[[[[1,\"\\n          Modal Content\\n        \"]],[]],[[[1,\"\\n          \"],[10,\"button\"],[14,0,\"fluid-button size:lg\"],[12],[1,\"\\n            Close\\n          \"],[13],[1,\"\\n        \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"fluid-modal\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _ember.default)(assert);
      assert.dom('header').hasText('Header Content');
      assert.dom('footer').hasText('Close');
      const {
        id
      } = (0, _testHelpers.find)('h1');
      assert.dom('[role="dialog"]').hasAria('labelledby', id, 'Dialog is labeled by title element');
    });
    (0, _qunit.test)('rendering without a header or footer', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidModal>
              <button>I am a bare modal</button>
            </FluidModal>
          
      */
      {
        "id": "wCeQEXAk",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        \"],[10,\"button\"],[12],[1,\"I am a bare modal\"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"fluid-modal\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _ember.default)(assert);
      assert.dom('button').hasText('I am a bare modal');
    });
    (0, _qunit.test)('rendering the header in block mode', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidModal>
              <:header as |Title Icon|>
                <Icon @name="alert" @class="text-yellow-400 fill-current" />
                <Title>Header Content</Title>
              </:header>
      
              <:default>
                Modal Content
              </:default>
      
              <:footer>
                <button class="fluid-button size:lg">
                  Close
                </button>
              </:footer>
            </FluidModal>
          
      */
      {
        "id": "UhWqEfEK",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"header\",\"default\",\"footer\"],[[[[1,\"\\n          \"],[8,[30,2],null,[[\"@name\",\"@class\"],[\"alert\",\"text-yellow-400 fill-current\"]],null],[1,\"\\n          \"],[8,[30,1],null,null,[[\"default\"],[[[[1,\"Header Content\"]],[]]]]],[1,\"\\n        \"]],[1,2]],[[[1,\"\\n          Modal Content\\n        \"]],[]],[[[1,\"\\n          \"],[10,\"button\"],[14,0,\"fluid-button size:lg\"],[12],[1,\"\\n            Close\\n          \"],[13],[1,\"\\n        \"]],[]]]]],[1,\"\\n    \"]],[\"Title\",\"Icon\"],false,[\"fluid-modal\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('h1').hasText('Header Content');
      const {
        id
      } = (0, _testHelpers.find)('h1');
      assert.dom('[role="dialog"]').hasAria('labelledby', id, 'Dialog is labeled by title element');
    });
    (0, _qunit.test)('closing the modal when clicking outside of it', async function (assert) {
      this.onClose = _testdouble.default.function();
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidModal @onClose={{this.onClose}}>
              <:footer>
                <button class="fluid-button size:lg">
                  Close
                </button>
              </:footer>
            </FluidModal>
          
      */
      {
        "id": "pt4ezfhR",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@onClose\"],[[30,0,[\"onClose\"]]]],[[\"footer\"],[[[[1,\"\\n          \"],[10,\"button\"],[14,0,\"fluid-button size:lg\"],[12],[1,\"\\n            Close\\n          \"],[13],[1,\"\\n        \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"fluid-modal\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _testHelpers.click)(this.element); // Click outside the modal

      assert.verify(this.onClose(), {
        ignoreExtraArgs: true
      }, 'Called the `onClose` callback');
    });

    // WARNING:
    // This is extremely flakey
    (0, _qunit.skip)('setting the initial focus', async function (assert) {
      this.setButtonElement = element => {
        this.buttonElement = element;
      };
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidModal>
              <:footer>
                <button data-test-focus-button class="fluid-button size:lg" {{did-insert this.setButtonElement}}>
                  Close
                </button>
              </:footer>
            </FluidModal>
          
      */
      {
        "id": "r8pF6CHp",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"footer\"],[[[[1,\"\\n          \"],[11,\"button\"],[24,\"data-test-focus-button\",\"\"],[24,0,\"fluid-button size:lg\"],[4,[38,1],[[30,0,[\"setButtonElement\"]]],null],[12],[1,\"\\n            Close\\n          \"],[13],[1,\"\\n        \"]],[]]]]],[1,\"\\n    \"]],[],false,[\"fluid-modal\",\"did-insert\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _testHelpers.settled)(); // Wait for modifiers to all fire

      assert.dom('[data-test-focus-button ]').isFocused();
    });
  });
});
define("dummy/tests/integration/components/fluid-radio-button-test", ["@ember/template-factory", "@ember/test-helpers", "qunit", "ember-qunit", "sinon"], function (_templateFactory, _testHelpers, _qunit, _emberQunit, _sinon) {
  "use strict";

  (0, _qunit.module)('component:fluid-radio-button', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    let onSelect;
    let value;
    let groupValue;
    let label;
    hooks.beforeEach(async function () {
      onSelect = _sinon.default.stub();
      value = 'foo';
      groupValue = 'bar';
      label = 'FooBarBaz';
      this.setProperties({
        onSelect,
        value,
        groupValue,
        label
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <FluidRadioButton
                  @groupValue={{this.groupValue}}
                  @value={{this.value}}
                  @label={{this.label}}
                  @changed={{this.onSelect}}
                />
      */
      {
        "id": "yDm7bjbV",
        "block": "[[[8,[39,0],null,[[\"@groupValue\",\"@value\",\"@label\",\"@changed\"],[[30,0,[\"groupValue\"]],[30,0,[\"value\"]],[30,0,[\"label\"]],[30,0,[\"onSelect\"]]]],null]],[],false,[\"fluid-radio-button\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
    });
    (0, _qunit.test)('it renders properly', async function (assert) {
      assert.dom('.fluid__radio').hasText(label, 'it renders the lablel properly');
      assert.dom('.fluid__radio .radio__radio').isNotChecked('it is not checked if value does not match groupValue');
    });
    (0, _qunit.test)('it calls action when clicked', async function (assert) {
      await (0, _testHelpers.click)('.fluid__radio');
      assert.ok(onSelect.calledWith(value), 'clicking the element calls the changed action passing the clicked value');
      assert.dom('.fluid__radio .radio__radio').isChecked('clicking the element will check the button');
    });
    (0, _qunit.test)('it updates the checked state when groupValue is changed', async function (assert) {
      assert.dom('.fluid__radio .radio__radio').isNotChecked();
      await this.set('groupValue', 'foo');
      assert.dom('.fluid__radio .radio__radio').isChecked();
      await this.set('groupValue', 'bar');
      assert.dom('.fluid__radio .radio__radio').isNotChecked();
    });
  });
});
define("dummy/tests/integration/components/fluid-select-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers", "@ember/array", "@movable/fluid/test-support/pages/fluid-select", "dummy/tests/helpers/percy-snapshot"], function (_templateFactory, _qunit, _emberQunit, _testHelpers, _array, _fluidSelect, _percySnapshot) {
  "use strict";

  (0, _qunit.module)('Integration | Component | fluid-select', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function () {
      this.set('options', ['apple', 'banana', 'orange', 'cantaloupe', 'durian']);
      this.set('selected', null);
      this.set('select', value => this.set('selected', value));
    });
    (0, _qunit.test)('it renders', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <FluidSelect @options={{options}} @select={{select}} />
      */
      {
        "id": "/YvTQ1/e",
        "block": "[[[8,[39,0],null,[[\"@options\",\"@select\"],[[99,1,[\"@options\"]],[99,2,[\"@select\"]]]],null]],[],false,[\"fluid-select\",\"options\",\"select\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.ok(_fluidSelect.default.trigger.isVisible, 'it renders a trigger button');
      assert.ok(_fluidSelect.default.popup.isHidden, 'the popup is not visible on render');
      await (0, _percySnapshot.default)(assert, 'trigger');
      await _fluidSelect.default.open();
      await (0, _percySnapshot.default)(assert, 'popup');
      assert.ok(_fluidSelect.default.popup.isVisible, 'the popup renders when the trigger is clicked');
      assert.ok(_fluidSelect.default.popup.list.isVisible, 'the list is visible inside the popup');
      assert.equal(_fluidSelect.default.popup.list.options.length, this.get('options.length'));
      assert.ok(_fluidSelect.default.popup.search.isHidden, 'it does not render a search bar by default');
    });
    (0, _qunit.test)('the trigger displays the label', async function (assert) {
      this.set('label', 'hello label');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <FluidSelect @label={{label}} />
      */
      {
        "id": "Bt6rczN+",
        "block": "[[[8,[39,0],null,[[\"@label\"],[[99,1,[\"@label\"]]]],null]],[],false,[\"fluid-select\",\"label\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.equal(_fluidSelect.default.trigger.text, 'hello label');
      this.set('label', 'a different label');
      await (0, _percySnapshot.default)(assert);
      assert.equal(_fluidSelect.default.trigger.text, 'a different label');
    });
    (0, _qunit.test)('clicking the trigger fires an onOpen action', async function (assert) {
      assert.expect(2);
      this.set('testOnOpen', () => {
        assert.ok(true, 'it calls testOnOpen');
      });
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <FluidSelect @onOpen={{action testOnOpen}} />
      */
      {
        "id": "FvsJ3IRI",
        "block": "[[[8,[39,0],null,[[\"@onOpen\"],[[28,[37,1],[[30,0],[33,2]],null]]],null]],[],false,[\"fluid-select\",\"action\",\"testOnOpen\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await _fluidSelect.default.open();
      assert.ok(_fluidSelect.default.popup.isVisible, 'the popup still opens');
    });
    (0, _qunit.test)('it can be disabled', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <FluidSelect @disabled={{true}} @options={{options}} @select={{select}} />
      */
      {
        "id": "0MZ4g0Uy",
        "block": "[[[8,[39,0],null,[[\"@disabled\",\"@options\",\"@select\"],[true,[99,1,[\"@options\"]],[99,2,[\"@select\"]]]],null]],[],false,[\"fluid-select\",\"options\",\"select\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _percySnapshot.default)(assert);
      assert.ok(_fluidSelect.default.trigger.isDisabled, 'the trigger is disabled');
      assert.ok(_fluidSelect.default.popup.isHidden, 'the popup does not open after clicking a disabled trigger');
    });
    (0, _qunit.test)('passing options as a Promise', async function (assert) {
      let resolvePromise;
      this.set('promise', new Promise(resolve => {
        resolvePromise = resolve;
        return resolve;
      }));
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <FluidSelect @options={{promise}} />
      */
      {
        "id": "JWJ51K2U",
        "block": "[[[8,[39,0],null,[[\"@options\"],[[99,1,[\"@options\"]]]],null]],[],false,[\"fluid-select\",\"promise\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await _fluidSelect.default.open();
      assert.ok(_fluidSelect.default.popup.loading.isVisible, 'it displays a loading message if `options` is passed as a Promise');
      assert.equal(_fluidSelect.default.popup.list.options.length, 0, 'No options are visible while the promise loads');
      resolvePromise(['one', 'two', 'three']);
      await (0, _testHelpers.settled)();
      assert.ok(_fluidSelect.default.popup.loading.isHidden, 'it no longer displays the loading message');
      assert.equal(_fluidSelect.default.popup.list.options.length, 3, 'the options are visible when the promise resolves');
    });
    (0, _qunit.test)('clicking on an option in the list fires the select action', async function (assert) {
      assert.expect(3);
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidSelect @select={{select}} @options={{options}} @selected={{selected}} />
          
      */
      {
        "id": "y+ERCldW",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@select\",\"@options\",\"@selected\"],[[99,1,[\"@select\"]],[99,2,[\"@options\"]],[99,3,[\"@selected\"]]]],null],[1,\"\\n    \"]],[],false,[\"fluid-select\",\"select\",\"options\",\"selected\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await _fluidSelect.default.open();
      const firstOption = _fluidSelect.default.popup.list.options[0];
      this.set('select', value => assert.equal(value, firstOption.text, 'it passes the correct value'));
      await firstOption.click();
      assert.ok(_fluidSelect.default.popup.isHidden, 'the popup closes after selecting an option');
      await _fluidSelect.default.open();
      const fourthOption = _fluidSelect.default.popup.list.options[3];
      this.set('select', value => assert.equal(value, fourthOption.text, 'it passes the correct value'));
      await fourthOption.click();
    });
    (0, _qunit.test)('objects as values', async function (assert) {
      assert.expect(4);
      this.set('options', [{
        testLabel: 'one'
      }, {
        testLabel: 'two'
      }, {
        testLabel: 'three'
      }]);
      this.set('labelPath', 'testLabel');
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidSelect @options={{options}} @select={{select}} @labelPath={{labelPath}} />
          
      */
      {
        "id": "vyM76JQ6",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@options\",\"@select\",\"@labelPath\"],[[99,1,[\"@options\"]],[99,2,[\"@select\"]],[99,3,[\"@labelPath\"]]]],null],[1,\"\\n    \"]],[],false,[\"fluid-select\",\"options\",\"select\",\"labelPath\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await _fluidSelect.default.open();
      const firstOption = _fluidSelect.default.popup.list.options[0];
      assert.equal(firstOption.text, 'one');
      assert.equal(_fluidSelect.default.popup.list.options[1].text, 'two');
      assert.equal(_fluidSelect.default.popup.list.options[2].text, 'three');
      this.set('select', value => assert.equal(this.get('options.0'), value, 'it passes the object as the selected value'));
      await firstOption.click();
    });
    (0, _qunit.module)('grouped options', function (hooks) {
      hooks.beforeEach(function () {
        this.set('groups', (0, _array.A)([{
          groupLabel: 'Group one',
          groupOptions: ['one', 'two', 'three']
        }, {
          groupOptions: ['four', 'five', 'six']
        }, {
          groupLabel: 'Group three',
          groupOptions: ['seven', 'eight', 'nine', 'ten']
        }]));
      });
      (0, _qunit.test)('it renders the grouped options', async function (assert) {
        assert.expect(5);
        await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
        /*
          
                <FluidSelect @options={{groups}} @select={{select}} @selected={{selected}} />
              
        */
        {
          "id": "4r/+aeO1",
          "block": "[[[1,\"\\n        \"],[8,[39,0],null,[[\"@options\",\"@select\",\"@selected\"],[[99,1,[\"@options\"]],[99,2,[\"@select\"]],[99,3,[\"@selected\"]]]],null],[1,\"\\n      \"]],[],false,[\"fluid-select\",\"groups\",\"select\",\"selected\"]]",
          "moduleName": "(unknown template module)",
          "isStrictMode": false
        }));
        await _fluidSelect.default.open();
        await (0, _percySnapshot.default)(assert);
        assert.equal(_fluidSelect.default.popup.list.groupHeaders.length, 2);
        assert.equal(_fluidSelect.default.popup.list.groupHeaders[0].text, this.get('groups.0.groupLabel'), 'it renders the groups label in upper case');
        assert.equal(_fluidSelect.default.popup.list.groupHeaders[1].text, this.get('groups.2.groupLabel'), 'it renders the groups label in upper case');
        assert.equal(_fluidSelect.default.popup.list.options.length, 10, 'it renders an option for each group option');
        this.set('select', value => assert.equal(value, 'seven', 'it selects the correct option'));
        await _fluidSelect.default.popup.list.options[6].click();
      });
      (0, _qunit.test)('mixed groups', async function (assert) {
        this.get('groups').pushObjects(['eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen']);
        await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
        /*
          
                <FluidSelect @options={{groups}} @select={{select}} @selected={{selected}} />
              
        */
        {
          "id": "4r/+aeO1",
          "block": "[[[1,\"\\n        \"],[8,[39,0],null,[[\"@options\",\"@select\",\"@selected\"],[[99,1,[\"@options\"]],[99,2,[\"@select\"]],[99,3,[\"@selected\"]]]],null],[1,\"\\n      \"]],[],false,[\"fluid-select\",\"groups\",\"select\",\"selected\"]]",
          "moduleName": "(unknown template module)",
          "isStrictMode": false
        }));
        await _fluidSelect.default.open();
        assert.equal(_fluidSelect.default.popup.list.options.length, 15, 'it renders options if the options collection has grouped and ungrouped content');
      });
    });
    (0, _qunit.module)('multiple selection', function (hooks) {
      hooks.beforeEach(function () {
        this.set('selected', (0, _array.A)([]));
        this.set('select', value => {
          const selected = this.get('selected');
          if (!selected.includes(value)) {
            selected.pushObject(value);
          }
        });
      });
      (0, _qunit.test)('block mode with custom options and checkbox labels', async function (assert) {
        await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
        /*
          <FluidSelect
                @options={{this.options}}
                @select={{this.select}}
                @selected={{this.selected}}
                @multiple={{true}}
                as |fs|
              >
                <fs.trigger @label='Fruit' />
                <fs.popup>
                  <fs.list @multiple={{true}} as |options selectCheckbox|>
                    {{#each options as |option|}}
                      <FluidSelect::Option
                        @dark={{@dark}}
                        @option={{option}}
                        @selected={{this.selected}}
                        @multiple={{true}}
                        @select={{action selectCheckbox}}
                        as |fo|
                      >
                        <fo.checkbox @label={{option}} />
                      </FluidSelect::Option>
                    {{/each}}
                  </fs.list>
                </fs.popup>
              </FluidSelect>
        */
        {
          "id": "x/6ByBOM",
          "block": "[[[8,[39,0],null,[[\"@options\",\"@select\",\"@selected\",\"@multiple\"],[[30,0,[\"options\"]],[30,0,[\"select\"]],[30,0,[\"selected\"]],true]],[[\"default\"],[[[[1,\"\\n        \"],[8,[30,1,[\"trigger\"]],null,[[\"@label\"],[\"Fruit\"]],null],[1,\"\\n        \"],[8,[30,1,[\"popup\"]],null,null,[[\"default\"],[[[[1,\"\\n          \"],[8,[30,1,[\"list\"]],null,[[\"@multiple\"],[true]],[[\"default\"],[[[[1,\"\\n\"],[42,[28,[37,2],[[28,[37,2],[[30,2]],null]],null],null,[[[1,\"              \"],[8,[39,3],null,[[\"@dark\",\"@option\",\"@selected\",\"@multiple\",\"@select\"],[[30,5],[30,4],[30,0,[\"selected\"]],true,[28,[37,4],[[30,0],[30,3]],null]]],[[\"default\"],[[[[1,\"\\n                \"],[8,[30,6,[\"checkbox\"]],null,[[\"@label\"],[[30,4]]],null],[1,\"\\n              \"]],[6]]]]],[1,\"\\n\"]],[4]],null],[1,\"          \"]],[2,3]]]]],[1,\"\\n        \"]],[]]]]],[1,\"\\n      \"]],[1]]]]]],[\"fs\",\"options\",\"selectCheckbox\",\"option\",\"@dark\",\"fo\"],false,[\"fluid-select\",\"each\",\"-track-array\",\"fluid-select/option\",\"action\"]]",
          "moduleName": "(unknown template module)",
          "isStrictMode": false
        }));
        assert.ok(_fluidSelect.default.trigger.isVisible, 'the trigger renders');
        assert.equal(_fluidSelect.default.trigger.text, 'Fruit', 'the trigger has the passed label');
        assert.ok(_fluidSelect.default.popup.isHidden, 'the popup is hidden');
        await _fluidSelect.default.open();
        assert.equal(_fluidSelect.default.popup.list.options.length, this.get('options.length'), 'the correct number of options render');
        const firstOption = _fluidSelect.default.popup.list.options[0];
        await firstOption.click();
        const fourthOption = _fluidSelect.default.popup.list.options[3];
        await fourthOption.click();
        assert.equal(_fluidSelect.default.popup.list.selectedOptions.length, 2);
      });
      (0, _qunit.test)('checkboxes', async function (assert) {
        await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
        /*
          
                <FluidSelect @options={{options}} @selected={{selected}} @select={{select}} @multiple={{true}} />
              
        */
        {
          "id": "gszO0q30",
          "block": "[[[1,\"\\n        \"],[8,[39,0],null,[[\"@options\",\"@selected\",\"@select\",\"@multiple\"],[[99,1,[\"@options\"]],[99,2,[\"@selected\"]],[99,3,[\"@select\"]],true]],null],[1,\"\\n      \"]],[],false,[\"fluid-select\",\"options\",\"selected\",\"select\"]]",
          "moduleName": "(unknown template module)",
          "isStrictMode": false
        }));
        await _fluidSelect.default.open();
        await (0, _percySnapshot.default)(assert);
        assert.equal(_fluidSelect.default.popup.list.options.filter(option => option.hasCheckbox).length, this.get('options').length, 'it renders a checkbox for each option');
      });
      (0, _qunit.test)('selecting multiple options', async function (assert) {
        this.set('selected', (0, _array.A)([this.get('options')[0]]));
        await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
        /*
          
                <FluidSelect @options={{options}} @selected={{selected}} @select={{select}} @multiple={{true}} />
              
        */
        {
          "id": "gszO0q30",
          "block": "[[[1,\"\\n        \"],[8,[39,0],null,[[\"@options\",\"@selected\",\"@select\",\"@multiple\"],[[99,1,[\"@options\"]],[99,2,[\"@selected\"]],[99,3,[\"@select\"]],true]],null],[1,\"\\n      \"]],[],false,[\"fluid-select\",\"options\",\"selected\",\"select\"]]",
          "moduleName": "(unknown template module)",
          "isStrictMode": false
        }));
        await _fluidSelect.default.open();
        assert.equal(_fluidSelect.default.popup.list.selectedOptions.length, 1);
        const firstOption = _fluidSelect.default.popup.list.options[0];
        assert.ok(firstOption.isSelected);
        const fourthOption = _fluidSelect.default.popup.list.options[3];
        await fourthOption.click();
        assert.equal(_fluidSelect.default.popup.list.selectedOptions.length, 2);
      });
    });
    (0, _qunit.module)('searching', function (hooks) {
      hooks.beforeEach(function () {
        this.set('searchByName', searchTerm => {
          return this.get('options').filter(option => option.startsWith(searchTerm));
        });
      });
      (0, _qunit.module)('synchronous', function (hooks) {
        hooks.beforeEach(function () {
          this.set('search', function (searchTerm) {
            return this.get('searchByName')(searchTerm);
          });
        });
        (0, _qunit.test)('searching by name', async function (assert) {
          await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
          /*
            
                    <FluidSelect @options={{options}} @search={{search}} @select={{action (mut selected)}} />
                  
          */
          {
            "id": "zlK30Ly9",
            "block": "[[[1,\"\\n          \"],[8,[39,0],null,[[\"@options\",\"@search\",\"@select\"],[[99,1,[\"@options\"]],[99,2,[\"@search\"]],[28,[37,3],[[30,0],[28,[37,4],[[33,5]],null]],null]]],null],[1,\"\\n        \"]],[],false,[\"fluid-select\",\"options\",\"search\",\"action\",\"mut\",\"selected\"]]",
            "moduleName": "(unknown template module)",
            "isStrictMode": false
          }));
          await _fluidSelect.default.open();
          await (0, _percySnapshot.default)(assert, 'no search term & results');
          assert.ok(_fluidSelect.default.popup.search.isVisible, 'it renders a search bar if search is passed to the component');
          this.set('search', searchTerm => {
            assert.ok(true, 'it calls the passed search action');
            assert.equal(searchTerm, 'app');
            return this.get('searchByName')(searchTerm);
          });
          await _fluidSelect.default.popup.search.fillIn('app');
          await (0, _percySnapshot.default)(assert, 'search term & results');
          assert.equal(_fluidSelect.default.popup.list.options.length, 1, 'the list of options changes if the bound collection changes');
          assert.ok(_fluidSelect.default.popup.noResultsMessage.isHidden, 'it does not display a message when a search returns results');
          await _fluidSelect.default.popup.search.fillIn('');
          assert.equal(_fluidSelect.default.popup.list.options.length, this.get('options.length'), 'if the user clears their search, the original list is returned');
          this.set('search', () => []);
          await _fluidSelect.default.popup.search.fillIn('anything');
          await (0, _percySnapshot.default)(assert, 'no results');
          assert.ok(_fluidSelect.default.popup.noResultsMessage.isVisible, 'it displays a message when a search returns no results');
        });
      });
      (0, _qunit.module)('asynchronous', function () {
        (0, _qunit.test)('with promises', async function (assert) {
          let resolve;
          this.set('asyncSearch', searchTerm => {
            const promise = new Promise(promiseResolve => {
              resolve = promiseResolve;
            });
            return promise.then(() => this.get('searchByName')(searchTerm));
          });
          await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
          /*
            
                    <FluidSelect @options={{options}} @search={{asyncSearch}} @select={{action (mut selected)}} />
                  
          */
          {
            "id": "ya0fhlBI",
            "block": "[[[1,\"\\n          \"],[8,[39,0],null,[[\"@options\",\"@search\",\"@select\"],[[99,1,[\"@options\"]],[99,2,[\"@search\"]],[28,[37,3],[[30,0],[28,[37,4],[[33,5]],null]],null]]],null],[1,\"\\n        \"]],[],false,[\"fluid-select\",\"options\",\"asyncSearch\",\"action\",\"mut\",\"selected\"]]",
            "moduleName": "(unknown template module)",
            "isStrictMode": false
          }));
          await _fluidSelect.default.open();
          await _fluidSelect.default.popup.search.fillIn('anything');
          assert.ok(_fluidSelect.default.popup.search.loadingIcon.isVisible, 'it displays a loading spinner while searching');
          assert.ok(_fluidSelect.default.popup.search.searchIcon.isHidden, 'it displays a loading spinner while searching');
          resolve();
          await (0, _testHelpers.settled)();
          assert.ok(_fluidSelect.default.popup.search.loadingIcon.isHidden, 'it displays a loading spinner while searching');
          assert.ok(_fluidSelect.default.popup.search.searchIcon.isVisible, 'it displays a loading spinner while searching');
        });
      });
    });
    (0, _qunit.module)('block mode', function (hooks) {
      hooks.beforeEach(function () {
        this.set('options', ['mario', 'luigi', 'yoshi', 'peach', 'bowser']);
        this.set('selectOption', function (value) {
          this.set('selected', value);
        });
      });
      (0, _qunit.test)('usable in the simplest case', async function (assert) {
        assert.expect(8);
        await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
        /*
          
                <FluidSelect @select={{action selectOption}} @selected={{selected}} as |select|>
                  <select.trigger @label='Click Me!' />
        
                  <select.popup>
                    <select.list>
                      {{#each options as |option|}}
                        <select.option @option={{option}} />
                      {{/each}}
                    </select.list>
                  </select.popup>
                </FluidSelect>
              
        */
        {
          "id": "9ACQ2sM2",
          "block": "[[[1,\"\\n        \"],[8,[39,0],null,[[\"@select\",\"@selected\"],[[28,[37,1],[[30,0],[33,2]],null],[99,3,[\"@selected\"]]]],[[\"default\"],[[[[1,\"\\n          \"],[8,[30,1,[\"trigger\"]],null,[[\"@label\"],[\"Click Me!\"]],null],[1,\"\\n\\n          \"],[8,[30,1,[\"popup\"]],null,null,[[\"default\"],[[[[1,\"\\n            \"],[8,[30,1,[\"list\"]],null,null,[[\"default\"],[[[[1,\"\\n\"],[42,[28,[37,5],[[28,[37,5],[[33,6]],null]],null],null,[[[1,\"                \"],[8,[30,1,[\"option\"]],null,[[\"@option\"],[[30,2]]],null],[1,\"\\n\"]],[2]],null],[1,\"            \"]],[]]]]],[1,\"\\n          \"]],[]]]]],[1,\"\\n        \"]],[1]]]]],[1,\"\\n      \"]],[\"select\",\"option\"],false,[\"fluid-select\",\"action\",\"selectOption\",\"selected\",\"each\",\"-track-array\",\"options\"]]",
          "moduleName": "(unknown template module)",
          "isStrictMode": false
        }));
        assert.ok(_fluidSelect.default.trigger.isVisible, 'the trigger renders');
        assert.equal(_fluidSelect.default.trigger.text, 'Click Me!', 'the trigger has the passed label');
        assert.ok(_fluidSelect.default.popup.isHidden, 'the popup is hidden');
        await _fluidSelect.default.open();
        assert.ok(_fluidSelect.default.popup.isVisible, 'the popup shows when the custom trigger is clicked');
        assert.equal(_fluidSelect.default.popup.list.options.length, this.get('options.length'), 'the correct number of options render');
        assert.equal(_fluidSelect.default.popup.list.selectedOptions.length, 0);
        this.set('selectOption', function (value) {
          assert.equal(value, this.get('options.2'), 'it selects the correct value');
          this.set('selected', value);
        });
        await (0, _percySnapshot.default)(assert);
        await _fluidSelect.default.popup.list.options[2].click();
        assert.ok(_fluidSelect.default.popup.isHidden, 'the popup closes when an item is selected');
      });
      (0, _qunit.test)('block mode with custom trigger and options', async function (assert) {
        assert.expect(8);
        await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
        /*
          
                <FluidSelect @select={{action selectOption}} @selected={{selected}} as |select|>
                  <select.trigger>
                    <a class='test-link'>Click Me!</a>
                  </select.trigger>
        
                  <select.popup>
                    <select.list>
                      {{#each options as |option|}}
                        <select.option @option={{option}}>
                          <h4 class='custom-option {{if (eq selected option) 'custom-option--selected'}}'>{{option}}</h4>
                        </select.option>
                      {{/each}}
                    </select.list>
                  </select.popup>
                </FluidSelect>
              
        */
        {
          "id": "pWjyq3zh",
          "block": "[[[1,\"\\n        \"],[8,[39,0],null,[[\"@select\",\"@selected\"],[[28,[37,1],[[30,0],[33,2]],null],[99,3,[\"@selected\"]]]],[[\"default\"],[[[[1,\"\\n          \"],[8,[30,1,[\"trigger\"]],null,null,[[\"default\"],[[[[1,\"\\n            \"],[10,3],[14,0,\"test-link\"],[12],[1,\"Click Me!\"],[13],[1,\"\\n          \"]],[]]]]],[1,\"\\n\\n          \"],[8,[30,1,[\"popup\"]],null,null,[[\"default\"],[[[[1,\"\\n            \"],[8,[30,1,[\"list\"]],null,null,[[\"default\"],[[[[1,\"\\n\"],[42,[28,[37,5],[[28,[37,5],[[33,6]],null]],null],null,[[[1,\"                \"],[8,[30,1,[\"option\"]],null,[[\"@option\"],[[30,2]]],[[\"default\"],[[[[1,\"\\n                  \"],[10,\"h4\"],[15,0,[29,[\"custom-option \",[52,[28,[37,8],[[33,3],[30,2]],null],\"custom-option--selected\"]]]],[12],[1,[30,2]],[13],[1,\"\\n                \"]],[]]]]],[1,\"\\n\"]],[2]],null],[1,\"            \"]],[]]]]],[1,\"\\n          \"]],[]]]]],[1,\"\\n        \"]],[1]]]]],[1,\"\\n      \"]],[\"select\",\"option\"],false,[\"fluid-select\",\"action\",\"selectOption\",\"selected\",\"each\",\"-track-array\",\"options\",\"if\",\"eq\"]]",
          "moduleName": "(unknown template module)",
          "isStrictMode": false
        }));
        assert.ok(_fluidSelect.default.trigger.isVisible);
        assert.dom('[data-test-fluid-select-trigger] .test-link').hasText('Click Me!');
        assert.ok(_fluidSelect.default.popup.isHidden);
        await (0, _testHelpers.click)('.test-link');
        assert.ok(_fluidSelect.default.popup.isVisible, 'the popup shows when the custom trigger is clicked');
        assert.equal((0, _testHelpers.findAll)('.custom-option').length, this.get('options.length'));
        this.set('selectOption', function (value) {
          assert.equal(value, this.get('options.2'), 'it selects the correct value');
          this.set('selected', value);
        });
        assert.dom('.custom-option--selected').doesNotExist();
        await (0, _testHelpers.click)((0, _testHelpers.findAll)('.custom-option')[2]);
        assert.ok(_fluidSelect.default.popup.isHidden, 'the popup closes if the yielded option is clicked and multiple is false');
      });
      (0, _qunit.test)('block mode with external trigger and options', async function (assert) {
        assert.expect(6);
        await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
        /*
          
                <FluidSelect @select={{action selectOption}} @selected={{selected}} as |select|>
                  <button {{on 'click' select.toggle}} class='test-link'>Click Me!</button>
        
                  <select.popup>
                    <select.list>
                      {{#each options as |option|}}
                        <select.option @option={{option}}>
                          <h4 class='custom-option {{if (eq selected option) 'custom-option--selected'}}'>{{option}}</h4>
                        </select.option>
                      {{/each}}
                    </select.list>
                  </select.popup>
                </FluidSelect>
              
        */
        {
          "id": "yoO+ARsE",
          "block": "[[[1,\"\\n        \"],[8,[39,0],null,[[\"@select\",\"@selected\"],[[28,[37,1],[[30,0],[33,2]],null],[99,3,[\"@selected\"]]]],[[\"default\"],[[[[1,\"\\n          \"],[11,\"button\"],[24,0,\"test-link\"],[4,[38,4],[\"click\",[30,1,[\"toggle\"]]],null],[12],[1,\"Click Me!\"],[13],[1,\"\\n\\n          \"],[8,[30,1,[\"popup\"]],null,null,[[\"default\"],[[[[1,\"\\n            \"],[8,[30,1,[\"list\"]],null,null,[[\"default\"],[[[[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[33,7]],null]],null],null,[[[1,\"                \"],[8,[30,1,[\"option\"]],null,[[\"@option\"],[[30,2]]],[[\"default\"],[[[[1,\"\\n                  \"],[10,\"h4\"],[15,0,[29,[\"custom-option \",[52,[28,[37,9],[[33,3],[30,2]],null],\"custom-option--selected\"]]]],[12],[1,[30,2]],[13],[1,\"\\n                \"]],[]]]]],[1,\"\\n\"]],[2]],null],[1,\"            \"]],[]]]]],[1,\"\\n          \"]],[]]]]],[1,\"\\n        \"]],[1]]]]],[1,\"\\n      \"]],[\"select\",\"option\"],false,[\"fluid-select\",\"action\",\"selectOption\",\"selected\",\"on\",\"each\",\"-track-array\",\"options\",\"if\",\"eq\"]]",
          "moduleName": "(unknown template module)",
          "isStrictMode": false
        }));
        assert.ok(_fluidSelect.default.popup.isHidden);
        await (0, _testHelpers.click)('.test-link');
        assert.ok(_fluidSelect.default.popup.isVisible, 'the popup shows when the custom trigger is clicked');
        assert.equal((0, _testHelpers.findAll)('.custom-option').length, this.get('options.length'));
        this.set('selectOption', function (value) {
          assert.equal(value, this.get('options.2'), 'it selects the correct value');
          this.set('selected', value);
        });
        assert.dom('.custom-option--selected').doesNotExist();
        await (0, _testHelpers.click)((0, _testHelpers.findAll)('.custom-option')[2]);
        assert.ok(_fluidSelect.default.popup.isHidden, 'the popup closes if the yielded option is clicked and multiple is false');
      });
    });
    (0, _qunit.test)('it can render ellipsis with block [ch53009]', async function (assert) {
      this.label = 'Metus molestie condimentum elit cursus magna primis velit imperdiet';
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <label>Fluid Select with Block</label>
            <br />
            <FluidSelect
              class="w-20"
              as |select|
            >
              <select.trigger
                class="max-w-full"
              >
                <span data-test-overflow-span class="overflow-hidden overflow-ellipsis">
                  {{this.label}}
                </span>
              </select.trigger>
            </FluidSelect>
          
      */
      {
        "id": "42y39Q3I",
        "block": "[[[1,\"\\n      \"],[10,\"label\"],[12],[1,\"Fluid Select with Block\"],[13],[1,\"\\n      \"],[10,\"br\"],[12],[13],[1,\"\\n      \"],[8,[39,0],[[24,0,\"w-20\"]],null,[[\"default\"],[[[[1,\"\\n        \"],[8,[30,1,[\"trigger\"]],[[24,0,\"max-w-full\"]],null,[[\"default\"],[[[[1,\"\\n          \"],[10,1],[14,\"data-test-overflow-span\",\"\"],[14,0,\"overflow-hidden overflow-ellipsis\"],[12],[1,\"\\n            \"],[1,[30,0,[\"label\"]]],[1,\"\\n          \"],[13],[1,\"\\n        \"]],[]]]]],[1,\"\\n      \"]],[1]]]]],[1,\"\\n    \"]],[\"select\"],false,[\"fluid-select\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));

      // NOTE:
      // The actual test is the percy test here as there is no real way to assert the `...` has show up.
      await (0, _percySnapshot.default)(assert);
      assert.dom('[data-test-overflow-span]').hasClass('overflow-ellipsis');
    });
  });
});
define("dummy/tests/integration/components/fluid-split-button-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers", "testdouble", "@percy/ember"], function (_templateFactory, _qunit, _emberQunit, _testHelpers, _testdouble, _ember) {
  "use strict";

  (0, _qunit.module)('Integration | Component | fluid-split-button', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders a primary button and menu items', async function (assert) {
      this.primaryAction = _testdouble.default.function();
      this.menuItemAction = _testdouble.default.function();
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidSplitButton as |s|>
              <s.PrimaryButton data-test-primary-button {{on 'click' this.primaryAction}}>
                Primary Button
              </s.PrimaryButton>
      
              <s.MenuItem data-test-menu-item {{on 'click' this.menuItemAction}}>
                First Item
              </s.MenuItem>
      
              <s.MenuItem>
                Second Item
              </s.MenuItem>
            </FluidSplitButton>
          
      */
      {
        "id": "PXyr+poJ",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        \"],[8,[30,1,[\"PrimaryButton\"]],[[24,\"data-test-primary-button\",\"\"],[4,[38,1],[\"click\",[30,0,[\"primaryAction\"]]],null]],null,[[\"default\"],[[[[1,\"\\n          Primary Button\\n        \"]],[]]]]],[1,\"\\n\\n        \"],[8,[30,1,[\"MenuItem\"]],[[24,\"data-test-menu-item\",\"\"],[4,[38,1],[\"click\",[30,0,[\"menuItemAction\"]]],null]],null,[[\"default\"],[[[[1,\"\\n          First Item\\n        \"]],[]]]]],[1,\"\\n\\n        \"],[8,[30,1,[\"MenuItem\"]],null,null,[[\"default\"],[[[[1,\"\\n          Second Item\\n        \"]],[]]]]],[1,\"\\n      \"]],[1]]]]],[1,\"\\n    \"]],[\"s\"],false,[\"fluid-split-button\",\"on\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _testHelpers.click)('[data-test-primary-button]');
      assert.verify(this.primaryAction(_testdouble.default.matchers.isA(MouseEvent)), 'The primary button click event was fired');
      await (0, _testHelpers.click)('[data-test-split-button-menu-trigger]');
      await (0, _ember.default)(assert);
      await (0, _testHelpers.click)('[data-test-menu-item]');
      assert.verify(this.menuItemAction(_testdouble.default.matchers.isA(MouseEvent)), 'The primary button click event was fired');
    });
    (0, _qunit.test)('relating the primary and menu-trigger buttons to the menu', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidSplitButton as |s|>
              <s.PrimaryButton data-test-primary-button>
                Primary Button
              </s.PrimaryButton>
      
              <s.MenuItem>
                First Item
              </s.MenuItem>
            </FluidSplitButton>
          
      */
      {
        "id": "iZGFlR/u",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        \"],[8,[30,1,[\"PrimaryButton\"]],[[24,\"data-test-primary-button\",\"\"]],null,[[\"default\"],[[[[1,\"\\n          Primary Button\\n        \"]],[]]]]],[1,\"\\n\\n        \"],[8,[30,1,[\"MenuItem\"]],null,null,[[\"default\"],[[[[1,\"\\n          First Item\\n        \"]],[]]]]],[1,\"\\n      \"]],[1]]]]],[1,\"\\n    \"]],[\"s\"],false,[\"fluid-split-button\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('[data-test-primary-button]').hasAria('haspopup', 'menu', 'Primary button claims to own a menu');
      assert.dom('[data-test-primary-button]').hasAria('expanded', 'false', 'Primary button claims menu is not expanded');
      assert.dom('[data-test-split-button-menu-trigger]').hasAria('haspopup', 'menu', 'Trigger button claims to own a menu');
      assert.dom('[data-test-split-button-menu-trigger]').hasAria('expanded', 'false', 'Trigger button claims menu is not expanded');
      await (0, _testHelpers.click)('[data-test-split-button-menu-trigger]');
      const {
        id: menuId
      } = (0, _testHelpers.find)('[data-test-split-button-menu]');
      assert.dom('[data-test-primary-button]').hasAria('expanded', 'true', 'Primary button claims menu is expanded');
      assert.dom('[data-test-primary-button]').hasAria('owns', menuId, 'Primary button owns correct menu element');
      assert.dom('[data-test-split-button-menu-trigger]').hasAria('expanded', 'true', 'Trigger button claims menu is expanded');
      assert.dom('[data-test-split-button-menu-trigger]').hasAria('owns', menuId, 'Trigger button owns correct menu element');
    });
    (0, _qunit.test)('it can override the tag for a menu item', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidSplitButton as |s|>
              <s.PrimaryButton>
                Primary Button
              </s.PrimaryButton>
      
              <s.MenuItem data-test-menu-button>
                First Item
              </s.MenuItem>
      
              <s.MenuItem @tagName="a" data-test-menu-link>
                Second Item
              </s.MenuItem>
            </FluidSplitButton>
          
      */
      {
        "id": "863ETYUh",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        \"],[8,[30,1,[\"PrimaryButton\"]],null,null,[[\"default\"],[[[[1,\"\\n          Primary Button\\n        \"]],[]]]]],[1,\"\\n\\n        \"],[8,[30,1,[\"MenuItem\"]],[[24,\"data-test-menu-button\",\"\"]],null,[[\"default\"],[[[[1,\"\\n          First Item\\n        \"]],[]]]]],[1,\"\\n\\n        \"],[8,[30,1,[\"MenuItem\"]],[[24,\"data-test-menu-link\",\"\"]],[[\"@tagName\"],[\"a\"]],[[\"default\"],[[[[1,\"\\n          Second Item\\n        \"]],[]]]]],[1,\"\\n      \"]],[1]]]]],[1,\"\\n    \"]],[\"s\"],false,[\"fluid-split-button\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _testHelpers.click)('[data-test-split-button-menu-trigger]');
      assert.dom('[data-test-menu-button]').hasTagName('button', 'Menu items default to being a `button`');
      assert.dom('[data-test-menu-button]').hasAttribute('type', 'button', '`button` menu items have the `type` attribute');
      assert.dom('[data-test-menu-link]').hasTagName('a', 'The `@tagName` attribute can change the tag');
      assert.dom('[data-test-menu-link]').hasNoAttribute('type', 'Non-`button` menu items have no `type` attribute');
    });
    (0, _qunit.module)('menu operation', function () {
      (0, _qunit.test)('it dismisses the menu when clicking outside of it', async function (assert) {
        await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
        /*
          
                <button data-test-element-outside></button>
        
                <FluidSplitButton as |s|>
                  <s.PrimaryButton>
                    Button
                  </s.PrimaryButton>
        
                  <s.MenuItem>
                    First
                  </s.MenuItem>
                </FluidSplitButton>
              
        */
        {
          "id": "DWoeSIZe",
          "block": "[[[1,\"\\n        \"],[10,\"button\"],[14,\"data-test-element-outside\",\"\"],[12],[13],[1,\"\\n\\n        \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n          \"],[8,[30,1,[\"PrimaryButton\"]],null,null,[[\"default\"],[[[[1,\"\\n            Button\\n          \"]],[]]]]],[1,\"\\n\\n          \"],[8,[30,1,[\"MenuItem\"]],null,null,[[\"default\"],[[[[1,\"\\n            First\\n          \"]],[]]]]],[1,\"\\n        \"]],[1]]]]],[1,\"\\n      \"]],[\"s\"],false,[\"fluid-split-button\"]]",
          "moduleName": "(unknown template module)",
          "isStrictMode": false
        }));
        await (0, _testHelpers.click)('[data-test-split-button-menu-trigger]');
        assert.dom('[data-test-split-button-menu]').exists('The menu is open');
        await (0, _testHelpers.click)('[data-test-element-outside]');
        assert.dom('[data-test-split-button-menu]').doesNotExist('The menu has been dismissed');
      });
      (0, _qunit.test)('navigating the menu with the keyboard', async function (assert) {
        await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
        /*
          
                <FluidSplitButton data-test-split-button="" as |s|>
                  <s.PrimaryButton>
                    Button
                  </s.PrimaryButton>
        
                  <s.MenuItem data-test-menu-item="first">
                    First
                  </s.MenuItem>
        
                  <s.MenuItem data-test-menu-item="second">
                    Second
                  </s.MenuItem>
                </FluidSplitButton>
              
        */
        {
          "id": "aCPw3/5v",
          "block": "[[[1,\"\\n        \"],[8,[39,0],[[24,\"data-test-split-button\",\"\"]],null,[[\"default\"],[[[[1,\"\\n          \"],[8,[30,1,[\"PrimaryButton\"]],null,null,[[\"default\"],[[[[1,\"\\n            Button\\n          \"]],[]]]]],[1,\"\\n\\n          \"],[8,[30,1,[\"MenuItem\"]],[[24,\"data-test-menu-item\",\"first\"]],null,[[\"default\"],[[[[1,\"\\n            First\\n          \"]],[]]]]],[1,\"\\n\\n          \"],[8,[30,1,[\"MenuItem\"]],[[24,\"data-test-menu-item\",\"second\"]],null,[[\"default\"],[[[[1,\"\\n            Second\\n          \"]],[]]]]],[1,\"\\n        \"]],[1]]]]],[1,\"\\n      \"]],[\"s\"],false,[\"fluid-split-button\"]]",
          "moduleName": "(unknown template module)",
          "isStrictMode": false
        }));
        await (0, _testHelpers.triggerKeyEvent)('[data-test-split-button]', 'keydown', 'ArrowDown', {
          altKey: true
        });
        assert.dom('[data-test-split-button-menu]').exists('The menu is open');
        assert.dom('[data-test-menu-item="first"]').hasClass('appearance:focused', 'The first menu item is immediately pseudo-focused');
        await (0, _testHelpers.triggerKeyEvent)('[data-test-split-button]', 'keydown', 'ArrowDown');
        assert.dom('[data-test-menu-item="second"]').hasClass('appearance:focused', 'Navigating down pseudo-focuses the second menu item');
        await (0, _testHelpers.triggerKeyEvent)('[data-test-split-button]', 'keydown', 'ArrowDown');
        assert.dom('[data-test-menu-item="first"]').hasClass('appearance:focused', 'Navigating down loops pseudo-focus back to the first menu item');
        await (0, _testHelpers.triggerKeyEvent)('[data-test-split-button]', 'keydown', 'ArrowUp');
        assert.dom('[data-test-menu-item="second"]').hasClass('appearance:focused', 'Navigating up loops pseudo-focus back to the second menu item');
        await (0, _testHelpers.triggerKeyEvent)('[data-test-split-button]', 'keydown', 'ArrowUp');
        assert.dom('[data-test-menu-item="first"]').hasClass('appearance:focused', 'Navigating up pseudo-focuses the first menu item');

        // Focus second item to ensure reset correctly takes place
        await (0, _testHelpers.triggerKeyEvent)('[data-test-split-button]', 'keydown', 'ArrowUp');

        // Hide the menu
        await (0, _testHelpers.triggerKeyEvent)('[data-test-split-button]', 'keydown', 'ArrowUp', {
          altKey: true
        });
        assert.dom('[data-test-split-button-menu]').doesNotExist('The menu is closed');

        // Open it again
        await (0, _testHelpers.triggerKeyEvent)('[data-test-split-button]', 'keydown', 'ArrowDown', {
          altKey: true
        });
        assert.dom('[data-test-menu-item="first"]').hasClass('appearance:focused', 'Pseudo-focus is returned to the first menu item');
      });
      (0, _qunit.test)('selecting menu items with the keyboard', async function (assert) {
        this.primaryAction = _testdouble.default.function();
        this.menuItemAction = _testdouble.default.function();
        await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
        /*
          
                <FluidSplitButton as |s|>
                  <s.PrimaryButton data-test-primary-button {{on 'click' this.primaryAction}}>
                    Button
                  </s.PrimaryButton>
        
                  <s.MenuItem data-test-menu-item {{on 'click' this.menuItemAction}}>
                    First
                  </s.MenuItem>
                </FluidSplitButton>
              
        */
        {
          "id": "GQ8BKKrk",
          "block": "[[[1,\"\\n        \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n          \"],[8,[30,1,[\"PrimaryButton\"]],[[24,\"data-test-primary-button\",\"\"],[4,[38,1],[\"click\",[30,0,[\"primaryAction\"]]],null]],null,[[\"default\"],[[[[1,\"\\n            Button\\n          \"]],[]]]]],[1,\"\\n\\n          \"],[8,[30,1,[\"MenuItem\"]],[[24,\"data-test-menu-item\",\"\"],[4,[38,1],[\"click\",[30,0,[\"menuItemAction\"]]],null]],null,[[\"default\"],[[[[1,\"\\n            First\\n          \"]],[]]]]],[1,\"\\n        \"]],[1]]]]],[1,\"\\n      \"]],[\"s\"],false,[\"fluid-split-button\",\"on\"]]",
          "moduleName": "(unknown template module)",
          "isStrictMode": false
        }));
        await (0, _testHelpers.triggerKeyEvent)('[data-test-primary-button]', 'keydown', 'ArrowDown', {
          altKey: true
        });
        await (0, _testHelpers.triggerKeyEvent)('[data-test-primary-button]', 'keydown', 'Enter');
        await (0, _testHelpers.triggerKeyEvent)('[data-test-primary-button]', 'keydown', 'ArrowDown', {
          altKey: true
        });
        await (0, _testHelpers.triggerKeyEvent)('[data-test-primary-button]', 'keydown', ' ');
        assert.verify(this.menuItemAction(_testdouble.default.matchers.isA(MouseEvent)), {
          times: 2
        }, 'Runs the `click` handler for the menu item button');
      });
      (0, _qunit.test)('selecting menu items with the mouse', async function (assert) {
        this.menuItemAction = _testdouble.default.function();
        await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
        /*
          
                <FluidSplitButton as |s|>
                  <s.PrimaryButton>
                    Button
                  </s.PrimaryButton>
        
                  <s.MenuItem data-test-menu-item {{on 'click' this.menuItemAction}}>
                    First
                  </s.MenuItem>
                </FluidSplitButton>
              
        */
        {
          "id": "6Qpvh2V/",
          "block": "[[[1,\"\\n        \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n          \"],[8,[30,1,[\"PrimaryButton\"]],null,null,[[\"default\"],[[[[1,\"\\n            Button\\n          \"]],[]]]]],[1,\"\\n\\n          \"],[8,[30,1,[\"MenuItem\"]],[[24,\"data-test-menu-item\",\"\"],[4,[38,1],[\"click\",[30,0,[\"menuItemAction\"]]],null]],null,[[\"default\"],[[[[1,\"\\n            First\\n          \"]],[]]]]],[1,\"\\n        \"]],[1]]]]],[1,\"\\n      \"]],[\"s\"],false,[\"fluid-split-button\",\"on\"]]",
          "moduleName": "(unknown template module)",
          "isStrictMode": false
        }));
        await (0, _testHelpers.click)('[data-test-split-button-menu-trigger]');
        await (0, _testHelpers.click)('[data-test-menu-item]');
        assert.verify(this.menuItemAction(_testdouble.default.matchers.isA(MouseEvent)));
      });
    });
  });
});
define("dummy/tests/integration/components/fluid-table-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers"], function (_templateFactory, _qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | fluid-table', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it does not render label without label param', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <FluidTable />
      */
      {
        "id": "/wkCGOmb",
        "block": "[[[8,[39,0],null,null,null]],[],false,[\"fluid-table\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('.fluid-table__label').doesNotExist();
    });
    (0, _qunit.test)('it renders', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidTable
              @label="Ember Component"
              as |table| >
              {{#let
                (component 'fluid-table/th')
                (component 'fluid-table/td')
                as |th td|}}
                <table.header>
                  <th>CSS Selector</th>
                  <th>Label</th>
                  <th>Preview</th>
                  <th>Type</th>
                </table.header>
                <table.body>
                <tr>
                  <td>.pip-summary &gt; h1</td>
                  <td>column-row</td>
                  <td>Teal Ombre Reactive Glaze Vase</td>
                  <td>Text</td>
                </tr>
                <tr>
                  <td>.hero-container .hero-image #hero</td>
                  <td>column-row</td>
                  <td>{{svg-jar "picture-file"}}</td>
                  <td>Image</td>
                </tr>
                <tr>
                  <td>.accordion-component li</td>
                  <td>column-row</td>
                  <td>
                    Handcrafted of china clay using a reactive technique that allows shades of green.
                  </td>
                  <td>Text</td>
                </tr>
                </table.body>
               {{/let}}
            </FluidTable>
          
      */
      {
        "id": "NrAl57hN",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@label\"],[\"Ember Component\"]],[[\"default\"],[[[[1,\"\\n\"],[44,[[50,\"fluid-table/th\",0,null,null],[50,\"fluid-table/td\",0,null,null]],[[[1,\"          \"],[8,[30,1,[\"header\"]],null,null,[[\"default\"],[[[[1,\"\\n            \"],[8,[30,2],null,null,[[\"default\"],[[[[1,\"CSS Selector\"]],[]]]]],[1,\"\\n            \"],[8,[30,2],null,null,[[\"default\"],[[[[1,\"Label\"]],[]]]]],[1,\"\\n            \"],[8,[30,2],null,null,[[\"default\"],[[[[1,\"Preview\"]],[]]]]],[1,\"\\n            \"],[8,[30,2],null,null,[[\"default\"],[[[[1,\"Type\"]],[]]]]],[1,\"\\n          \"]],[]]]]],[1,\"\\n          \"],[8,[30,1,[\"body\"]],null,null,[[\"default\"],[[[[1,\"\\n          \"],[10,\"tr\"],[12],[1,\"\\n            \"],[8,[30,3],null,null,[[\"default\"],[[[[1,\".pip-summary > h1\"]],[]]]]],[1,\"\\n            \"],[8,[30,3],null,null,[[\"default\"],[[[[1,\"column-row\"]],[]]]]],[1,\"\\n            \"],[8,[30,3],null,null,[[\"default\"],[[[[1,\"Teal Ombre Reactive Glaze Vase\"]],[]]]]],[1,\"\\n            \"],[8,[30,3],null,null,[[\"default\"],[[[[1,\"Text\"]],[]]]]],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,\"tr\"],[12],[1,\"\\n            \"],[8,[30,3],null,null,[[\"default\"],[[[[1,\".hero-container .hero-image #hero\"]],[]]]]],[1,\"\\n            \"],[8,[30,3],null,null,[[\"default\"],[[[[1,\"column-row\"]],[]]]]],[1,\"\\n            \"],[8,[30,3],null,null,[[\"default\"],[[[[1,[28,[35,3],[\"picture-file\"],null]]],[]]]]],[1,\"\\n            \"],[8,[30,3],null,null,[[\"default\"],[[[[1,\"Image\"]],[]]]]],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,\"tr\"],[12],[1,\"\\n            \"],[8,[30,3],null,null,[[\"default\"],[[[[1,\".accordion-component li\"]],[]]]]],[1,\"\\n            \"],[8,[30,3],null,null,[[\"default\"],[[[[1,\"column-row\"]],[]]]]],[1,\"\\n            \"],[8,[30,3],null,null,[[\"default\"],[[[[1,\"\\n              Handcrafted of china clay using a reactive technique that allows shades of green.\\n            \"]],[]]]]],[1,\"\\n            \"],[8,[30,3],null,null,[[\"default\"],[[[[1,\"Text\"]],[]]]]],[1,\"\\n          \"],[13],[1,\"\\n          \"]],[]]]]],[1,\"\\n\"]],[2,3]]],[1,\"      \"]],[1]]]]],[1,\"\\n    \"]],[\"table\",\"th\",\"td\"],false,[\"fluid-table\",\"let\",\"component\",\"svg-jar\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('.fluid-table__th').exists({
        count: 4
      });
      assert.dom('.fluid-table__td').exists({
        count: 12
      });
    });
    (0, _qunit.test)('it renders w/compressed', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidTable
              @isCompressed=true
              as |table| >
              {{#let
                (component 'fluid-table/th')
                (component 'fluid-table/td')
                as |th td|}}
                <table.header>
                  <th>CSS Selector</th>
                  <th>Label</th>
                  <th>Preview</th>
                  <th>Type</th>
                </table.header>
                <table.body>
                <tr>
                  <td>.pip-summary &gt; h1</td>
                  <td>column-row</td>
                  <td>Teal Ombre Reactive Glaze Vase</td>
                  <td>Text</td>
                </tr>
                </table.body>
               {{/let}}
            </FluidTable>
          
      */
      {
        "id": "q+8qEdCh",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@isCompressed\"],[\"true\"]],[[\"default\"],[[[[1,\"\\n\"],[44,[[50,\"fluid-table/th\",0,null,null],[50,\"fluid-table/td\",0,null,null]],[[[1,\"          \"],[8,[30,1,[\"header\"]],null,null,[[\"default\"],[[[[1,\"\\n            \"],[8,[30,2],null,null,[[\"default\"],[[[[1,\"CSS Selector\"]],[]]]]],[1,\"\\n            \"],[8,[30,2],null,null,[[\"default\"],[[[[1,\"Label\"]],[]]]]],[1,\"\\n            \"],[8,[30,2],null,null,[[\"default\"],[[[[1,\"Preview\"]],[]]]]],[1,\"\\n            \"],[8,[30,2],null,null,[[\"default\"],[[[[1,\"Type\"]],[]]]]],[1,\"\\n          \"]],[]]]]],[1,\"\\n          \"],[8,[30,1,[\"body\"]],null,null,[[\"default\"],[[[[1,\"\\n          \"],[10,\"tr\"],[12],[1,\"\\n            \"],[8,[30,3],null,null,[[\"default\"],[[[[1,\".pip-summary > h1\"]],[]]]]],[1,\"\\n            \"],[8,[30,3],null,null,[[\"default\"],[[[[1,\"column-row\"]],[]]]]],[1,\"\\n            \"],[8,[30,3],null,null,[[\"default\"],[[[[1,\"Teal Ombre Reactive Glaze Vase\"]],[]]]]],[1,\"\\n            \"],[8,[30,3],null,null,[[\"default\"],[[[[1,\"Text\"]],[]]]]],[1,\"\\n          \"],[13],[1,\"\\n          \"]],[]]]]],[1,\"\\n\"]],[2,3]]],[1,\"      \"]],[1]]]]],[1,\"\\n    \"]],[\"table\",\"th\",\"td\"],false,[\"fluid-table\",\"let\",\"component\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('.fluid-table--compressed').exists();
    });
  });
});
define("dummy/tests/integration/components/fluid-text-input-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers", "testdouble", "@percy/ember"], function (_templateFactory, _qunit, _emberQunit, _testHelpers, _testdouble, _ember) {
  "use strict";

  (0, _qunit.module)('Integration | Component | fluid-text-input', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function () {
      this.handleInput = _testdouble.default.function();
    });
    (0, _qunit.test)('oeprating like a text input', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidTextInput
              @value="Value"
              @placeholder="Placeholder"
              {{on 'input' this.handleInput}}
            />
          
      */
      {
        "id": "9v0cQrTm",
        "block": "[[[1,\"\\n      \"],[8,[39,0],[[4,[38,1],[\"input\",[30,0,[\"handleInput\"]]],null]],[[\"@value\",\"@placeholder\"],[\"Value\",\"Placeholder\"]],null],[1,\"\\n    \"]],[],false,[\"fluid-text-input\",\"on\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('input').hasValue('Value', 'Passes the `@value` to the input');
      assert.dom('input').hasAttribute('placeholder', 'Placeholder', 'Passes the `@placeholder` to the input');
      await (0, _testHelpers.fillIn)('input', 'foobar');
      assert.verify(this.handleInput(_testdouble.default.matchers.isA(Event)), 'Can listen for input events with the {{on}} modifier');
      assert.verify(this.handleInput(_testdouble.default.matchers.contains({
        target: {
          value: 'foobar'
        }
      })), 'Event target is the input element');
    });
    (0, _qunit.test)('disabling the input', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidTextInput
              @value="Value"
              @placeholder="Placeholder"
              @disabled={{true}}
            />
          
      */
      {
        "id": "Tg8DWenp",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@value\",\"@placeholder\",\"@disabled\"],[\"Value\",\"Placeholder\",true]],null],[1,\"\\n    \"]],[],false,[\"fluid-text-input\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('input').isDisabled();
    });
    (0, _qunit.test)('it can render an icon in the input', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidTextInput as |ft|>
              <ft.icon @name="search" />
              <ft.input value="Value" />
            </FluidTextInput>
          
      */
      {
        "id": "05JUBsyF",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        \"],[8,[30,1,[\"icon\"]],null,[[\"@name\"],[\"search\"]],null],[1,\"\\n        \"],[8,[30,1,[\"input\"]],[[24,2,\"Value\"]],null,null],[1,\"\\n      \"]],[1]]]]],[1,\"\\n    \"]],[\"ft\"],false,[\"fluid-text-input\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _ember.default)(assert);
      assert.dom('svg').exists('Renders an icon');
    });
    (0, _qunit.test)('it can render a leading add-on', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidTextInput as |ft|>
              <ft.leading @letter="w" data-test-leading />
              <ft.input value="Value" />
            </FluidTextInput>
          
      */
      {
        "id": "WjBzzOJi",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n        \"],[8,[30,1,[\"leading\"]],[[24,\"data-test-leading\",\"\"]],[[\"@letter\"],[\"w\"]],null],[1,\"\\n        \"],[8,[30,1,[\"input\"]],[[24,2,\"Value\"]],null,null],[1,\"\\n      \"]],[1]]]]],[1,\"\\n    \"]],[\"ft\"],false,[\"fluid-text-input\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _ember.default)(assert);
      assert.dom('[data-test-leading]').hasText('w');
    });
    (0, _qunit.test)('passing a type attribute changes the type of input', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidTextInput @type="password" />
          
      */
      {
        "id": "N6bH4qKh",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@type\"],[\"password\"]],null],[1,\"\\n    \"]],[],false,[\"fluid-text-input\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('input').hasAttribute('type', 'password', 'Can provide custom type to input');
    });
    (0, _qunit.module)('rendering the input in block mode', function () {
      (0, _qunit.test)('passing properties to the FluidTextInput', async function (assert) {
        await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
        /*
          
                <FluidTextInput @value="Value" @placeholder="Placeholder" @disabled={{true}} @type="password" as |ft|>
                  <ft.input />
                </FluidTextInput>
              
        */
        {
          "id": "GEcgdUQ9",
          "block": "[[[1,\"\\n        \"],[8,[39,0],null,[[\"@value\",\"@placeholder\",\"@disabled\",\"@type\"],[\"Value\",\"Placeholder\",true,\"password\"]],[[\"default\"],[[[[1,\"\\n          \"],[8,[30,1,[\"input\"]],null,null,null],[1,\"\\n        \"]],[1]]]]],[1,\"\\n      \"]],[\"ft\"],false,[\"fluid-text-input\"]]",
          "moduleName": "(unknown template module)",
          "isStrictMode": false
        }));
        assert.dom('input').hasValue('Value', 'Passes along the `value` argument');
        assert.dom('input').hasAttribute('placeholder', 'Placeholder', 'Passes along the `placeholder` argument');
        assert.dom('input').isDisabled('Passes along the `disabled` argument');
        assert.dom('input').hasAttribute('type', 'password', 'Passes along the `type` argument');
      });
      (0, _qunit.test)('passing attributes directly to the input', async function (assert) {
        await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
        /*
          
                <FluidTextInput as |ft|>
                  <ft.input value="Value" />
                </FluidTextInput>
              
        */
        {
          "id": "FMn6fmxE",
          "block": "[[[1,\"\\n        \"],[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n          \"],[8,[30,1,[\"input\"]],[[24,2,\"Value\"]],null,null],[1,\"\\n        \"]],[1]]]]],[1,\"\\n      \"]],[\"ft\"],false,[\"fluid-text-input\"]]",
          "moduleName": "(unknown template module)",
          "isStrictMode": false
        }));
        assert.dom('input').hasValue('Value', 'Can provide attributes directly to the input');
      });
    });
  });
});
define("dummy/tests/integration/components/fluid-tooltip-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers", "@percy/ember"], function (_templateFactory, _qunit, _emberQunit, _testHelpers, _ember) {
  "use strict";

  (0, _qunit.module)('Integration | Component | fluid-tooltip', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('the tooltip displays the correct text and attachment', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
          <div class="m-40">
            <FluidTooltip>
              <:tooltip>
                template block text
              </:tooltip>
      
              <:default as |attachTooltip|>
                <button {{attachTooltip}}>
                  Hover me!
                </button>
              </:default>
            </FluidTooltip>
          </div>
        
      */
      {
        "id": "wV6IAYpW",
        "block": "[[[1,\"\\n    \"],[10,0],[14,0,\"m-40\"],[12],[1,\"\\n      \"],[8,[39,0],null,null,[[\"tooltip\",\"default\"],[[[[1,\"\\n          template block text\\n        \"]],[]],[[[1,\"\\n          \"],[11,\"button\"],[4,[30,1],null,null],[12],[1,\"\\n            Hover me!\\n          \"],[13],[1,\"\\n        \"]],[1]]]]],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[\"attachTooltip\"],false,[\"fluid-tooltip\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('button').hasText('Hover me!');
      await (0, _testHelpers.triggerEvent)('button', 'mouseenter');
      assert.dom('[data-test-tooltip]').hasText('template block text');
      await (0, _ember.default)(assert);
    });
    (0, _qunit.test)('the tooltip is hidden by default', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <div class="m-40">
              <FluidTooltip>
                <:tooltip>
                  template block text
                </:tooltip>
      
                <:default as |attachTooltip|>
                  <button {{attachTooltip}}>
                    Hover me!
                  </button>
                </:default>
              </FluidTooltip>
            </div>
          
      */
      {
        "id": "OzRLHMXo",
        "block": "[[[1,\"\\n      \"],[10,0],[14,0,\"m-40\"],[12],[1,\"\\n        \"],[8,[39,0],null,null,[[\"tooltip\",\"default\"],[[[[1,\"\\n            template block text\\n          \"]],[]],[[[1,\"\\n            \"],[11,\"button\"],[4,[30,1],null,null],[12],[1,\"\\n              Hover me!\\n            \"],[13],[1,\"\\n          \"]],[1]]]]],[1,\"\\n      \"],[13],[1,\"\\n    \"]],[\"attachTooltip\"],false,[\"fluid-tooltip\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('[data-test-tooltip]').doesNotExist('the tooltip is hidden by default');
      await (0, _ember.default)(assert);
    });
    (0, _qunit.test)('the tooltip displays on mousenter and disappears on mouseleave', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <div class="m-40">
              <FluidTooltip>
                <:tooltip>
                  additional information
                </:tooltip>
      
                <:default as |attachTooltip|>
                  <button {{attachTooltip}}>
                    Hover me!
                  </button>
                </:default>
              </FluidTooltip>
            </div>
          
      */
      {
        "id": "OmeOYkUN",
        "block": "[[[1,\"\\n      \"],[10,0],[14,0,\"m-40\"],[12],[1,\"\\n        \"],[8,[39,0],null,null,[[\"tooltip\",\"default\"],[[[[1,\"\\n            additional information\\n          \"]],[]],[[[1,\"\\n            \"],[11,\"button\"],[4,[30,1],null,null],[12],[1,\"\\n              Hover me!\\n            \"],[13],[1,\"\\n          \"]],[1]]]]],[1,\"\\n      \"],[13],[1,\"\\n    \"]],[\"attachTooltip\"],false,[\"fluid-tooltip\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      assert.dom('[data-test-tooltip]').doesNotExist('the tooltip is hidden by default');
      await (0, _testHelpers.triggerEvent)('button', 'mouseenter');
      assert.dom('[data-test-tooltip]').exists('hovering displays the tooltip');
      assert.dom('[data-test-tooltip]').hasText('additional information');
      await (0, _testHelpers.triggerEvent)('button', 'mouseleave');
      assert.dom('[data-test-tooltip]').doesNotExist('tooltip disappears on mouseleave');
    });
    (0, _qunit.test)('the tooltip has correct z-index when used in modal', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <FluidModal @title="Header Content">
              <:default>
                <FluidTooltip>
                  <:tooltip>
                    template block text
                  </:tooltip>
                  <:default as |attachTooltip|>
                    <button {{attachTooltip}}>
                      Hover me!
                    </button>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin magna nulla, laoreet eu tempus quis, rutrum a tortor. Proin in dolor non nisi tincidunt ultrices. Praesent sed tincidunt magna. Duis nisl ipsum, posuere non diam vel, feugiat viverra ipsum. Nulla sed libero sollicitudin, rutrum tortor a, luctus tortor. Integer non arcu eu tortor vehicula sollicitudin. Suspendisse nec molestie sapien. Morbi volutpat leo auctor tortor elementum, ac hendrerit nibh imperdiet. Praesent finibus lectus imperdiet lectus tincidunt, sed vestibulum lorem scelerisque. Quisque in tempor nunc, non ornare mauris. Duis condimentum, enim et rhoncus venenatis, tellus odio varius quam, vitae sodales est ligula nec nulla.</p>
                  </:default>
                </FluidTooltip>
              </:default>
              <:footer>
                <button class="fluid-button size:lg">
                  Close
                </button>
              </:footer>
            </FluidModal>
          
      */
      {
        "id": "nGzPdlNl",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@title\"],[\"Header Content\"]],[[\"default\",\"footer\"],[[[[1,\"\\n          \"],[8,[39,1],null,null,[[\"tooltip\",\"default\"],[[[[1,\"\\n              template block text\\n            \"]],[]],[[[1,\"\\n              \"],[11,\"button\"],[4,[30,1],null,null],[12],[1,\"\\n                Hover me!\\n              \"],[13],[1,\"\\n              \"],[10,2],[12],[1,\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin magna nulla, laoreet eu tempus quis, rutrum a tortor. Proin in dolor non nisi tincidunt ultrices. Praesent sed tincidunt magna. Duis nisl ipsum, posuere non diam vel, feugiat viverra ipsum. Nulla sed libero sollicitudin, rutrum tortor a, luctus tortor. Integer non arcu eu tortor vehicula sollicitudin. Suspendisse nec molestie sapien. Morbi volutpat leo auctor tortor elementum, ac hendrerit nibh imperdiet. Praesent finibus lectus imperdiet lectus tincidunt, sed vestibulum lorem scelerisque. Quisque in tempor nunc, non ornare mauris. Duis condimentum, enim et rhoncus venenatis, tellus odio varius quam, vitae sodales est ligula nec nulla.\"],[13],[1,\"\\n            \"]],[1]]]]],[1,\"\\n        \"]],[]],[[[1,\"\\n          \"],[10,\"button\"],[14,0,\"fluid-button size:lg\"],[12],[1,\"\\n            Close\\n          \"],[13],[1,\"\\n        \"]],[]]]]],[1,\"\\n    \"]],[\"attachTooltip\"],false,[\"fluid-modal\",\"fluid-tooltip\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _testHelpers.triggerEvent)('button', 'mouseenter');
      await (0, _ember.default)(assert);
      assert.expect(0);
    });
  });
});
define("dummy/tests/integration/components/modal-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers", "testdouble", "@percy/ember"], function (_templateFactory, _qunit, _emberQunit, _testHelpers, _testdouble, _ember) {
  "use strict";

  (0, _qunit.module)('Integration | Component | modal', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    hooks.beforeEach(function () {
      this.onClose = _testdouble.default.function();
    });
    (0, _qunit.test)('it renders', async function (assert) {
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        
            <Modal @onClose={{this.onClose}} as |modal|>
              <modal.Title data-test-title>
                This is the title
              </modal.Title>
      
              <modal.Description data-test-description>
                This is the description
              </modal.Description>
      
              <button>Modal needs a focus-able child</button>
            </Modal>
          
      */
      {
        "id": "H2ySityY",
        "block": "[[[1,\"\\n      \"],[8,[39,0],null,[[\"@onClose\"],[[30,0,[\"onClose\"]]]],[[\"default\"],[[[[1,\"\\n        \"],[8,[30,1,[\"Title\"]],[[24,\"data-test-title\",\"\"]],null,[[\"default\"],[[[[1,\"\\n          This is the title\\n        \"]],[]]]]],[1,\"\\n\\n        \"],[8,[30,1,[\"Description\"]],[[24,\"data-test-description\",\"\"]],null,[[\"default\"],[[[[1,\"\\n          This is the description\\n        \"]],[]]]]],[1,\"\\n\\n        \"],[10,\"button\"],[12],[1,\"Modal needs a focus-able child\"],[13],[1,\"\\n      \"]],[1]]]]],[1,\"\\n    \"]],[\"modal\"],false,[\"modal\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _ember.default)(assert);
      assert.dom('[data-test-title]').exists('The content in the modal is displayed');
      await (0, _testHelpers.click)('[data-test-modal-overlay]');
      assert.verify(this.onClose(), '`@onClose` is called when clicking the overlay');
      const dialog = (0, _testHelpers.find)('[data-test-modal-dialog]');
      const titleId = dialog.getAttribute('aria-labelledby');
      const descriptionId = dialog.getAttribute('aria-describedby');
      assert.dom('[data-test-title]').hasAttribute('id', titleId, 'The `modal.Title` component labels the dialog');
      assert.dom('[data-test-description]').hasAttribute('id', descriptionId, 'The `modal.Description` component describes the dialog');
    });
  });
});
define("dummy/tests/integration/modifiers/key-down-test", ["@ember/template-factory", "qunit", "ember-qunit", "@ember/test-helpers", "testdouble"], function (_templateFactory, _qunit, _emberQunit, _testHelpers, _testdouble) {
  "use strict";

  (0, _qunit.module)('Integration | Modifier | key-down', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it recognizes a key on an input', async function (assert) {
      this.onEnter = _testdouble.default.function();
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <input {{key-down 'Enter' this.onEnter}}>
      */
      {
        "id": "8RiNI9QY",
        "block": "[[[11,\"input\"],[4,[38,0],[\"Enter\",[30,0,[\"onEnter\"]]],null],[12],[13]],[],false,[\"key-down\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _testHelpers.triggerKeyEvent)('input', 'keydown', 'Enter', {
        altKey: true
      });
      assert.verify(this.onEnter(), {
        ignoreExtraArgs: true,
        times: 0
      }, 'Did not call the handler when a modifier was provided');
      await (0, _testHelpers.triggerKeyEvent)('input', 'keydown', 'Enter');
      assert.verify(this.onEnter(_testdouble.default.matchers.argThat(arg => arg.constructor.name === 'KeyboardEvent')), {
        times: 1
      }, 'Called with the event as an argument');
    });
    (0, _qunit.test)('it can require a modifier for the input', async function (assert) {
      this.onEnter = _testdouble.default.function();
      await (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
      /*
        <input {{key-down 'Enter' this.onEnter altKey=true}}>
      */
      {
        "id": "BxyTEBdG",
        "block": "[[[11,\"input\"],[4,[38,0],[\"Enter\",[30,0,[\"onEnter\"]]],[[\"altKey\"],[true]]],[12],[13]],[],false,[\"key-down\"]]",
        "moduleName": "(unknown template module)",
        "isStrictMode": false
      }));
      await (0, _testHelpers.triggerKeyEvent)('input', 'keydown', 'Enter');
      assert.verify(this.onEnter(), {
        ignoreExtraArgs: true,
        times: 0
      }, 'Did not call the handler when the modifier is not part of the trigger');
      await (0, _testHelpers.triggerKeyEvent)('input', 'keydown', 'Enter', {
        altKey: true
      });
      assert.verify(this.onEnter(_testdouble.default.matchers.argThat(arg => arg.constructor.name === 'KeyboardEvent')), {
        times: 1
      }, 'Called with the event as an argument when the modifer is provided');
    });
  });
});
define("dummy/tests/mocks/spy", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;
  function _default(callback) {
    const fn = function (...args) {
      fn.calledWith = args;
      fn.called++;
      if (callback) {
        return callback.apply(this, args);
      }
    };
    fn.called = 0;
    return fn;
  }
});
define("dummy/tests/page-object", ["exports", "ember-cli-page-object/test-support/-private/deprecate", "ember-cli-page-object"], function (_exports, _deprecate, _emberCliPageObject) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "alias", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.alias;
    }
  });
  Object.defineProperty(_exports, "attribute", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.attribute;
    }
  });
  Object.defineProperty(_exports, "buildSelector", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.buildSelector;
    }
  });
  Object.defineProperty(_exports, "clickOnText", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.clickOnText;
    }
  });
  Object.defineProperty(_exports, "clickable", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.clickable;
    }
  });
  Object.defineProperty(_exports, "collection", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.collection;
    }
  });
  Object.defineProperty(_exports, "contains", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.contains;
    }
  });
  Object.defineProperty(_exports, "count", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.count;
    }
  });
  Object.defineProperty(_exports, "create", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.create;
    }
  });
  _exports.default = void 0;
  Object.defineProperty(_exports, "fillable", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.fillable;
    }
  });
  Object.defineProperty(_exports, "findElement", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.findElement;
    }
  });
  Object.defineProperty(_exports, "findElementWithAssert", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.findElementWithAssert;
    }
  });
  Object.defineProperty(_exports, "focusable", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.focusable;
    }
  });
  Object.defineProperty(_exports, "fullScope", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.fullScope;
    }
  });
  Object.defineProperty(_exports, "getContext", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.getContext;
    }
  });
  Object.defineProperty(_exports, "hasClass", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.hasClass;
    }
  });
  Object.defineProperty(_exports, "is", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.is;
    }
  });
  Object.defineProperty(_exports, "isHidden", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.isHidden;
    }
  });
  Object.defineProperty(_exports, "isPresent", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.isPresent;
    }
  });
  Object.defineProperty(_exports, "isVisible", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.isVisible;
    }
  });
  Object.defineProperty(_exports, "notHasClass", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.notHasClass;
    }
  });
  Object.defineProperty(_exports, "property", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.property;
    }
  });
  Object.defineProperty(_exports, "selectable", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.fillable;
    }
  });
  Object.defineProperty(_exports, "text", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.text;
    }
  });
  Object.defineProperty(_exports, "triggerable", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.triggerable;
    }
  });
  Object.defineProperty(_exports, "value", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.value;
    }
  });
  Object.defineProperty(_exports, "visitable", {
    enumerable: true,
    get: function () {
      return _emberCliPageObject.visitable;
    }
  });
  var _default = {
    alias: _emberCliPageObject.alias,
    attribute: _emberCliPageObject.attribute,
    blurrable: _emberCliPageObject.blurrable,
    clickOnText: _emberCliPageObject.clickOnText,
    clickable: _emberCliPageObject.clickable,
    collection: _emberCliPageObject.collection,
    contains: _emberCliPageObject.contains,
    count: _emberCliPageObject.count,
    create: _emberCliPageObject.create,
    fillable: _emberCliPageObject.fillable,
    focusable: _emberCliPageObject.focusable,
    hasClass: _emberCliPageObject.hasClass,
    is: _emberCliPageObject.is,
    isHidden: _emberCliPageObject.isHidden,
    isPresent: _emberCliPageObject.isPresent,
    isVisible: _emberCliPageObject.isVisible,
    notHasClass: _emberCliPageObject.notHasClass,
    property: _emberCliPageObject.property,
    selectable: _emberCliPageObject.fillable,
    text: _emberCliPageObject.text,
    triggerable: _emberCliPageObject.triggerable,
    value: _emberCliPageObject.value,
    visitable: _emberCliPageObject.visitable
  };
  _exports.default = _default;
  (0, _deprecate.default)('import-from-test-support', `Importing from "test-support" is now deprecated. Please import directly from the "ember-cli-page-object" module instead.`, '1.16.0', '2.0.0');
});
define("dummy/tests/test-helper", ["qunit", "dummy/app", "dummy/config/environment", "@ember/test-helpers", "ember-exam/test-support/start", "qunit-dom", "dummy/tests/helpers/assertions", "dummy/tests/assertions/testdouble"], function (_qunit, _app, _environment, _testHelpers, _start, _qunitDom, _assertions, _testdouble) {
  "use strict";

  (0, _qunitDom.setup)(_qunit.default.assert);
  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _start.default)();
});
define('dummy/config/environment', [], function() {
  var prefix = 'dummy';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('dummy/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
