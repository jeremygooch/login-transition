function loadForm() {
    // Delay the showing of the form, then add
    // a fade in animation class
    setTimeout(function() {
	//
    }, 400);
};

function formSubmit() {
    console.log('gotcha');
};

function loginInit() {
    var loginForm = document.getElementById("loginForm");

    loginForm.onsubmit=function(){
	formSubmit();
	return false;
    };

    loadForm();
};

