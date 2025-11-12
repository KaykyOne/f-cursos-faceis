const iframe = document.getElementById("conteudo");

let inicio = 0;
let paginaAtual = './pages/inicio/index.html';
let modalAberto = true;

if (inicio === 0) {
    fetch('./pages/inicio/index.html')
        .then(res => res.text())
        .then(html => {
            document.getElementById('meu-componente').innerHTML = html;
        })
        .catch(err => console.error('Erro ao carregar componente:', err));

    inicio = 1;
}

const carregar = (caminho) => {
    const container = document.getElementById('tudo');
    if (container) {
        container.scrollTo({
            top: 0,
            behavior: "instant"
        });
    }
    paginaAtual = caminho;
    fetch(caminho)
        .then(res => res.text())
        .then(html => {
            const container = document.getElementById('meu-componente');
            container.innerHTML = html;
            container.scroll = 0;
            window.document.scroll = 0;
        })
        .catch(err => console.error('Erro ao carregar componente:', err));
}

const button = document.getElementById('buttonTema');
const button1 = document.getElementById('buttonFontUpper');
const button2 = document.getElementById('buttonFontUp');

const tudo = document.getElementById('tudo');

let tema = 0;
let fontUpper = 0;
let fontUp = 0;


const mudarTema = () => {
    tema = tema === 0 ? 1 : 0;
    if (tema === 1) {
        document.documentElement.style.setProperty('--fundo', 'black');
    } else {
        document.documentElement.style.setProperty('--fundo', 'white');
    }
    tudo.classList.toggle('invert', tema === 1);
}

const mudarUp = () => {
    fontUpper = fontUpper === 0 ? 1 : 0;
    if (fontUpper === 1) {
        document.documentElement.style.setProperty('font-size', '120%');
    } else {
        document.documentElement.style.setProperty('font-size', '100%');
    }
}

const mudarFontUpper = () => {
    fontUp = fontUp === 0 ? 1 : 0;
    if (fontUp === 1) {
        document.documentElement.style.setProperty('text-transform', 'uppercase');
        document.documentElement.style.setProperty('font-weight', '800');

    } else {
        document.documentElement.style.setProperty('text-transform', 'none');
        document.documentElement.style.setProperty('font-weight', 'normal');

    }
}

const buttonToTop = document.getElementById('buttonToUp');

const rolarParaCima = () => {
    const container = document.getElementById('tudo');
    if (container) {
        container.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
};

const modal = document.getElementById('modal');
const buttonModal = document.getElementById('bgFecharModal');

const alterarModal = () => {
    modalAberto = !modalAberto;
    if (modalAberto) {
        modal.classList = 'flex';
    }else{
        modal.classList = 'hidden';
    }
}

buttonModal.addEventListener('click', alterarModal)

buttonToTop; addEventListener('click', rolarParaCima);



button.addEventListener('click', mudarTema);
button1.addEventListener('click', mudarUp);
button2.addEventListener('click', mudarFontUpper);
