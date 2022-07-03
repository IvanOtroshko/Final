
const prev = document.getElementById('btn-prev'),
    next = document.getElementById('btn-next'),
    slides = document.getElementsByClassName('slide'),
    dots = document.querySelectorAll('.dot'),
    sliderWrapper = document.querySelector('.slider-wrapper'),

    btnCart = document.querySelector('.btn-cart'),
    productsList = document.querySelector('.products_list');

let index = 0;




// Filter 

const enterProduct = [];

const inputText = document.querySelector('.search-area');
inputText.addEventListener('keydown', (event) => {
    event.stopImmediatePropagation();
    if(event.keyCode === 13) {
        arrayProducts.find( x => x.productName === inputText.value)
        const enterProduct = [].concat(arrayProducts.find( x => x.productName === inputText.value));
        if(enterProduct[0] !== undefined) {

            enterProduct.forEach(product => {
            enter(product)});
    
            function enter({productName,sales, price, oldPrice, image}) {
            const headerInfo = document.querySelector('header');
            const showProduct = document.createElement('div');
            showProduct.className = 'modal-product';
            showProduct.style.cssText = `
            padding-top: 50px;
            text-align: center;
            font-size: 50px;
            color: rgba(215,22,154,0.9654455532212886);
            position: fixed;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.7);
            z-index: 1000;
            bottom: -150px;
            `;
            headerInfo.append(showProduct);

            const searchModal = document.createElement('div');
            searchModal.classList.add('search-modal');
            searchModal.style.cssText = `
                background-color: white;
                border-radius: 35px;
                width: 400px;
                height: 600px;
                margin: 0 auto;

            `;

            searchModal.innerHTML = `
            <div class="search_item-image-card">
            <img class="search_item-image" src=${image}/>
                <div class="search_info">
                        <div class="search-info-discount">скидка -${sales}</div>
                        <button class="search-add-cart">+</button>
                        <div class="search_item-info-newprice">${price}</div>
                        <div class="search_item-info-oldprice">${oldPrice}</div>
                        <div class="search_item-info-productname">${productName}</div>
                </div>
            </div>
        `;
            showProduct.append(searchModal);

            
            }


        } else {
            const headerInfo = document.querySelector('header');
            const showProduct = document.createElement('div');
            showProduct.className = 'modal-product';
            showProduct.innerText = 'Нет такого продукта, попробуй еще раз';
            showProduct.style.cssText = `
            text-align: center;
            font-size: 80px;
            color: rgba(215,22,154,0.9654455532212886);
            position: fixed;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.7);
            z-index: 1000;
            bottom: -150px;
            `;

            headerInfo.append(showProduct);
           
        }


    
}});  

// and Filter




const activeSlide = n => {
    for (let slide of slides) {
        slide.classList.remove('active')
    }
    slides[n].classList.add('active')
}

const activeDot = n => {
    for (let dot of dots) {
        dot.classList.remove('active')
    }
    dots[n].classList.add('active')
}

const prepareCurrentSlide = ind => {
    activeSlide(ind);
    activeDot(ind);
}

const nextSlide = () => {
    if (index == slides.length - 1) {
        index = 0;
        prepareCurrentSlide(index);
    } else {
        index++;
        prepareCurrentSlide(index);;
    }
}

const prevSlide = () => {
    if (index == 0) {
        index = slides.length - 1
        prepareCurrentSlide(index);
    } else {
        index--;
        prepareCurrentSlide(index);
    }
}

dots.forEach((item, indexDot) => {
    item.addEventListener('click', () => {
        index = indexDot;
        prepareCurrentSlide(index);
    })
});

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);


const BASE_URL = 'https://62b9625441bf319d227b299f.mockapi.io';


async function getPhoto() {
    const response = await fetch(`${BASE_URL}/slider`);
    const slider = await response.json();
    slider.forEach(({ photo }, index) => {
        const img = document.createElement('img');
        img.classList.add('slide');
        if (index === 0) {
            img.classList.add('active');
        }
        img.src = photo;
        img.style.cssText = `
        height: 100%
        width: 100%;
        border-radius: 20px;
        `;

        sliderWrapper.append(img);
    });
}

getPhoto();


const arrayProducts = [ 
    {id: 1, productName: 'штаны', sales: '10%', price: '900p', oldPrice:'1000p', image:'http://loremflickr.com/640/480/food'},
    {id: 2, productName: 'шорты', sales: '5%', price: '950p', oldPrice:'1000p', image:'http://loremflickr.com/640/480/food'},
    {id: 3, productName: 'майка', sales: '15%', price: '850p', oldPrice:'1000p', image:'http://loremflickr.com/640/480/food'},
    {id: 4, productName: 'обувь', sales: '20%', price: '800p', oldPrice:'1000p', image:'http://loremflickr.com/640/480/food'},
    {id: 5, productName: 'шапка', sales: '15%', price: '850p', oldPrice:'1000p', image:'http://loremflickr.com/640/480/food'},
];

arrayProducts.forEach((product) => {
    createItem(product);

});

// function serchProduct({productName})

function createItem({ productName, sales, price, oldPrice, image }) {
    const productItem = document.createElement('div');
    productItem.classList.add('products_item');

   productItem.innerHTML = `
    <div class="products_item-image-card">
    <img class="products_item-image" src=${image} />
        <div class="products_item-card">
            <button class="btn-card-preview">Быстрый просмотр</button>
            <div class="products_item-card-info">
                <div class="card-info-discount">${sales}</div>
                <button class="btn-add-cart">+</button>
            </div>
        </div>
    </div>
    <div class="products_item-info">
        <div class="products_item-info-newprice">${price}</div>
        <div class="products_item-info-oldprice">${oldPrice}</div>
        <div class="products_item-info-productname">${productName}</div>
    </div >
`;
    productsList.append(productItem);

};

// and Products



// modalCart

function modal() {
    const button = document.querySelector('.btn-cart');
    const modalElement = document.querySelector('.modal');

    button.addEventListener('click', () => openModal());

    modalElement.addEventListener('click', (e) => {
        if (
            e.target === modalElement ||
            e.target.getAttribute('data-close') == ''
        ) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.keyCode === 27 && modalElement.classList.contains('show')) {
            closeModal();
        }
    });

    function openModal() {
        modalElement.classList.add('show');
        modalElement.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalElement.classList.add('hide');
        modalElement.classList.remove('show');
        document.body.style.overflow = '';
    }
}

modal();

  //and ModalCart





