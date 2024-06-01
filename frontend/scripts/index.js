// Seleciona os elementos
var inputTelefone = document.getElementById('telefone');
var spanErroTelefone = document.querySelector('.erro_numero');
var inputMensagem = document.getElementById('input_mensagem');
var contadorSpanMensagem = document.getElementById('contador_input_mensagem');
var formulario = document.querySelector('form');


// Função para formatar o número de telefone
function formatarNumeroTelefone(event, spanErro) {
    var inputTelefone = event.target;
    var numeroTelefone = inputTelefone.value.replace(/\D/g, '');
    var regexTelefone = /^(\d{0,2})(\d{0,5})(\d{0,4})$/;
    var gruposTelefone = regexTelefone.exec(numeroTelefone);

    if (gruposTelefone) {
        var telefoneFormatado = '';

        if (gruposTelefone[1]) {
            telefoneFormatado += '(' + gruposTelefone[1];
        }
        if (gruposTelefone[2]) {
            telefoneFormatado += ') ' + gruposTelefone[2];
        }
        if (gruposTelefone[3]) {
            telefoneFormatado += '-' + gruposTelefone[3];
        }

        inputTelefone.value = telefoneFormatado;

        if (isValidPhone(telefoneFormatado)){
            spanErro.style.display = 'none';
        } else {
            spanErro.style.display = 'block';    
        }
    } 
}

// Função que valida o formato do número de telefone
function isValidPhone(phone) {
    const brazilianPhoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/gi;
    return brazilianPhoneRegex.test(phone);
};

// Função para contar os caracteres digitados na mensagem
function contarCaracteresMensagem(event, contadorSpan) {
    var inputMensagem = event.target;
    var caracteresDigitados = inputMensagem.value.length;
    var caracteresRestantes = 30 - caracteresDigitados;
    contadorSpan.textContent = caracteresRestantes + ' caracteres restantes';
}

// Função para verificar se o botão de envio do formulário deve ser habilitado
function verificarHabilitarEnvio() {
    var telefone = document.getElementById('telefone').value;
    var mensagem = document.getElementById('input_mensagem').value;
    var botaoEnvio = document.querySelector('button');

    if (isValidPhone(telefone) && mensagem != null && mensagem != '') {
        botaoEnvio.disabled = false;
    } else {
        botaoEnvio.disabled = true;
    }
}

// Função para enviar a mensagem para a API
function enviarMensagem() {
    var telefone = document.getElementById('telefone').value;
    var msgtxt = document.getElementById('input_mensagem').value;

    var mensagemJSON = {
        telefone: telefone,
        msgtxt: msgtxt
    };

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:5000/recebermsg', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            handleResponse(xhr);
        }
    };

    xhr.send(JSON.stringify(mensagemJSON));
}

// Adiciona um listener para o evento submit do formulário
formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    enviarMensagem();
});

// Função para limpar o formulário
function limparFormulario() {
    document.getElementById('telefone').value = '';
    document.getElementById('input_mensagem').value = '';
}

// Função para manipular a resposta da requisição AJAX
function handleResponse(xhr) {
    if (xhr.status === 200) {
        alert('Mensagem enviada com sucesso!');
        limparFormulario();
    } else {
        if (xhr.statusText == ''){
            alert('Erro ao enviar mensagem: ' + 0);    
        } else {
            alert('Erro ao enviar mensagem: ' + xhr.statusText);
        }
    }
}


// Adiciona listeners para os eventos de entrada nos inputs e formulário
inputTelefone.addEventListener('input', function(event) {
    formatarNumeroTelefone(event, spanErroTelefone);
    verificarHabilitarEnvio();
});

inputMensagem.addEventListener('input', function(event) {
    contarCaracteresMensagem(event, contadorSpanMensagem);
    verificarHabilitarEnvio();
});

formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    enviarMensagem();
});
