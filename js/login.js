var settings = {
    general: {
	capturedClassName: "capture",
	errorClassName: "error",
	username: "demo",
	password: "demo"
    }
};

function focusField() {
    var email = document.getElementById("email");
    email.focus();
};

function serverRqst(fields) {
    // Return a new promise.
    return new Promise(function(resolve, reject) {
	setTimeout(function() {
	    var output = {};
	    if (fields.email.value != settings.general.username) {
		output.passed = false;
		output.emailErr = true;
	    } else {
		output.emailErr = false;
	    }
	    if (fields.password.value != settings.general.password) {
		output.passed = false;
		output.passErr = true;
	    } else {
		output.passErr = false;
	    }

	    if (output.passed === undefined) {
		output.passed = true;
	    }

	    resolve(output);
	}, 600);
    });
};

function serverRequest(fields, callback) {
    var output = {};
    if (fields.user != settings.general.username) {
	output.passed = false;
	output.user = true;
    }
    if (fields.password != settings.general.password) {
	output.passed = false;
	output.pass = true;
    }

    if (output.passed === undefined) {
	output.passed = true;
    }
};

function formSubmit(form) {
    function getInputFields() {
	var output = {};
	for (var i=0; i<form.length; i++){
	    switch(form[i].id) {
	    case "email":
		output.email = form[i];
		break;
	    case "pass":
		output.password = form[i];
		break;
	    default:
		break;
	    };
	}
	return output;
    };

    function highlightField(e, field, classList) {
	// Check for existing error before adding a new one
	if (classList[classList.length -1] != e) { 
	    field.className += " " + e;  
	}
	return true;
    };

    function removeHighlight(e, field, classList) {
	for (var i=0; i<=classList.length; i++) {
	    if (classList[i] == e) {
		field.className = (field.className)
		    .substring(0, (field.className).length - (e.length +1));
	    }
	}
    };

    function validateFields(fields) {
	var email	= fields.email, 
	    pass	= fields.password,
	    eClassList  = email.classList,
	    pClassList  = pass.classList,
	    errorClass  = settings.general.errorClassName,
	    valid	= true;

	if ((email.value).length <= 3) { // Show Error
	    highlightField(errorClass, email, eClassList);
	    valid = false;
	} else { // Hide Error
	    removeHighlight(errorClass, email, eClassList);
	}
	if ((pass.value).length <= 3) { // Show Error
	    highlightField(errorClass, pass, pClassList);
	    valid = false;
	} else { // Hide Error
	    removeHighlight(errorClass, pass, pClassList);
	}
	return valid;
    };

    function captureFields(fields) {
	// Remove any previous error messages
	removeHighlight(settings.general.errorClassName, fields.email, fields.email.classList);
	removeHighlight(settings.general.errorClassName, fields.password, fields.password.classList);

	// Remove any previous bg text
	fields.email.nextElementSibling = {};
	fields.email.nextSibling = {};

	function convertPass() {
	    var output = "";
	    for(var i=0; i<(fields.password.value).length; i++) {
		output+="•";
	    }
	    return output;
	};
	
	var holdClass = settings.general.capturedClassName, convertedPass = convertPass();

	// Add captured text
	var email	= document.createElement("div"),
	    eNode	= document.createTextNode(fields.email.value),
	    pass	= document.createElement("div"),
	    pNode	= document.createTextNode(convertedPass),
	    className	= "capturedText";
	
	email.className = className;
	email.appendChild(eNode);
	fields.email.parentNode.appendChild(email);

	pass.className = className;
	pass.appendChild(pNode);
	fields.password.parentNode.appendChild(pass);

	// Add animation class
	fields.email.className		+= " " + holdClass;
	fields.password.className	+= " " + holdClass;

	// Hide the icons
	var hide = "hide-icon",
	    emailParent = fields.email.parentElement.classList[
		(fields.email.parentElement.classList).length],
	    passParent = fields.password.parentElement.classList[
		(fields.password.parentElement.classList).length];
	
	if (emailParent != hide) {
	    fields.email.parentElement.className += " " + hide;
	}

	if (passParent != hide) {
	    fields.password.parentElement.className += " " + hide;
	}

	return true;
    };

    // validate form
    var fields = getInputFields();
    if (validateFields(fields)) {
	if (captureFields(fields)) {
	    serverRqst(fields).then(function(status) {
		if (status.passed) {
	            console.log('show the login animation...');
		} else {
	            // Release the fields
	            (fields.email.classList).remove(settings.general.capturedClassName);
	            (fields.password.classList).remove(settings.general.capturedClassName);

	            // And show the errors
	            highlightField(settings.general.errorClassName, fields.email, fields.email.classList);
	            highlightField(settings.general.errorClassName, fields.password, fields.password.classList);
		}
	    }, function(error) {
		console.error("Failed!", error);
	    });
	}
    }
};

function loginInit() {
    var loginForm = document.getElementById("loginForm");

    loginForm.onsubmit=function(){
	formSubmit(loginForm);
	return false;
    };

    focusField();
};
