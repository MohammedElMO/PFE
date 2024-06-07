import "../../utils/logIn-out"
function sendEmail() {
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    emailjs.send('service_1860g8s', 'template_45u8bm7', {
        email: email,
        message: message
    }).then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
        showPopup();
    }, function(error) {
        console.log('FAILED...', error);
    });
}

(function() {
    emailjs.init("XZpzgOqG5mQeMTW2t");
  })();

  function showPopup() {
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}