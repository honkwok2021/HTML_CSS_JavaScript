function validateNonEmpty(tf, helpText) { //tf=input to validate, helpText=display msg
    //get the value from tf
    var value = tf.value;

    //check if value is empty
    if (value) { //not empty
        tf.className = "valid"; //change bgcolour to grey
        helpText.innerHTML = ""; //reset the message
        return true; //valid - not empty
    }
    else { //empty
        tf.className = "invalid"; //change bgcolour to red
        helpText.innerHTML = "Cannot be empty"; //error message
        return false; //invalid - empty
    }
}

function validateAll(form) {
            //triggger the validation
     var phoneNo = document.forms["Cform"]["phoneno"].value;
     var email = document.forms["Cform"]["emailaddress"].value;
     var name = document.forms["Cform"]["anyname"].value;
     var message = document.forms["Cform"]["messagesss"].value;

    if (!name || !message) {
        
        document.getElementById('formErrorMessage').innerText = "name and message, and either phone or email need to be filled in";
        return false;
    }

    if (!phoneNo && !email) {
        
        document.getElementById('formErrorMessage').innerText = "either phone no or email need to be filled in";
        return false;
    }

    //       if (name != "" && message != "" && phoneNo != "" && email != "") {
    //           return success;
    //       }
    //       else if(name != "" && message != "" && phoneNo != "" || name != "" && message != "" && email != ""){
    //           return success;
    //       }
    //       else if (name != "" && message != "" && phoneNo == "" && email == "") {
               
    //           helpText.innerHTML = "either phone no or email need to be filled in"
    //           return false;
    //       }
    //else if (name == "" && message == "" && phoneNo == "" && email == "") {
    //    helpText.innerHTML = "name and message need to either phone no or email need to be filled in"
    //    return false;
    //} 

    document.getElementById('formErrorMessage').innerText = "";
    return true;
}

function validatePhoneNo(tf, helpText) {
    //check if the value is empty
    var isNotEmpty = validateNonEmpty(tf, helpText);
    if (isNotEmpty == false) {
        return false;
    }

    //check if the value contains 4 digits
    var value = tf.value;
    var regex = /^61\d{9}$/;

    var isDigits = regex.test(value);
    if (isDigits) {
        tf.className = "valid"; //change bgcolour to grey
        helpText.innerHTML = ""; //reset the message
        return true; //valid - 11 digits
    }
    else {
        tf.className = "invalid"; //change bgcolour to red
        helpText.innerHTML = "Can only be digit and should have 11 digit start with 61"; //error message
        return false; //invalid - not 11 digits
    }
}
function validateName(tf, helpText) {
    //check if the value is empty
    var isNotEmpty = validateNonEmpty(tf, helpText);
    if (isNotEmpty == false) {
        return false;
    }

    //check if the vlaue character
    var value = tf.value;
    var regex = /^[a-zA-Z]{2,}\w?/;

    var atLeast2Letter = regex.test(value);
    if (atLeast2Letter) {
        tf.className = "valid";// change bgcolour to grey
        helpText.innerHTML = ""; //reset the message
        return true; //valid - at least 2 character
    }
    else {
        tf.className = "invalid"; //change bgcolour to red
        helpText.innerHTML = "minimum 2 letters and only between A-Z or a-z";//error message
        return false;//invalid - not 2 letters
    }
}

function validateEmail(tf, helpText) {
    //check if the value is empty
    var isNotEmpty = validateNonEmpty(tf, helpText);
    if (isNotEmpty == false) {
        return false;
    }

    //check if the value is valid for email
    var value = tf.value;
    var regex = /^[a-z0-9._%+-]{2,}@[a-z0-9.-]+\.[a-z]{2,4}$/;

    var isDigits = regex.test(value);
    if (isDigits) {
        tf.className = "valid"; //change bgcolour to grey
        helpText.innerHTML = ""; //reset the message
        return true; //valid - email is valid
    }
    else {
        tf.className = "invalid"; //change bgcolour to red
        helpText.innerHTML = "not a valid email pattern e.g (at least 2 letters)@example.com"; //error message
        return false; //invalid - not valid email pattern
    }
}