let imagemAtual = 0;

function trocarImagem() {
  const imagem = document.querySelector('.img-fluid.desktop-hero');
  if (imagemAtual === 0) {
    imagem.src = 'assets/images/img-nova.jpg';
    imagemAtual = 1;
  } else {
    imagem.src = 'assets/images/desktop-hero.jpg';
    imagemAtual = 0;
  }
}