
const startDate = new Date('June 15, 2022 00:00:00').getTime();
const yearsElement = document.getElementById('years');
const monthsElement = document.getElementById('months');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const anniversaryContainer = document.getElementById('anniversary-container');
const messageElement = document.getElementById('message');
const floatingElementsContainer = document.getElementById('floating-elements');
function updateTimeTogether() {
    const now = new Date().getTime();
    const distance = now - startDate;
    const years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((distance % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    yearsElement.textContent = years.toString().padStart(2, '0');
    monthsElement.textContent = months.toString().padStart(2, '0');
    daysElement.textContent = days.toString().padStart(2, '0');
    hoursElement.textContent = hours.toString().padStart(2, '0');
    checkSpecialAnniversary(years, months, days);
}

function checkSpecialAnniversary(years, months, days) {
    if (months > 0 && days === 0) {
        showAnniversaryMessage(`¡${months} meses juntos!`);
    }
    if (years > 0 && months === 0 && days === 0) {
        showAnniversaryMessage(`¡${years} año${years > 1 ? 's' : ''} juntos!`);
    }
}

function showAnniversaryMessage(message) {
    anniversaryContainer.innerHTML = `
        <div class="anniversary-day">
            <div class="anniversary-title-big">¡FELIZ ANIVERSARIO!</div>
            <div class="anniversary-subtitle">${message}</div>
        </div>
    `;
    
    document.querySelector('h1').textContent = '¡Feliz Aniversario!';
    document.querySelector('.subtitle').textContent = message;
    
    createConfetti();
}

function createConfetti() {
    const anniversaryDay = document.querySelector('.anniversary-day');
    if (!anniversaryDay) return;

    const colors = ['#ff4d8d', '#ff8fab', '#ffb6c1', '#ffd3e0', '#ffffff', '#ffd700', '#b9f2ff'];
    const shapes = ['❤', '✿', '✦', '✧', '♡', '★', '✶'];

    for (let i = 0; i < 200; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        confetti.style.fontSize = `${Math.random() * 20 + 10}px`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        anniversaryDay.appendChild(confetti);
    }
}
function createFloatingElements() {
    const elementTypes = ['heart', 'star', 'diamond'];
    const elementIcons = {
        heart: '❤',
        star: '★',
        diamond: '♦'
    };
    
    for (let i = 0; i < 25; i++) {
        const element = document.createElement('div');
        const type = elementTypes[Math.floor(Math.random() * elementTypes.length)];
        
        element.className = `floating-element ${type}`;
        element.innerHTML = elementIcons[type];
        
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100}%`;
        element.style.animationDelay = `${Math.random() * 20}s`;
        element.style.animationDuration = `${Math.random() * 15 + 10}s`;
        element.style.opacity = `${Math.random() * 0.5 + 0.3}`;
        element.style.transform = `scale(${Math.random() * 0.7 + 0.5})`;
        
        floatingElementsContainer.appendChild(element);
    }
}

const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const dots = document.querySelectorAll('.nav-dot');
const carouselItems = document.querySelectorAll('.carousel-item');
const totalSlides = carouselItems.length;
let currentIndex = 0;
let autoSlideInterval;
let isAnimating = false;
function updateCarousel() {
    if (isAnimating) return;
    isAnimating = true;
    
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
    carouselItems.forEach((item, index) => {
        item.classList.toggle('active', index === currentIndex);
    });
    setTimeout(() => {
        isAnimating = false;
    }, 1000);
}
function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
}
function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 7000);
}
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

window.addEventListener('DOMContentLoaded', () => {
    createFloatingElements();
    startAutoSlide();
    updateTimeTogether();
    setInterval(updateTimeTogether, 3600000); 
    observer.observe(anniversaryContainer);
    observer.observe(messageElement);
    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            if (isAnimating) return;
            stopAutoSlide();
            currentIndex = parseInt(dot.getAttribute('data-index'));
            updateCarousel();
            startAutoSlide();
        });
    });

    const audio = document.getElementById("bg-music");
    audio.volume = 0.3;
    
    function playMusic() {
        audio.play().catch((error) => {
            console.log("Reproducción automática bloqueada, esperando interacción del usuario.");
        });
        document.removeEventListener("click", playMusic);
        document.removeEventListener("touchstart", playMusic);
    }
    
    document.addEventListener("click", playMusic);
    document.addEventListener("touchstart", playMusic);
    carouselItems[0].classList.add('active');
});
