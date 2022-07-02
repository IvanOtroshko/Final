
const prev = document.getElementById('btn-prev'),
    next = document.getElementById('btn-next'),
    slides = document.getElementsByClassName('slide'), // 2) заменить на живую коллекцию
    dots = document.querySelectorAll('.dot'),
    sliderWrapper = document.querySelector('.slider-wrapper');
    
let index = 0;

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
         height: 400px;
        border-radius: 20px;
        `;

        sliderWrapper.append(img);
    });
}

getPhoto();



