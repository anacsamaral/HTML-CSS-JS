var dados = [
    { id: 123, nome: 'Ana' },
    { id: 456, nome: 'Eri' },
    { id: 789, nome: 'Duda' },
    { id: 212, nome: 'Luane' }
]

function montarTabela() {
    let tbody = document.querySelector('#tb-body');
    let html = '';

    /* DATA ATTRIBUTES - essa sintaxe funciona como se a gente criasse uma propriedade no elemento HTML, o "data-" e depois alguma palavra, ele entende como propriedade para ser acessada na execução */

    for (let item of dados) {
        html += `
                <tr>
                    <td class="coluna"><input type = "checkbox" data-id="${item.id}"></td>
                    <td class="coluna">${item.nome}</td>
                    <td class="coluna"><a class="btnExcluir" onclick="excluirItem(${item.id})">&#9746;</a></td>
                </tr>
                `
    }
    // o inner.html renderiza, o inner texto pega apenas a string
    tbody.innerHTML = html;
}

function adicionarItem() {
    let nomeInput = document.querySelector('#txt-texto');

    // gerar o id de forma automática
    let novoItem = {
        id: new Date().getTime(), nome: nomeInput.value
    }
    dados.push(novoItem);
    montarTabela();
    nomeInput.value = '';
    nomeInput.focus();
}

function excluirItem(idDel) {
    let listaAux = [];
    for (let i = 0; i < dados.length; i++) {
        if (dados[i].id != idDel) {
            listaAux.push(dados[i]);
        }
    }
    dados = listaAux;
    montarTabela();
}

function excluirSelecionados() {
    // pegar todos os checkbox criados com o data-id
    let listaCheckbox = document.querySelectorAll('[data-id]');
    if (listaCheckbox.length > 0) {
        // percorrer a lista para apagar os selecionados
        for (let ck of listaCheckbox) {
            if (ck.checked)
                excluirItem(ck.dataset.id);
        }
    }
    else alert('Não há itens para serem excluídos!!!');

}

function selecionaTodos() {
    let listaCheckbox = document.querySelectorAll('[data-id]');
    let ckPai = document.querySelector('#ckTodos');

    for (let ck of listaCheckbox)
        ck.checked = ckPai.checked;
}

document.addEventListener('DOMContentLoaded', function () {
    montarTabela();

    let btnAdd = document.querySelector('#btn-Add');
    btnAdd.addEventListener('click', adicionarItem, false);

    let btnSel = document.querySelector('#btnExcluirSelecionados');
    btnSel.addEventListener('click', excluirSelecionados, false);

    let ckPai = document.querySelector('#ckTodos');
    ckPai.addEventListener('click', selecionaTodos, false);

}, false);