let app_phyto = document.getElementById('app_phyto');
let app_bits = document.getElementById('app_bits');
let app_miguel = document.getElementById('app_miguel');
let app_marcelo = document.getElementById('app_marcelo');
let app_fabin = document.getElementById('app_fabin');

app_phyto.addEventListener('click', () => showModal('phytoModal'));
app_bits.addEventListener('click', () => showModal('bitsModal'));
app_miguel.addEventListener('click', () => showModal('miguelModal'));
app_marcelo.addEventListener('click', () => showModal('marceloModal'));
app_fabin.addEventListener('click', () => showModal('fabinModal'));

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        modal.addEventListener('click', (e) => {
            if ((e.target.id == modalId ) || (e.target.id == 'close')) {
                modal.classList.remove('show');
            }
        })
    }
}

function bits() {
    let inverter = document.querySelector(".conteudo__inverter");

    inverter.addEventListener("click", (event) => {
        let unidade1 = document.querySelector(".conversor__lista1").value;
        let unidade2 = document.querySelector(".conversor__lista2").value;
        document.querySelector(".conversor__lista1").value = unidade2;
        document.querySelector(".conversor__lista2").value = unidade1;
        let resultado = calculaTemp(unidade2, unidade1);
        document.querySelector("#temperatura-saida").value = resultado.toFixed(2);
    });

    let botao = document.querySelector(".conversor__botao");
    botao.addEventListener("click", (event) => {
        event.preventDefault();
        let unidade1 = document.querySelector(".conversor__lista1").value;
        let unidade2 = document.querySelector(".conversor__lista2").value;
        let resultado = calculaTemp(unidade1, unidade2);
        document.querySelector("#temperatura-saida").value = resultado.toFixed(2);
    });

    function calculaTemp(deUnidade, paraUnidade) {
        let entrada = document.querySelector("#temperatura-entrada");
        let valor = parseFloat(entrada.value);
        entrada.focus();

        if (paraUnidade == "C") {
            let resultado = deUnidade == "K" ? valor - 273.15 : (valor - 32) / 1.8;
            return deUnidade == "C" ? valor : resultado;
        }

        if (paraUnidade == "F") {
            let resultado = deUnidade == "C" ? 1.8 * valor + 32 : (9 / 5) * (valor - 273.15) + 32;
            return deUnidade == "F" ? valor : resultado;
        }

        if (paraUnidade == "K") {
            let resultado = deUnidade == "F" ? (5 / 9) * (valor - 32) + 273.15 : valor + 273.15;
            return deUnidade == "K" ? valor : resultado;
        }
    }

    let menuUnidade1 = document.querySelector(".conversor__lista1");
    menuUnidade1.addEventListener("click", (event) => {
        limpaElementoSaida();
    });

    let menuUnidade2 = document.querySelector(".conversor__lista2");
    menuUnidade2.addEventListener("click", (event) => {
        limpaElementoSaida();
    });

    let input = document.querySelector("#temperatura-entrada")
    input.addEventListener('input', () => {
        limpaElementoSaida();
    });

    function limpaElementoSaida() {
        let saida = document.querySelector("#temperatura-saida")
        saida.value = "";
    };
}

let button = document.querySelector('#btn-exec-marcelo');

button.addEventListener('click', () => {
    let coin = document.querySelector('#coin').value;
    let url = `https://economia.awesomeapi.com.br/all/${coin}`;
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status = 200) converter(JSON.parse(xhr.responseText), coin);
        }
    }

    xhr.send();
});

function converter(priceDolar, coin) {
    let coin_BRL = coin.replace('-BRL', '');
    let coinResult = parseFloat(priceDolar[coin_BRL].bid);
    let moneyReal = document.querySelector('#money').value;
    let result = moneyReal * coinResult;

    document.querySelector('.result').innerHTML = result.toFixed(2);
}