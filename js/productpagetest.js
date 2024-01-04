let selected = JSON.parse(localStorage.getItem('selected-ls')) || ["Llaveros","de Corazon"];



let menu = "";
let subMenu = "";

$(document).ready(function() {
  
    $('.menu-title').click(function() {
        menu = $(this).text();
        
    });

    $('.menu-subtitle').click(function(event) {
        event.preventDefault();  // prevent the default action
        subMenu = $(this).text();
        localStorage.setItem("selected-ls", JSON.stringify([menu,subMenu]));
        window.location.href = 'product.html'
    });
  

  const linksURL = "data/products.json";
  async function getInfo() {
      const response = await fetch(linksURL);
      const data = await response.json();

      displayInfo(data, selected); 
  }
  
getInfo();

const displayInfo = (structure, selected) => {


    let title = selected[0]
    let subtitle = selected[1]

    
   console.log(structure)
   console.log(structure[title][subtitle])
  
      let subcategoryDiv = document.querySelector(`.inner`);

      let topDiv = document.querySelector(`#seleccionado`);

      let swiper_title = document.createElement("h2");
      if(title === "Llaveros"){
        swiper_title.innerHTML = "Llaveros o Colgantes";
      }
      else{
        swiper_title.innerHTML = title;
      }
      swiper_title.className = `test-title ${title}`;
      
      topDiv.appendChild(swiper_title);
        
        
        for (let count = 1; count <= structure[title][subtitle]["cant"]; count++) {
  
            let innerDict = structure[title][subtitle]

            let card = document.createElement('div');
            card.classList = 'card';
            
            let card_img = document.createElement('img');
            card_img.classList = 'card-img-top';
  
            card_img.src = `images/products/${title}/${subtitle}/${count}.jpg`;
            card_img.alt = `images/products/${title}/${subtitle}/${count}.jpg`
            card_img.height = 50;
            card_img.width = 70;
  
            card_img.loading = 'lazy'
  
  
            let card_body = document.createElement('div');
            card_body.classList = 'card-body p-4';
              
            let card_body_text = document.createElement('div');
            card_body_text.classList = 'text-center';
            card_body_text.innerHTML = `
            <h5 class="fw-bolder">${title} ${subtitle}</h5>
                                          
            AR$ ${innerDict["precio"]}
            `
            card_body.appendChild(card_body_text);
            let card_actions = document.createElement('div');
            card_actions.classList = 'card-footer p-3 pt-0 border-top-0 bg-transparent';
            card_actions.innerHTML = 
            `
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#productModal" data-bs-info="${innerDict["info"]}" data-bs-title="${title} ${subtitle}" data-bs-imgSrc="${card_img.src}" data-bs-imgAlt="${card_img.alt}" data-bs-ID="${title} ${subtitle} ${count}" data-bs-price="${innerDict["precio"]}">
              Más Info!
            </button>
            `
  
      
            card.appendChild(card_img);
            card.appendChild(card_body);
            card.appendChild(card_actions);
            subcategoryDiv.appendChild(card);

        }

    
  
    topDiv.appendChild(subcategoryDiv)


    var exampleModal = document.getElementById('productModal')
    exampleModal.addEventListener('show.bs.modal', function (event) {
      // Button that triggered the modal
      var button = event.relatedTarget;
      // Extract info from data-bs-* attributes
      var title = button.getAttribute('data-bs-title');
      var info = button.getAttribute('data-bs-info');
      var imgSrc = button.getAttribute('data-bs-imgSrc');
      var imgAlt = button.getAttribute('data-bs-imgAlt');
      var ID = button.getAttribute('data-bs-ID');
      var price = button.getAttribute('data-bs-price');
      // If necessary, you could initiate an AJAX request here
      // and then do the updating in a callback.
      //
      // Update the modal's content.
      var modalTitle = exampleModal.querySelector('.modal-title');
      var modalBodyP = exampleModal.querySelector('.modal-body p');
      var modalImg = exampleModal.querySelector('.modal-body img');
      var cartBtn = exampleModal.querySelector('.modalButton');


      modalTitle.textContent = title;
      modalBodyP.textContent =  info;
      modalImg.src = imgSrc;
      modalImg.alt = imgAlt;

      cartBtn.setAttribute('data-bs-id', ID);
      cartBtn.setAttribute('data-bs-precio', price);
    });
    
  }

});