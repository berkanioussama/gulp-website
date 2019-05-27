
function validate(id){
    $("#"+ id +"").removeClass("is-invalid").addClass("is-valid");
    $("#"+ id +"").parent().children("invalid-feedback").removeClass("d-block");
    $("#"+ id +"").parent().children("valid-feedback").addClass("d-block");
}
function invalidate(id){
    $("#"+ id +"").removeClass("is-valid").addClass("is-invalid");
    $("#"+ id +"").parent().children("valid-feedback").removeClass("d-block");
    $("#"+ id +"").parent().children("invalid-feedback").addClass("d-block");
}

function name_validate(){
    var name = $("#name").val();
    if(name !== "" & name.length >= 3){
        validate("name");
    }else{
        invalidate("name");
    }
}
function email_validate(){
    var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var email = $("#email").val();
    if(email !== "" & pattern.test(email)){
        validate("email");
    }else{
        invalidate("email");
    }
}
function subject_validate(){
    var subject = $("#subject").val();
    if(subject !== "" & subject.length >= 3){
        validate("subject");
    }else{
        invalidate("subject");
    }
}
function message_validate(){
    var message = $("#message").val();
    if(message !== "" & message.length >= 10){
        validate("message");
    }else{
        invalidate("message");
    }
}
$("#name").focusout(function(){
    name_validate();
});
$("#email").focusout(function(){
    email_validate();
});
$("#subject").focusout(function(){
    subject_validate();
});
$("#message").focusout(function(){
    message_validate();
});

$(".contact .form button").focus(function(){
    name_validate();
    email_validate();
    subject_validate();
    message_validate();
});