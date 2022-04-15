document.querySelector('.button').addEventListener('click', (e)=>{
    e.preventDefault();
    const url = 'https://rest.clicksend.com/v3/sms/send'
    const userName = 'raycai@hotmail.co.nz'
    const apiKey = '9D54BDB7-A845-6768-CE45-24D20616F883'
    const phone = document.querySelector('.phone').value
    console.log(document.querySelector('.phone').value)
    const options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==",
            "username": "raycai@hotmail.co.nz",
            "password": "9D54BDB7-A845-6768-CE45-24D20616F883"
        },
        body: JSON.stringify({
            phone
            })
    }
    fetch(url, options)
        .then(response => response.json())
        .then((result) => {
            return console.log(result)})
})




// const rex = /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/;
//
// const validPhone = () => {
//     const valid = rex.test(myPhone.value);
//     console.log(valid)
//     valid ? output = '' : output = 'Номер введен неправильно';
//     document.getElementById('message').innerHTML = output;
// }

