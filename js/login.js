function focusField() {
    var email = document.getElementById("email");
    email.focus();
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

    function validateFields(fields) {
	var email	= fields.email, 
	    pass	= fields.password,
	    eClassList  = email.classList,
	    pClassList  = pass.classList,
	    errorClass  = "error",
	    valid	= true;

	if ((email.value).length <= 3) { // Show Error
	    if (eClassList[eClassList.length -1] != errorClass) { 
	    	email.className += " " + errorClass; 
	    }
	    valid = false;
	} else { // Hide Error
	    if (eClassList[eClassList.length -1] == errorClass) {
		email.className = (email.className)
		    .substring(0, (email.className).length - (errorClass.length +1));
	    }
	}
	if ((pass.value).length <= 3) { // Show Error
	    if (pClassList[pClassList.length -1] != errorClass) { pass.className += " " + errorClass; }
	    valid = false;
	} else { // Hide Error
	    if (pClassList[pClassList.length -1] == errorClass) {
		pass.className = (pass.className)
		    .substring(0, (pass.className).length - (errorClass.length +1));
	    }
	}
	return valid;
    };

    function captureFields(fields) {
	function convertPass() {
	    var output = "";
	    for(var i=0; i<(fields.password.value).length; i++) {
		output+="•";
		console.log(i);
	    }
	    return output;
	};
	
	var holdClass = "capture", convertedPass = convertPass();
	// Add animation class
	fields.email.className		+= " " + holdClass;
	fields.password.className	+= " " + holdClass;

	// Add captured text
	var email	= document.createElement("div"),
	    eNode	= document.createTextNode(fields.email.value),
	    pass	= document.createElement("div"),
	    // pNode	= document.createTextNode(fields.password.value),
	    pNode	= document.createTextNode(convertedPass),
	    className	= "capturedText";
	
	email.className = className;
	email.appendChild(eNode);
	fields.email.parentNode.appendChild(email);

	pass.className = className;
	pass.appendChild(pNode);
	fields.password.parentNode.appendChild(pass);

	console.dir(fields.email);
    };

    // validate form
    var fields = getInputFields();
    if (validateFields(fields)) {
	captureFields(fields);
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
