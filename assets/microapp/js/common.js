

(function(w, d,e) {

Username=function(name){
	document.getElementById('TypeformUSername').innerHTML = name;
	document.getElementById('TypeformUSernameEmail').innerHTML = name;
	document.getElementById('TypeformUSernameProduct').innerHTML = name;
}


KeyupCheck=function (e){
if(e.target.value.length>=1 && e.target.getAttribute('data-validation')!="phone"){
	
		var buttonid=e.target.id;
	    var Buttonelement = document.getElementById("ScButtonHelp_"+buttonid);
		document.getElementById(buttonid).classList.add("TextboxWValue")
		Buttonelement.classList.add("ScButtonHelpVisible");
		
		var errorid=document.getElementById('error_'+buttonid);	
		errorid.classList.remove("ScButtonHelpVisible");
		/*var erromsgid=document.getElementById('erromsgid_'+buttonid);
		if(erromsgid !=null){		
			 erromsgid.parentNode.removeChild(erromsgid);
		}*/
	if(e.target.tabIndex==1){
	Username(e.target.value);
	}	
}
else if(e.target.getAttribute('data-validation')=="phone"){
PhoneKeyupCheck(e);
}
else{
		var buttonid=e.target.id;
	    var Buttonelement = document.getElementById("ScButtonHelp_"+buttonid);
		document.getElementById(buttonid).classList.remove("TextboxWValue")
        Buttonelement.classList.remove("ScButtonHelpVisible");
}	

 if (e.keyCode === 13) {
    e.preventDefault();
    CheckValidation(e.target.id, e.target.getAttribute('data-validation'),e.target.tabIndex);
  }

}	


PhoneKeyupCheck=function(e){
		if (isNaN(e.target.value) && e.target.value.length==1){
	e.target.value='';	
	var Sectionelement = document.getElementById("phone_section");
	Sectionelement.classList.add("phonerr");
	setTimeout(function(){
	Sectionelement.classList.remove("phonerr");
	},800);
	}
	else{
		if(e.target.value.length>=1){

		var numbers = e.target.value.replace(/\D/g, '');	
		
		
        char = {1:' (',4:') ',7:'-'};
		e.target.value = '';
		for (var i = 0; i < numbers.length; i++) {
			e.target.value += (char[i]||'') + numbers[i];
		}
		
		
		var buttonid=e.target.id;
	    var Buttonelement = document.getElementById("ScButtonHelp_"+buttonid);
		document.getElementById(buttonid).classList.add("TextboxWValue")
		Buttonelement.classList.add("ScButtonHelpVisible");
		
		var errorid=document.getElementById('error_'+buttonid);	
		errorid.classList.remove("ScButtonHelpVisible");
		
		}
		else{
		var buttonid=e.target.id;
	    var Buttonelement = document.getElementById("ScButtonHelp_"+buttonid);
		document.getElementById(buttonid).classList.remove("TextboxWValue")
        Buttonelement.classList.remove("ScButtonHelpVisible");	
		}
	}
}

CheckValidation=function(Fieldid,ValidationKind, tabIndex){
		var error=false;	
		if(ValidationKind){
	    switch (ValidationKind) {
        case "string":
            error=Stringvalidation(Fieldid,tabIndex)
            break;
        case "email":
            error = ValidateEmail(Fieldid,tabIndex);
            break;
			
        case "phone":
            error = validatePhone(Fieldid,tabIndex);
            break;			
		}
		}
	
		if(error==false){
		ScrollDown(tabIndex);	
		}
		


	
}



Stringvalidation=function(Fieldid,tabIndex){
	
	var textlength=document.getElementById(Fieldid).value.length;
	var erromsgid=document.getElementById('erromsgid_'+Fieldid);
	
	if(textlength<1){
	var errorid=document.getElementById('error_'+Fieldid);	
	errorid.classList.add("ScButtonHelpVisible");
	return true;	
	}
	else{
		
	if(tabIndex==1){
	Username(document.getElementById(Fieldid).value);
	}	
	
	return false;
	}
	
}

ValidateEmail=function(Fieldid,tabIndex) {
	var emaillength=document.getElementById(Fieldid).value.length;
	var emailvalue=document.getElementById(Fieldid).value;
	var erromsgid=document.getElementById('erromsgid_'+Fieldid);
	var errorid=document.getElementById('error_'+Fieldid);
		
    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if(emaillength<1){

	errorid.childNodes[0].innerHTML = "<div>Please Enter a email</div>";	
	errorid.classList.add("ScButtonHelpVisible");
	return true;	
	}else if(!expr.test(emailvalue)){
		
	if(document.getElementById("ScButtonHelp_"+Fieldid).classList.contains("ScButtonHelpVisible")){
	document.getElementById("ScButtonHelp_"+Fieldid).classList.remove("ScButtonHelpVisible");
	}	
		
	errorid.childNodes[0].innerHTML = "<div>Please Enter a valid email</div>";	
	errorid.classList.add("ScButtonHelpVisible");
	return true;		
	}
	else{
	return false;
	}	
}


 validatePhone=function(Fieldid,tabIndex){
	var Phonelength=document.getElementById(Fieldid).value.replace(/\D/g, '').length;
	var Phonevalue=document.getElementById(Fieldid).value.replace(/\D/g, '');

	var errorid=document.getElementById('error_'+Fieldid);
		

    if(Phonelength<1){
	errorid.childNodes[0].innerHTML = "<div>Please Enter a Phone</div>";	
	errorid.classList.add("ScButtonHelpVisible");
	return true;	
	}else if(isNaN(Phonevalue) || Phonevalue.length < 11) {
		
	if(document.getElementById("ScButtonHelp_"+Fieldid).classList.contains("ScButtonHelpVisible")){
	document.getElementById("ScButtonHelp_"+Fieldid).classList.remove("ScButtonHelpVisible");
	}	
		
	errorid.childNodes[0].innerHTML = "<div>Please Enter a Valid Phone Number</div>";	
	errorid.classList.add("ScButtonHelpVisible");
	return true;		
	}
	else{
	return false;
	}	
}



ScrollDown=function(tabIndex){
		var Scrollelement = document.getElementById('BlockListContainer');
  		moveDown(Scrollelement);
		FocusNextItem(tabIndex)
}

testfunction=function(){
	var Scrollelement = document.getElementById('BlockListContainer');
	moveTo(Scrollelement,"1")
}

FocusNextItem=function(tabIndex){
setTimeout(function(){	
	next=tabIndex;
    document.forms[0].elements[next].focus();
	 }, 300);
}

document.addEventListener('keyup', function(e) {
   var keycode = (event.keyCode ? event.keyCode : event.which);
   console.log(e.target.id);
    if(keycode == '13'){	
	FormSubmitData(e);
	}
});

FormSubmitData=function(event){
	event.preventDefault();
	if(document.getElementById("FormSubmitContainer").classList.contains("active")){	
	ScfadeOut(document.getElementById("Typeformid"));
	SCfadeIn(document.getElementById("SCScessMSG"));
	}
}


SCfadeIn=function(el){
  el.classList.add('showSC');
  //el.classList.remove('hideSC');  
}

ScfadeOut=function(el){
  el.classList.add('hideSC');
  //el.classList.remove('showSC');
}

function init() {
	//TextKeyup();
}


window.onload = init;

})(window, document,event);	


	 onePageScroll(".BlockList__BlockListContainer", {
     sectionContainer: "section",
     loop: false,
	 animationTime:700,
     responsiveFallback: false
   });	
   
   var elements3 = document.getElementsByClassName('.block-section');
	var requiredElement = elements3[0];
   console.log(requiredElement);