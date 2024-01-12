const linksURL = "data/products.json";


async function getInfo() {
    const response = await fetch(linksURL);
    const data = await response.json();

    displayInfo(data); 
}
  
getInfo();

const displayInfo = (structure) => {
  Object.keys(structure).forEach(category => {

    let subcategoryDiv = document.querySelector(`#${category}`);

    let swiper_title = document.createElement("h2");
    if(category === "Llaveros"){
      swiper_title.innerHTML = "Llaveros o Colgantes";
    }
    else{
      swiper_title.innerHTML = category;
    }
    swiper_title.className = `test-title ${category}`;
    
    subcategoryDiv.appendChild(swiper_title);
    let mySwiper = document.createElement('div');
    mySwiper.classList = 'swiper mySwiper justify-content-center';
    let wrapper = document.createElement('div');
    wrapper.classList = 'swiper-wrapper';

    
    Object.keys(structure[category]).forEach(subcategory => {
      
      
      for (let count = 1; count <= structure[category][subcategory]["cant"]; count++) {

          let innerDict = structure[category][subcategory]
          let info = ""
          let itemTitle = ""
          let itemID = ""
          if (count===1 && (subcategory === "Circulares" ||subcategory === "Marcalibros" || subcategory === "Brazaletes" || subcategory === "Huesitos")){
            info = "Personalizalo como quieras! Podes elegir forma, tamaño, imagen y hasta 3 colores! Agregá este item al carrito y envialo, coordinaremos con vos por whatsapp."
            itemTitle = `${category} Personalizables`
            itemID = `${category} Personalizables`
          }
          else if(count===1 && (subcategory === "Holograficos")){
            info = "Personalizalo como quieras! Podes elegir tamaño, tipo e imagen! Agregá este item al carrito y envialo, coordinaremos con vos por whatsapp."
            itemTitle = `${category} Personalizables`
            itemID = `${category} Personalizables`
          }
          else{
            info = innerDict["info"];
            itemTitle = `${category} ${subcategory}`
            itemID = `${itemTitle} ${count}`
          }

          

          let slide = document.createElement('div');
          slide.classList = 'swiper-slide mb-5';
          let card = document.createElement('div');
          card.classList = 'card';
          
          let card_img = document.createElement('img');
          card_img.classList = 'card-img-top';

          card_img.src = `images/products/${category}/${subcategory}/${count}.jpg`;
          card_img.alt = `images/products/${category}/${subcategory}/${count}.jpg`
          card_img.height = 50;
          card_img.width = 70;

          card_img.loading = 'lazy'


          let card_body = document.createElement('div');
          card_body.classList = 'card-body p-4';
            
          let card_body_text = document.createElement('div');
          card_body_text.classList = 'text-center';
          card_body_text.innerHTML = `
          <h5 class="fw-bolder">${itemTitle}</h5>
                                        
          AR$ ${innerDict["precio"]}
          `

          card_body.appendChild(card_body_text);
          let card_actions = document.createElement('div');
          card_actions.classList = 'card-footer p-3 pt-0 border-top-0 bg-transparent';
          card_actions.innerHTML = 
          `
          <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#mainModal" data-bs-info="${info}" data-bs-title="${itemTitle}" data-bs-imgSrc="${card_img.src}" data-bs-imgAlt="${card_img.alt}" data-bs-ID="${itemID}" data-bs-price="${structure[category][subcategory]["precio"]}">
            Más Info!
          </button>

          <button type="button" onclick="addToCart(event)" class="btn btn-primary mt-1" data-bs-info="${info}" data-bs-title="${itemTitle}" data-bs-imgSrc="${card_img.src}" data-bs-imgAlt="${card_img.alt}" data-bs-ID="${itemID}" data-bs-precio="${structure[category][subcategory]["precio"]}">
            Agregar al carrito
          </button>
          `

    
          card.appendChild(card_img);
          card.appendChild(card_body);
          card.appendChild(card_actions);
          slide.appendChild(card);
          wrapper.appendChild(slide);
      }

      
    });
      let prev = document.createElement('div');
      prev.className = "swiper-button-prev";
      let next = document.createElement('div');
      next.className = "swiper-button-next";
      let pagination = document.createElement('div');
      pagination.className = "swiper-pagination";

      mySwiper.appendChild(wrapper,prev,next,pagination);
      mySwiper.appendChild(prev);
      mySwiper.appendChild(next);
      mySwiper.appendChild(pagination);
      subcategoryDiv.appendChild(mySwiper);
  });

  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 2,
    spaceBetween: 10,
    freeMode: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      }, 
      1400:{
        slidesPerView: 4,
        spaceBetween: 30,
      }
    }

    
  });

  var exampleModal = document.getElementById('mainModal')
  exampleModal.addEventListener('show.bs.modal', function (event) {
    swiper.allowSlidePrev = false;
    swiper.allowSlideNext = false;
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


};


