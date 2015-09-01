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

    setTimeout(function() {
        if (typeof callback == "function") {
	    callback(status);
	}
    }, 600);

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
	// Check to make sure we actually need to remove the class
	if (classList[classList.length -1] == e) {
	    field.className = (field.className)
		.substring(0, (field.className).length - (e.length +1));
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
	    removeHighlight(errorClass, email, pClassList);
	}
	return valid;
    };

    function captureFields(fields) {
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
	    var status = serverRequest({
		user: fields.email.value,
		password: fields.password.value
	    }, function(status) {
		if (status.passed) {
		    console.log('show the login animation...');
		} else {
		    // Release the fields
		    (fields.email.classList).remove(settings.general.capturedClassName);
		    (fields.password.classList).remove(settings.general.capturedClassName);

		    // Show the errors
		    highlightField(settings.general.errorClassName, fields.email, fields.email.classList);
		    highlightField(settings.general.errorClassName, fields.password, fields.password.classList);
		}
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
