$(document).foundation();

var formFieldHighlight = function() {

    var highlight = function(elm, remove) {
	// Highlights a field
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

    var loginSubmit = function() {
	// Add pending animation
	var form = document.getElementById('loginForm');

	window.setTimeout(function() {
	    var circle = [];
	    for (var i=1; i<9; i++) {
		circle[i] = document.createElement('div');
		circle[i].className = 'pending-circle c0' + i;
		$(form).after(circle[i]);
	    }	    
	}, 250);

	// Set animation to play and fix the top margin by scaling the parent's heigh
	$(form).addClass('pending').parent().height($(form).height());
	var inner = $(form).find('.login-content-wrapper');
	// Set the height of the inner wrapper so the FF animation will appear correct
	inner.css('height', inner.height() + 'px');

	// Need to add field validation

	// Check for correct creds

    };
    
    var inputs = $('input');
    inputs.each(function() {
	$(this).on('focus', function() {
	    highlight($(this));
	});
	$(this).on('blur',function() {
	    highlight($(this),true);
	});

	if ($(this)[0].type == 'submit') {
	    // Form submission
	    $(this).on('click', function(e) {
		e.preventDefault();
		loginSubmit();
	    });
	}
    });

    // Focus on the intial input
    var email = document.getElementById('email');
    email.focus();
};

var init = function() {
    formFieldHighlight();
};



init();
