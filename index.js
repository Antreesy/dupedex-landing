const myPhone = document.getElementById('phone');
const button = document.getElementById('button');
const rex = /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/;


button.addEventListener('click', (event)=>{
    event.preventDefault();
    validPhone();
})

const validPhone = () => {
    const valid = rex.test(myPhone.value);
    console.log(valid)
    valid ? output = '' : output = 'Номер введен неправильно';
    document.getElementById('message').innerHTML = output;
}

