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

function marcelo() {
    let botao = document.querySelector('.botao')
    botao.addEventListener('click', function () {
        let moeda = document.getElementById('entrada')
        let entrada = document.querySelector('.moedas').value;
        let url = `https://economia.awesomeapi.com.br/all/${entrada}`;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status = 200) calculo(JSON.parse(xhr.responseText), entrada);
            }
        }
        xhr.send();
    })

    function calculo(calcular, teste) {
        let entrada = teste.replace('-BRL', '')
        let moeda = parseFloat(calcular[entrada].bid)
        let realValor = document.querySelector('#entrada').value
        let resultado = realValor * moeda
        document.querySelector('.resultado').innerHTML = resultado
    }
}