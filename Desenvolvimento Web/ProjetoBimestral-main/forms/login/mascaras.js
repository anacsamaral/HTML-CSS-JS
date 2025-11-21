// APLICAR CLASSE BOOTSTRAP

function setValid(input, condition) {
    if (condition) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
    } else {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
    }
}

// MÁSCARAS SIMPLES

function maskCPF(value) {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function maskTelefone(value) {
    return value
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/, "($1)$2")
        .replace(/(\d{5})(\d)/, "$1-$2");
}

function maskCEP(value) {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d)/, "$1-$2");
}

// Aplicar máscaras automaticamente
document.addEventListener("input", function (e) {
    if (e.target.id === "cpf") e.target.value = maskCPF(e.target.value);
    if (e.target.id === "telefone") e.target.value = maskTelefone(e.target.value);
    if (e.target.id === "cep") e.target.value = maskCEP(e.target.value);
});

// ===============================
// VALIDAR UF
// ===============================
function validarUF() {
    const el = document.getElementById("estado");
    if (!el) return;

    const ufs = [
        "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS",
        "MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC",
        "SP","SE","TO"
    ];

    const ok = ufs.includes(el.value.trim().toUpperCase());
    setValid(el, ok);
}

// ===============================
// VALIDAÇÃO DE CPF
// ===============================
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0, resto;

    for (let i = 1; i <= 9; i++)
        soma += parseInt(cpf[i - 1]) * (11 - i);

    resto = (soma * 10) % 11;
    if (resto >= 10) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++)
        soma += parseInt(cpf[i - 1]) * (12 - i);

    resto = (soma * 10) % 11;
    if (resto >= 10) resto = 0;

    return resto === parseInt(cpf[10]);
}

// ===============================
// VALIDAÇÕES INDIVIDUAIS
// ===============================
function validarCampoTexto(id) {
    const el = document.getElementById(id);
    setValid(el, el.value.trim().length >= 3);
}

function validarEmail() {
    const el = document.getElementById("email-cadastro");
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValid(el, regex.test(el.value));
}

function validarCPFcampo() {
    const el = document.getElementById("cpf");
    setValid(el, validarCPF(el.value));
}

function validarTelefone() {
    const el = document.getElementById("telefone");
    setValid(el, el.value.length >= 14);
}

function validarCEPcampo() {
    const el = document.getElementById("cep");
    setValid(el, el.value.length === 9);
}

function validarData() {
    const el = document.getElementById("nascimento");
    setValid(el, el.value !== "");
}

function validarPeso() {
    const el = document.getElementById("peso");
    setValid(el, el.value > 0 && el.value < 400);
}

function validarAltura() {
    const el = document.getElementById("altura");
    setValid(el, el.value > 0 && el.value < 3);
}

function validarSelect(id) {
    const el = document.getElementById(id);
    setValid(el, el.value !== "");
}

// ===============================
// DISPARAR VALIDAÇÕES NO BLUR
// ===============================
document.addEventListener("blur", function (e) {
    switch (e.target.id) {
        case "nome": validarCampoTexto("nome"); break;
        case "email-cadastro": validarEmail(); break;
        case "telefone": validarTelefone(); break;
        case "cpf": validarCPFcampo(); break;
        case "nascimento": validarData(); break;
        case "cep": validarCEPcampo(); break;
        case "cidade": validarCampoTexto("cidade"); break;
        case "estado": validarUF(); break;
        case "endereco": validarCampoTexto("endereco"); break;
        case "peso": validarPeso(); break;
        case "altura": validarAltura(); break;
        case "doencas": validarCampoTexto("doencas"); break;
        case "observacoes": validarCampoTexto("observacoes"); break;
        case "categoria": validarSelect("categoria"); break;
    }
}, true);

document.getElementById("cep").addEventListener("blur", function () {
    let cep = this.value.replace(/\D/g, "");

    if (cep === "") return; // opcional

    if (cep.length !== 8) {
        setValid(this, false);
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json())
        .then(data => {
            if (data.erro) {
                setValid(this, false);
                return;
            }

            document.getElementById("endereco").value = data.logradouro;
            document.getElementById("cidade").value = data.localidade;
            document.getElementById("estado").value = data.uf;

            setValid(this, true);
        })
        .catch(() => setValid(this, false));
});

// ===============================
// VALIDAÇÃO FINAL DO FORMULÁRIO
// ===============================
document.getElementById("form-cadastro").addEventListener("submit", function (e) {
    e.preventDefault();

    const campos = [
        "categoria", "nome", "email-cadastro", "telefone", "cpf",
        "nascimento", "cidade", "estado", "endereco",
        "peso", "altura"
    ];

    let ok = true;

    campos.forEach(id => {
        const el = document.getElementById(id);
        el.dispatchEvent(new Event("blur"));
        if (!el.classList.contains("is-valid")) ok = false;
    });

    if (!ok) {
        alert("⚠ Preencha todos os campos corretamente!");
        return;
    }

    alert("✅ Cadastro realizado com sucesso!");
});