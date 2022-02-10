window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  throwOnUnhandled: false,
  workflow: [
    { handler: 'silence', matchId: 'ember-cli-page-object.string-properties-on-definition' },
    { handler: 'silence', matchId: 'implicit-injections' },
    { handler: 'silence', matchId: 'this-property-fallback' },
    { handler: 'silence', matchId: 'deprecated-run-loop-and-computed-dot-access' },
    { handler: 'silence', matchId: 'manager-capabilities.modifiers-3-13' },
    { handler: 'silence', matchId: 'ember-global' },
    { handler: 'silence', matchId: 'ember-string.prototype-extensions' },
  ],
};
