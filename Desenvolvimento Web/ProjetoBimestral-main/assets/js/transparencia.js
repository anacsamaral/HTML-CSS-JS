// dados mockados

const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai','Jun','Jul','Ago','Set'];
const doacoes = [1200, 750, 980, 1100, 1200, 890, 1000, 1400, 800];
const instituicoes = [10, 5, 6, 12, 9, 4, 7, 11, 9];

const ctx1 = document.getElementById('graficoDoacoes');
new Chart(ctx1, {
  type: 'bar',
  data: {
    labels: meses,
    datasets: [{
      label: 'Alimentos doados (kg)',
      data: doacoes,
      backgroundColor: 'rgba(0, 38, 95, 0.99)',
      borderColor: 'hsla(216, 100%, 81%, 1.00)',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 500 }
      }
    }
  }
});

const ctx2 = document.getElementById('graficoInstituicoes');
new Chart(ctx2, {
  type: 'doughnut',
  data: {
    labels: ['Creche Esperança', 'Casa do Pão', 'Lar Solidário', 'Centro Bem-Estar', 'Projeto Alimentar','Projeto Ruas','Lar da Solidariedade'],
    datasets: [{
      label: 'Distribuição (%)',
      data: [20, 12, 9, 25, 10, 16, 8],
      backgroundColor: [
        'rgba(0, 102, 204, 1)',   
        'rgba(0, 58, 134, 1)', 
        'rgba(51, 204, 204, 1)', 
        'rgba(0, 128, 255, 1)',  
        'rgba(144, 227, 238, 1)',  
        'rgba(90, 132, 248, 1)', 
        'rgba(0, 76, 153, 1)',   
        'rgba(0, 17, 255, 1)',   
        'rgba(63, 156, 231, 1)'  
      ],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  }
});
//tabela 

function tabelaDoacoes(meses, doacoes, instituicoes) {
  const container = document.getElementById('tabelaDoacoes');
  const table = document.createElement('table');
  table.className = 'table table-striped table-bordered text-center';
  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr class="table-primary">
      <th>Mês</th>
      <th>Quantidade de Alimentos (kg)</th>
      <th>Instituições Ajudadas</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  meses.forEach((mes, i) => {
    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td>${mes}</td>
      <td>${doacoes[i].toLocaleString('pt-BR')}</td>
      <td>${instituicoes[i]}</td>
    `;
    tbody.appendChild(linha);
  });
  table.appendChild(tbody);

  container.appendChild(table);
}

// Chama a função para montar a tabela
tabelaDoacoes(meses, doacoes, instituicoes);



