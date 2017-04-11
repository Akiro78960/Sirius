$(document).ready(function() {
    // $("#item1").fadeOut(400).fadeIn('400')
    $(".menu-item").each(function(index, el) {
        $(this).slideUp(0, function() {
            $(this).slideDown('500', function() {

            });
        });
    });
})
