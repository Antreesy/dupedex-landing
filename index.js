const authCheckUrl = 'https://rest.clicksend.com/v3/account'
const username = 'raycai@hotmail.co.nz'
const apiKey = '9D54BDB7-A845-6768-CE45-24D20616F883'
const basecode = btoa(`${username}:${apiKey}`)

const modal = document.querySelector(".modal")
const dialogVerify = document.querySelector(".dialog__verify_wrapper")
const dialogMessage = document.querySelector(".dialog__message_wrapper")
const messageBox = dialogMessage.querySelector(".dialog__caption")

const phoneInput = document.querySelector('#phone_input')
let mobilePin;

const fakeServerBase = []
const fakeServerStore = [
    {
        user_phone : '+79005001234',
        verify_code : '1234'
    },
    {
        user_phone : '+79005004321',
        verify_code : '4321'
    }
]

    const validatePin = (e) => {
    const theEvent = e || window.event;
    let key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    const regex = /[0-9]|\./;
    if( !regex.test(key) || theEvent.target.value.length >= 4) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

const fakeVerifying = (phone) => {
    const userToVerify = Object.values(fakeServerStore).find(entry => entry.user_phone === phone)
    if (userToVerify) {
        mobilePin = userToVerify.verify_code
        console.log(mobilePin)

        modal.classList.toggle("is-active")
        dialogVerify.classList.toggle("is-active")
        document.body.classList.toggle("not-scrollable")


    }
    else alert('Error happened')
}

const pinInput = document.querySelector('#pin_input');
pinInput.addEventListener('keypress', e => validatePin(e))

document.querySelector('#confirm_button').addEventListener('click', (e) => {
    console.log(pinInput.value === mobilePin)

    messageBox.textContent = (pinInput.value === mobilePin) ? "SUCCESS" : 'ERROR'
    dialogVerify.classList.toggle("is-active")
    dialogMessage.classList.toggle("is-active")
})
document.querySelector('#cancel_button').addEventListener('click', (e) => {
    modal.classList.toggle("is-active")
    dialogVerify.classList.toggle("is-active")
    document.body.classList.toggle("not-scrollable")
})
document.querySelector('#close_button').addEventListener('click', (e) => {
    modal.classList.toggle("is-active")
    dialogMessage.classList.toggle("is-active")
    document.body.classList.toggle("not-scrollable")
})

const checkAuth = () => {
    const authOptions = {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Basic ${basecode}`,
        }
    }
    fetch(authCheckUrl, authOptions)
        .then(response => response.json())
        .then((result) => {
            console.log(result.response_code, 'authorized:', result.data.user_email);
        })
}
checkAuth();

document.querySelector('#sent_button').addEventListener('click', (e) => {
    e.preventDefault();

    console.log(`sms fake-sent to phone number: ${phoneInput.value}`)
    fakeVerifying(phoneInput.value)

    // DONT UNCOMMENT!! OR PAY FOR SMS SENDING!!

    // const sendSMSUrl = 'https://rest.clicksend.com/v3/sms/send'
    // const sendOptions = {
    //     method: "POST",
    //     mode: "cors",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Accept": "application/json",
    //         "Authorization": `Basic ${basecode}`,
    //     },
    //     body: JSON.stringify({
    //         "messages": [
    //           {
    //             "to": `${phoneInput}`,
    //             "source": "Dupe.dex",
    //             "body": "Hello. Please verify your phone number with PIN: ####"
    //           }
    //         ]
    //       })
    // }
    // fetch(sendSMSUrl, sendOptions)
    //     .then(response => response.json())
    //     .then((result) => {
    //         return console.log(result)})
})

// const rex = /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/;
//
// const validPhone = () => {
//     const valid = rex.test(myPhone.value);
//     console.log(valid)
//     valid ? output = '' : output = 'Wrong number';
//     document.getElementById('message').innerHTML = output;
// }
