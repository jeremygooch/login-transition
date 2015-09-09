document.onkeypress = function (e) {
    var panelTop	= document.querySelector(".panel-top");
    var panelBottom	= document.querySelector(".panel-bottom");
    var panelLeft	= document.querySelector(".panel-left");
    var panelRight	= document.querySelector(".panel-right");

    var loginForm	= document.querySelector(".login-holder");

    panelTop.className		+= ' slide-out';
    panelRight.className	+= ' slide-out';
    panelBottom.className	+= ' slide-out';
    panelLeft.className		+= ' slide-out';

    loginForm.className         += ' fade-out';
    
};
