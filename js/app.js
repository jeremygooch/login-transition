$(document).foundation();

var formFieldHighlight = function() {
    var highlight = function(elm, remove) {
	var beforeClass = 'focusBefore', afterClass= 'focusAfter';
	if (!remove) {
	    var before = document.createElement('div'),
	        after  = document.createElement('div');

	    before.className	= beforeClass;
	    after.className	= afterClass;

	    elm.after(after);
	    elm.before(before);
	} else {
	    var before = elm.prev('.' + beforeClass),
	        after  = elm.next('.' + afterClass);

	    before.addClass('fadeOut');
	    after.addClass('fadeOut');
	    window.setTimeout(function() {
		before.remove();
		after.remove();
	    }, 500);
	}
    };
    
    var inputs = $('input');
    inputs.each(function() {
	$(this).on('focus', function() {
	    highlight($(this));
	});
	$(this).on('blur',function() {
	    highlight($(this),true);
	});
    });
};

var init = function() {
    formFieldHighlight();
};



init();
