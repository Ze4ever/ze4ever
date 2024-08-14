document.addEventListener("DOMContentLoaded", function () {
    // Dados das imagens da galeria
    const galleryImages = [
        { src: "imagem1.jpg", alt: "coisas" },
        { src: "imagem2.jpg", alt: "coisas" },
        { src: "imagem3.jpg", alt: "coisas" }
    ];

    // Dados das entradas do diário
    const diaryEntries = [
        { date: "August 13, 2024", link: "13082024.html", description: "Things", imgSrc: "imagem2.jpg", keywords: "Things, 13" },
        { date: "August 10, 2024", link: "10082024.html", description: "Things", imgSrc: "imagem2.jpg", keywords: "Things, 10" }
        // Adicione mais entradas conforme necessário
    ];

    // Função para renderizar a galeria
    function renderGallery() {
        const galleryContainer = document.getElementById('gallery-container');
        galleryImages.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image.src;
            imgElement.alt = image.alt;
            galleryContainer.appendChild(imgElement);
        });
    }

    // Função para renderizar as entradas do diário
    function renderDiaryEntries() {
        const diaryContainer = document.getElementById('diary-entries');
        diaryEntries.forEach(entry => {
            const diaryDiv = document.createElement('div');
            diaryDiv.className = 'diary-entry';
            diaryDiv.setAttribute('data-date', entry.date);
            diaryDiv.setAttribute('data-keywords', entry.keywords);
            diaryDiv.innerHTML = `
                <div class="diary-entry-content">
                    <h3><a href="${entry.link}">${entry.date}</a></h3>
                    <p>${entry.description} <a href="${entry.link}">:)</a></p>
                </div>
                <img src="${entry.imgSrc}" alt="coisas">
            `;
            diaryContainer.appendChild(diaryDiv);
        });
    }

    // Renderiza a galeria e as entradas do diário
    renderGallery();
    renderDiaryEntries();
});

// Função para ordenar as entradas do diário por data
function sortDiary(order) {
    const diaryEntries = document.querySelectorAll('.diary-entry');
    const diaryContainer = document.getElementById('diary-entries');

    // Converter NodeList para array
    const entriesArray = Array.from(diaryEntries);

    // Ordenar o array com base no atributo data-date
    entriesArray.sort((a, b) => {
        const dateA = new Date(a.getAttribute('data-date'));
        const dateB = new Date(b.getAttribute('data-date'));
        return order === 'asc' ? dateA - dateB : dateB - dateA;
    });

    // Reordenar as entradas no container
    diaryContainer.innerHTML = '';
    entriesArray.forEach(entry => diaryContainer.appendChild(entry));
}

// Função para pesquisar entradas por palavra-chave
function searchDiary() {
    const keyword = document.getElementById('searchKeyword').value.toLowerCase();
    const diaryEntries = document.querySelectorAll('.diary-entry');

    diaryEntries.forEach(entry => {
        const keywords = entry.getAttribute('data-keywords').toLowerCase();
        entry.style.display = keywords.includes(keyword) ? 'flex' : 'none';
    });
}

// Mostrar ou esconder o botão de "Voltar ao Início"
window.onscroll = function() {
    toggleBackToTopButton();
};

function toggleBackToTopButton() {
    const btn = document.getElementById('backToTopBtn');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
}

// Função para rolar a página de volta ao topo
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
