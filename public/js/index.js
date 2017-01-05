$(document).ready(function() {
    $('#btn-login').click(function() {
        $('#loginModal').modal();
    });

    $('#btn-signup').click(function() {
        $('#signupModal').modal();
    });

    $('#login').click(function() {
        console.log('click');
        $.ajax({
            type: 'POST',
            url: location.protocol + '//' + location.host + '/login',
            datatype: 'formdata',
            success: function(data) {
                console.log(data);
            },
            error: function(err) {
                console.log(err);
            }
        });
    });
});