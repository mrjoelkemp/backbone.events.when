backbone.events.when
====================

### Purpose

Adds support for executing a callback only when a series of events have occurred. This is an event sequencer similar to jquery's `$.when` function but for backbone.js events.

### Problem

Backbone's existing multi-event syntax only provides the capability to execute a callback when **either** of the events have been triggered. 

`Backbone.on('e1 e2', callback, context)`

If you want to execute a callback once **all** of the listed events have executed, you'll have to maintain that state in your application – keeping track of the events that have fired or how many times `callback` was executed. This is fine for a really small number of events, but unwieldy for more than 2 events.

### Solution

Backbone.Events.when provides a simple way to delay the execution of a callback until all events have been triggered. 

`eventsObj.when('e1 e2', callback, context)`

If an event is triggered with data, that data will be available in the callback under the event's name. 

For example, if event `e1` was triggered with `{foo: 1}`, then `callback` would be called with:

	{ 
		e1: [{foo: 1}]
		e2: []
	}


### Usage

`when` is mixed into both Backbone.Events and Backbone itself. This means you can extend Backbone.Events into your own
event aggregator and use `when` or you can call `when` directly on Backbone.

	var eventsObj = _.extend({}, Backbone.Events);
	
	// Dummy callback to print the aggregated data
	function callback(data) {
    	console.log('Aggregated data', data);
    }
     
    // Individual events syntax
    eventsObj.when('e1', 'e2', callback, this);
      
    eventsObj.trigger('e1', { foo: 1 });
    eventsObj.trigger('e2', { bar: 2 });
    
    // Prints via dummy callback
    {
    	e1: [{ foo: 1 }],
    	e2: [{ bar: 2 }]
    }
    
    // Multi-event syntax
    eventsObj.when('e3 e4 e5', callback, this);
      
    eventsObj.trigger('e3', { foo: 3 });
    eventsObj.trigger('e4', { bar: 4 });
    eventsObj.trigger('e5', { car: 5 });

    // Prints via dummy callback
    {
    	e1: [{ foo: 1 }],
    	e2: [{ bar: 2 }],
    	e3: [{ car: 5 }]
    }

OR
    
    // Dummy callback to print the aggregated data
    function callback(data) {
        console.log('Aggregated data', data);
    }
     
    // Individual events syntax
    Backbone.when('e1', 'e2', callback, this);
      
    Backbone.trigger('e1', { foo: 1 });
    Backbone.trigger('e2', { bar: 2 });

### License
MIT