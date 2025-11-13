// Carrega o HEADER 
fetch('./includes/header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;

    // Agora que o header foi carregado, buscamos os elementos do menu
    const menuBtn = document.getElementById('menu-btn');
    const navbar = document.getElementById('navbar');

    if (menuBtn && navbar) {
      menuBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuBtn.querySelector('i').classList.toggle('bi-x'); // muda o ícone ao abrir
      });
    }
  })
  .catch(error => console.error('Erro ao carregar o header:', error));


// Carrega o FOOTER
fetch('./includes/footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer').innerHTML = data;
  })
  .catch(error => console.error('Erro ao carregar o footer:', error));


// --- CÓDIGO DO CARROSSEL DE NOTÍCIAS ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleção de Elementos
    const carouselInner = document.getElementById('carouselInner');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatorsContainer = document.getElementById('carouselIndicators');

    // Variáveis de estado
    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;
    const slideDuration = 5000; // Tempo em milissegundos (5 segundos)

    // 2. Função de Transição
    function updateCarousel() {
        // Move o carrossel usando CSS Transform para a posição do slide atual
        const offset = -currentIndex * 100;
        carouselInner.style.transform = `translateX(${offset}%)`;

        // Atualiza os indicadores
        updateIndicators();
    }

    // 3. Função de Navegação (Next/Prev)
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    // 4. Criação dos Indicadores (Pontos)
    function createIndicators() {
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('span');
            indicator.classList.add('indicator');
            if (i === 0) {
                indicator.classList.add('active');
            }
            // Adiciona evento para pular para o slide ao clicar no ponto
            indicator.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
                restartAutoSlide(); // Reinicia o timer após clique manual
            });
            indicatorsContainer.appendChild(indicator);
        }
    }

    // 5. Atualização dos Indicadores
    function updateIndicators() {
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    // 6. Configuração da Transição Automática
    function startAutoSlide() {
        // Limpa qualquer intervalo existente para evitar duplicação
        clearInterval(autoSlideInterval); 
        autoSlideInterval = setInterval(nextSlide, slideDuration);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    function restartAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    // 7. Inicialização e Event Listeners
    if (totalSlides > 0) {
        createIndicators();
        updateCarousel();
        startAutoSlide();

        // Pausa no hover para leitura
        carouselInner.addEventListener('mouseenter', stopAutoSlide);
        carouselInner.addEventListener('mouseleave', startAutoSlide);

        // Eventos para as setas
        nextBtn.addEventListener('click', () => {
            nextSlide();
            restartAutoSlide();
        });
        prevBtn.addEventListener('click', () => {
            prevSlide();
            restartAutoSlide();
        });
    }
});