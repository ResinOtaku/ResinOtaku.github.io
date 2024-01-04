let items = JSON.parse(localStorage.getItem('itemId-ls')) || [];

let cartCounter = document.querySelector("form button span");

let itemNumber = Number(window.localStorage.getItem("itemNum-ls")) || 0;

let itemContainer = document.querySelector('.itemContainer');

let totalPrice = document.querySelector('.totalPrice');
let totalArt = document.querySelector('.totalArt');

let amount = 0;

document.addEventListener('DOMContentLoaded', function() {

    cartCounter.innerText = itemNumber;


    
    items.forEach(item => {

        console.log(item)

        let img = document.createElement('img');
        
        /*Dividing the ID info*/

        let id = item.id.split(" ");
       
        

        if(id.length>3){
            let link = `images/products/${id[0]}/${id[1]} ${id[2]}/${id[3]}.jpg`
            img.setAttribute("src", link);
            id.splice(id.length - 1, 0, 'Nº');
        }
        else if(id[1]=="Personalizables")
        {
            img.src = `images/products/${id[0]}/mistery.jpg`
        }
        else{
            img.src = `images/products/${id[0]}/${id[1]}/${id[2]}.jpg`
            id.splice(id.length - 1, 0, 'Nº');
        }

        
        
        id = id.join(" ");

        //Creating the general div

        let itemDiv = document.createElement('div');
        itemDiv.className = "item-div"
        itemDiv.style.display = 'flex';
        itemDiv.style.justifyContent = 'space-between';
        itemDiv.style.alignItems = 'center';
        itemDiv.style.border = '1px solid black';
        itemDiv.style.marginBottom = '10px';
        
        //Creating the title div
        let descripDiv = document.createElement('div');

        //Creating the total div
        let totalDiv = document.createElement('div');

        let eliminar = document.createElement("a");
        eliminar.innerText = "Eliminar";
        eliminar.setAttribute("onclick", `Confirmation(${items.indexOf(item)})`);
        eliminar.style.gridColumn = "1/4";
        eliminar.style.cursor = 'pointer';
        eliminar.style.justifySelf = 'center';
        eliminar.style.alignSelf = 'center';
        eliminar.style.marginTop = "5px";

        totalDiv.style.display = "grid";
        totalDiv.style.gridTemplateColumns = "1fr 1fr 1fr";
        totalDiv.style.gridTemplateRows = "1fr 0fr 1fr";
        totalDiv.style.padding = "30px 5px 40px 5px";

        let increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        let decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';

        let quantitySpan = document.createElement('span');
        quantitySpan.textContent = item.quantity;
        quantitySpan.style.alignSelf = "center";
        quantitySpan.style.justifySelf = "center";

        [increaseButton, decreaseButton].forEach(button => {
            if(item.quantity === 1){
                decreaseButton.style.border = '2px solid red';
            }
            else{
                decreaseButton.style.border = '2px solid blue';
            }
            increaseButton.style.border = '2px solid blue';
            button.style.borderRadius = '20px'; // Makes the button round
            button.style.padding = '5px 8px'; // Space around the text
            button.style.margin = '0'; // Space between the buttons
            button.style.backgroundColor = 'white';
            button.style.cursor = 'pointer';
        });

        // Add event listeners to the buttons
        increaseButton.addEventListener('click', function() {
            decreaseButton.disabled = false;
            decreaseButton.style.borderColor = 'blue';
            item.quantity++;
            itemNumber++;
            cartCounter.innerText = itemNumber;
            quantitySpan.textContent = item.quantity; // Update the quantity span
            details.textContent = `${item.precio * item.quantity} AR$`;
            localStorage.setItem("itemId-ls", JSON.stringify(items));
            localStorage.setItem("itemNum-ls", itemNumber);
            
            UpdateTotal(item.precio);
        });
        decreaseButton.addEventListener('click', function() {
            if (item.quantity > 2) { // Prevent quantity from going below 0
                item.quantity--;
                itemNumber--;
                cartCounter.innerText = itemNumber;
                quantitySpan.textContent = item.quantity; // Update the quantity span
                details.textContent = `${item.precio * item.quantity} AR$`;
                localStorage.setItem("itemId-ls", JSON.stringify(items));
                localStorage.setItem("itemNum-ls", itemNumber);
                UpdateTotal(item.precio * -1);
                
            }
            else if (item.quantity == 2) { // If quantity reaches 0
                decreaseButton.style.borderColor = 'red';
                item.quantity--;
                itemNumber--;
                cartCounter.innerText = itemNumber;
                quantitySpan.textContent = item.quantity; // Update the quantity span
                details.textContent = `${item.precio * item.quantity} AR$`;
                localStorage.setItem("itemId-ls", JSON.stringify(items));
                localStorage.setItem("itemNum-ls", itemNumber);
                UpdateTotal(item.precio * -1);
                
            }
            else{
                let index = items.indexOf(item)
                Confirmation(index);
            }
            
        });
        
        
        img.style.width = '150px';
        img.style.height = '187px';
        img.alt = id;

        let title = document.createElement('p');
        title.textContent = id;
        title.style.fontSize = "1.2rem"
        title.style.textAlign = "center"
        

        let details = document.createElement('p');
        details.textContent = `${item.precio * item.quantity} AR$`;
        details.style.gridColumn = "1/4";
        details.style.textAlign = "center"
        details.style.width = "max-content";
        details.style.justifySelf = 'center';

        itemDiv.appendChild(img);
        descripDiv.appendChild(title);
        
        itemDiv.appendChild(descripDiv);

        totalDiv.appendChild(details);
        totalDiv.appendChild(decreaseButton);
        totalDiv.appendChild(quantitySpan);
        totalDiv.appendChild(increaseButton);
        totalDiv.appendChild(eliminar)
        itemDiv.appendChild(totalDiv)

        itemContainer.appendChild(itemDiv);

        ///////
        //Extracting values 
        ///////


        amount += item.precio * item.quantity
    
    });


    UpdateTotal();

    $('.menu-title').click(function() {
        menu = $(this).text();
        
    });

    $('.menu-subtitle').click(function(event) {
        event.preventDefault();  // prevent the default action
        subMenu = $(this).text();
        localStorage.setItem("selected-ls", JSON.stringify([menu,subMenu]));
        window.location.href = 'product.html'
    });

});

function UpdateTotal(number = 0){
    amount = amount + parseInt(number)
    totalPrice.innerText = `Total a pagar: ${amount} AR$`;
    totalArt.innerText = `Cantidad de Articulos ${itemNumber}`;
}


function Confirmation(index){
    let userConfirmation = confirm("Quieres eliminar este Item?");
    if (userConfirmation) {
        itemNumber -= items[index].quantity;
        items.splice(index, 1);
        localStorage.setItem("itemId-ls", JSON.stringify(items));
        localStorage.setItem("itemNum-ls", itemNumber);
        location.reload();
    }
}

function redirectBasedOnInput(){
    let listaItems = ""
    items.forEach(item => {
        let id = item.id.split(" ");
        id.splice(id.length - 1, 0, 'Nº');
        id = id.join(" ");
        listaItems += `- ${item.quantity} ${id}\n`
    });

    var message = `Hola! Estuve mirando tu pagina y me interesan estos productos: \n${listaItems} Gracias!`;


    var send = encodeURIComponent(message);
    
    window.open(`https://wa.me/5493512125140?text=${send}`);
    
}