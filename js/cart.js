let listCards = JSON.parse(window.localStorage.getItem("itemId-ls")) || [];
let cartCounter = document.querySelector("form button span");

let itemNumber = Number(window.localStorage.getItem("itemNum-ls")) || 0;

cartCounter.innerText = itemNumber;

function addToCart(event) {

    const button = event.target; // The button that was clicked
    const id = button.dataset.bsId; // The value of 'data-bs-id'
    const price = button.dataset.bsPrecio;
    
    // Find the item in the listCards array
    let item = listCards.find(item => (item.id === id)&&(item.precio === price));
    
    
    if (item) {
        // If the item already exists in the listCards array, increment its quantity
        item.quantity++;
    } else {
        // If the item doesn't exist in the listCards array, add it with a quantity of 1
        listCards.push({id: id, quantity: 1, precio: price});
    }

    itemNumber++;

    cartCounter.innerText = itemNumber;

    localStorage.setItem("itemId-ls", JSON.stringify(listCards));
    localStorage.setItem("itemNum-ls", itemNumber);
    
    showToast()
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



  
        
    

function showToast(){
    var toastElList = [].slice.call(document.querySelectorAll('.toast'))
  var toastList = toastElList.map(function(toastEl) {
    return new bootstrap.Toast(toastEl, {delay:2000})
  })
  toastList.forEach(toast => toast.show())


}
