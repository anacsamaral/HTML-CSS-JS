/* Vamos deixar alguns dados para representar um dataset que a interface vai receber de uma camada de persistência (banco de dados), é assim que acontece no ambiente profissional, receber dados de forma genérica: Json, XML, CSV, ... */

var vetAlunos = [
    {ra: 262413760, nome: 'Ana Caroline', curso: 'BSI'},
    {ra: 262413761, nome: 'Ana Ligia', curso: 'BSI'},
    {ra: 262413762, nome: 'Luane', curso: 'BSI'},
    {ra: 262413763, nome: 'Caroliny', curso: 'BSI'},
    {ra: 262413764, nome: 'Eri', curso: 'BSI'},
    {ra: 262413764, nome: 'Duda', curso: 'BSI'}
]

function carregaTabela(dados){
    // vincular o elemento à uma variável JavaScript
    let tab = document.querySelector('#tabela');

    // criar uma linha na tabela para ser o cabeçalho
    let trCabecalho = document.createElement('tr');

    // criar as colunas do cabeçalho
    let thRa = document.createElement('th');
    let thNome = document.createElement('th');
    let thCurso = document.createElement('th');

    // colocar texto em cada coluna do cabeçalho
    thRa.innerText = 'RA'; // inner text pega o texto padrão e coloca a string
    thNome.innerText = 'Nome do Aluno';
    thCurso.innerText = 'Curso';

    // adicionar os elementos colunasna linha do cabeçalho
    trCabecalho.appendChild(thRa);
    trCabecalho.appendChild(thNome);
    trCabecalho.appendChild(thCurso);

    // adicionar linha de cabeçalho na tabela
    tab.appendChild(trCabecalho);
    
    // percorrer o vetor e criar linhas na tabela para os dados
    for(let i = 0; i < dados.length; i++){
        let trLinha = document.createElement('tr');
        let tdRa = document.createElement('td');
        let tdNome = document.createElement('td');
        let tdCurso = document.createElement('td');

        tdRa.innerText = dados[i].ra;
        tdNome.innerText = dados[i].nome;
        tdCurso.innerText = dados[i].curso;

        trLinha.appendChild(tdRa);
        trLinha.appendChild(tdNome);
        trLinha.appendChild(tdCurso);

        tab.appendChild(trLinha);
    }
}

function adicionarItem(){
    // pegar os dados que foram digitados nos inputs do formulário
    let vRa = document.querySelector('#ra').value;
    let vNome = document.querySelector('#nome').value;
    let vCurso = document.querySelector('#curso').value;

    // adicionar os dados no vetor
    vetAlunos.push({ra: vRa, nome: vNome, curso: vCurso});

    // limpar a tabela
    document.querySelector('#tabela').innerHTML = '';

    // chamar a função 'carregaTabela'
    carregaTabela(vetAlunos);
}

function carregaTabela2(dados){
    let tab = document.querySelector('#tabela');

    // criar uma variável string para receber os comandos em HTML para serem renderizados pelo browser
    let html = `<tr>
                    <th> RA </th>
                    <th> Nome do Aluno </th>
                    <th> Curso </th>
                </tr>`
    
    for(let aluno of dados){
        html += `<tr>
                    <td>${aluno.ra}</td>
                    <td>${aluno.nome}</td>
                    <td>${aluno.curso}</td>
                </tr>`
    }
    //alert(html);
    
    tab.innerHTML = html;
}