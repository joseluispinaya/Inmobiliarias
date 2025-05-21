
$('#chatButton').on('click', function () {

    $('.chat-container').css('display', 'flex');
    $('#chatButton').css('display', 'none');
})

$('#closeChat').on('click', function () {

    $('.chat-container').css('display', 'none');
    $('#chatButton').css('display', 'block');
})