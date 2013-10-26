;(function (window, _, Backbone) {
  'use strict';

  // Supported syntaxes:
  // systemEvents.when('ev1', 'ev2', cb, this);
  // systemEvents.when('ev1 ev2', cb, this);
  Backbone.Events.when = Backbone.when = function () {
    var args      = arguments,
        callback  = args[args.length - 2],
        context   = args[args.length - 1],
        events    = [].slice.call(args, 0, args.length - 2),
        that      = this,
        aggregatedArgs = {},
        // Regular expression used to split event strings
        eventSplitter = /\s+/,
        whenCallback;

    if (! events.length) return;

    // For obj.on('e1 e2', cb, this) syntax
    if (events.length === 1) events = events[0].split(eventSplitter);

    // After all of the events have fired
    whenCallback = _.after(events.length, function () {
      // Resolve the callback with the context and the final argument set
      callback.call(context, aggregatedArgs);
    });

    // Set up the binding for each of the chained events
    _.each(events, function (eventName) {
      that.once(eventName, function () {
        aggregatedArgs[eventName] = arguments;
        whenCallback();
      });
    });
  };

})(window, window._, window.Backbone);