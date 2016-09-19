//Here"s my data model

var ViewModel = function(first, last) {
    this.firstName = ko.observable(first);
    this.lastName = ko.observable(last);
 
    this.fullName = ko.computed(function() {
        // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
        return this.firstName() + " " + this.lastName();
    }, this);

    this.numberOfClicks = ko.observable(0);
    
    this.registerClick = function() {
        this.numberOfClicks(this.numberOfClicks() + 1);
    };
 
    this.resetClicks = function() {
        this.numberOfClicks(0);
    };
 
    this.hasClickedTooManyTimes = ko.pureComputed(function() {
        return this.numberOfClicks() >= 3;
    }, this);

};
    ko.bindingHandlers.jqButton = {
    	    init: function(element) {
    	       $(element).button(); // Turns the element into a jQuery UI button
    	    }
    	};
    
ko.applyBindings(new ViewModel("Planet", "Earth")); // This makes Knockout get to work
