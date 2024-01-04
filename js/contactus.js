let listCards = JSON.parse(window.localStorage.getItem("itemId-ls")) || [];
let cartCounter = document.querySelector("form button span");

let itemNumber = Number(window.localStorage.getItem("itemNum-ls")) || 0;

cartCounter.innerText = itemNumber;

function ContactUs() {

    var textboxValue = document.getElementById("descrip").value;
    var fname = document.getElementById("fname").value;
    var location = document.getElementById("location").value;

    var message = `Hola! Soy ${fname}, de ${location}. Y me gustaria saber: ${textboxValue} \nGracias!`;


    var send = encodeURIComponent(message);
    
    window.open(`https://wa.me/5493512125140?text=${send}`);
    
}

$('.menu-title').click(function() {
    menu = $(this).text();
    
});

$('.menu-subtitle').click(function(event) {
    event.preventDefault();  // prevent the default action
    subMenu = $(this).text();
    localStorage.setItem("selected-ls", JSON.stringify([menu,subMenu]));
    window.location.href = 'product.html'
});