
// --- BANCOS DE DADOS FAKE (VETORES) ---
var doacoesRealizadas = [{ data: "02/10/2025", alimento: "Feijão", quantidade: "3 kg", status: "Entregue", statusClass: "bg-success" }];
var historicoDoador = [{ data: "10/09/2025", item: "2kg de Açúcar", status: "Entregue" }, { data: "30/08/2025", item: "10L de Leite", status: "Entregue" }];
var solicitacoesInstituicao = [{ data: "05/10/2025", alimento: "Óleo de Soja", quantidade: "30 L", status: "Ativa", statusClass: "bg-success" }];
var historicoInstituicao = [{ data: "01/10/2025", item: "Recebido 10kg de Macarrão de (José F.)" }, { data: "28/09/2025", item: "Recebido 8L de Óleo de (Fernanda L.)" }];

// --- FUNÇÕES DE NAVEGAÇÃO GERAL ---
function mostrarDashboard(tipo) {
    document.getElementById('tela-inicial').classList.add('d-none');
    if (tipo === 'doador') { document.getElementById('dashboard-doador').classList.remove('d-none'); }
    else if (tipo === 'instituicao') { document.getElementById('dashboard-instituicao').classList.remove('d-none'); }
}

function voltarParaInicio() {
    document.getElementById('dashboard-doador').classList.add('d-none');
    document.getElementById('dashboard-instituicao').classList.add('d-none');
    document.getElementById('tela-inicial').classList.remove('d-none');
}

// --- FUNÇÃO DE RENDERIZAÇÃO ---
function renderizarTudo() {
    var tabelaRealizadasBody = document.getElementById("tabelaRealizadas");
    tabelaRealizadasBody.innerHTML = '';
    for (var doacao of doacoesRealizadas) { tabelaRealizadasBody.innerHTML += '<tr><td>' + doacao.data + '</td><td>' + doacao.alimento + '</td><td>' + doacao.quantidade + '</td><td><span class="badge ' + doacao.statusClass + '">' + doacao.status + '</span></td></tr>'; }
    var listaHistoricoDoador = document.getElementById("listaHistoricoDoador");
    listaHistoricoDoador.innerHTML = '';
    for (var item of historicoDoador) { listaHistoricoDoador.innerHTML += '<li class="list-group-item">' + item.data + ' - ' + item.item + '</li>'; }
    var tabelaSolicitacoesBody = document.getElementById("tabelaSolicitacoes");
    tabelaSolicitacoesBody.innerHTML = '';
    for (var solicitacao of solicitacoesInstituicao) { tabelaSolicitacoesBody.innerHTML += '<tr><td>' + solicitacao.data + '</td><td>' + solicitacao.alimento + '</td><td>' + solicitacao.quantidade + '</td><td><span class="badge ' + solicitacao.statusClass + '">' + solicitacao.status + '</span></td></tr>'; }
    var listaHistoricoInstituicao = document.getElementById("listaHistoricoInstituicao");
    listaHistoricoInstituicao.innerHTML = '';
    for (var item of historicoInstituicao) { listaHistoricoInstituicao.innerHTML += '<li class="list-group-item">' + item.data + ' - ' + item.item + '</li>'; }
}

// --- LÓGICA DO FORMULÁRIO DO DOADOR ---
function registrarDoacao(event) {
    event.preventDefault();
    var nome = document.getElementById("nome"), quantidade = document.getElementById("quantidade"), unidade = document.getElementById("unidade"), mensagem = document.getElementById("mensagem-doador");
    nome.classList.remove("is-invalid"); quantidade.classList.remove("is-invalid"); unidade.classList.remove("is-invalid"); mensagem.innerHTML = "";
    var valido = true;
    if (nome.value.trim() === "") { nome.classList.add("is-invalid"); valido = false; }
    if (unidade.value.trim() === "") { unidade.classList.add("is-invalid"); valido = false; }
    if (quantidade.value.trim() === "" || parseInt(quantidade.value) <= 0) { quantidade.classList.add("is-invalid"); valido = false; }
    if (!valido) { mensagem.innerHTML = '<div class="alert alert-danger">Preencha corretamente os campos destacados.</div>'; return false; }
    var novaDoacao = { data: new Date().toLocaleDateString('pt-BR'), alimento: nome.value, quantidade: quantidade.value + ' ' + unidade.value, status: "Aguardando Coleta", statusClass: "bg-info text-dark" };
    doacoesRealizadas.push(novaDoacao);
    renderizarTudo();
    mensagem.innerHTML = '<div class="alert alert-success">Doação registrada com sucesso!</div>';
    document.getElementById("formDoacao").reset();
    nome.focus();
    return false;
}

// --- LÓGICA DO FORMULÁRIO DA INSTITUIÇÃO ---
function solicitarAlimento(event) {
    event.preventDefault();
    var alimento = document.getElementById("alimento-solicitado"), quantidade = document.getElementById("quantidade-solicitada"), mensagem = document.getElementById("mensagem-solicitacao");
    alimento.classList.remove("is-invalid"); quantidade.classList.remove("is-invalid"); mensagem.innerHTML = "";
    var valido = true;
    if (alimento.value.trim() === "") { alimento.classList.add("is-invalid"); valido = false; }
    if (quantidade.value.trim() === "") { quantidade.classList.add("is-invalid"); valido = false; }
    if (!valido) { mensagem.innerHTML = '<div class="alert alert-danger">Preencha corretamente os campos destacados.</div>'; return false; }
    var novaSolicitacao = { data: new Date().toLocaleDateString('pt-BR'), alimento: alimento.value, quantidade: quantidade.value, status: "Ativa", statusClass: "bg-success" };
    solicitacoesInstituicao.push(novaSolicitacao);
    renderizarTudo();
    mensagem.innerHTML = '<div class="alert alert-success">Sua solicitação foi publicada!</div>';
    document.getElementById("formSolicitacao").reset();
    alimento.focus();
    return false;
}

// --- INICIALIZAÇÃO ---
window.onload = function () {
    renderizarTudo();
};
