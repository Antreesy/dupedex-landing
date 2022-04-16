const authCheckUrl = 'https://rest.clicksend.com/v3/account'
const username = 'raycai@hotmail.co.nz'
const apiKey = '9D54BDB7-A845-6768-CE45-24D20616F883'
const basecode = btoa(`${username}:${apiKey}`)

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
        return console.log(result.response_code, 'authorized:', result.data.user_email)}
    )

document.querySelector('.button').addEventListener('click', (e) => {
    e.preventDefault();
    const sendSMSUrl = 'https://rest.clicksend.com/v3/sms/send'
    const phone = document.querySelector('.phone').value

    const sendOptions = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Basic ${basecode}`,
        },
        body: JSON.stringify({
            "messages": [
              {
                "to": `${phone}`,
                "source": "Dupe.dex",
                "body": "Hello. Please verify your phone number with PIN: ####"
              }
            ]
          })
    }
    fetch(sendSMSUrl, sendOptions)
        .then(response => response.json())
        .then((result) => {
            return console.log(result)})
})


// const rex = /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/;
//
// const validPhone = () => {
//     const valid = rex.test(myPhone.value);
//     console.log(valid)
//     valid ? output = '' : output = 'Wrong number';
//     document.getElementById('message').innerHTML = output;
// }
