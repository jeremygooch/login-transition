// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();


var formFieldHighlight = function() {
    var highlight = function(elm, remove) {
	var parent = elm.parent();
	if (!remove) {
	    parent.addClass('active');
	    parent.removeClass('fadeOut');
	} else {
	    parent.removeClass('active');
	    parent.addClass('fadeOut');
	    window.setTimeout(function() {
		parent.removeClass('fadeOut');
	    }, 355);
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
