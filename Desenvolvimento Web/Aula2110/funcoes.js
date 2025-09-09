function cumprimentaExterno(){
        nome = prompt('Digite a disciplina:');
        document.write('<h2 style="color:magenta;">Disciplina: '+nome+'</h2><hr>');
}

function calculo(){
    var n1 = prompt("Digite o 1º valor" , "Digite aqui: ");
    var n2 = prompt("Digite o 2º valor" , "Digite aqui: ");
    var res = parseInt (n1) + parseInt (n2);
		
    document.write ("<h2>Resultado = </h2>", res);
}