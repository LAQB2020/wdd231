// Add items to the select option
const button = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

const home = document.querySelector('#home');
button.addEventListener('click', ()=> {

    navigation.classList.toggle('open');
    button.classList.toggle('open');
})