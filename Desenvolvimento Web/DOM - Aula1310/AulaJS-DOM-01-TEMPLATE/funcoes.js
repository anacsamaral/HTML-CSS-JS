function pegaValor() {
    /*
        // Aqui só pega o texto digitado no input
       alert(document.getElementById("nome").value);
    
       // Aqui pega o objeto inteiro
       alert(document.getElementById("nome"));
       alert(document.getElementById("teste")); // h1
    
       let objeto = document.getElementById("nome");
       objeto.value = 'Texto Alterado!!!';
    */
}

function teste() {
    var elemento = document.getElementById("intro");
    elemento.align = "center";
    elemento.innerHTML = "<strong>teste modificado</strong>";

    let eDiv = document.getElementById('main'); // objeto
    let vetP = eDiv.getElementsByTagName('p'); // vetor de objetos
    for (let i = 0; i < vetP.length; i++)
        elemento.innerHTML += ' - ' + vetP[i].innerHTML;
}

function sugereNome()
{ let pessoas = ["João", "José", "Maria", "Sebastião", "Ana"];
  let doc=document.querySelector("#texto");
  doc.textContent=
         pessoas[(Math.floor(Math.random()*pessoas.length))]; 
}