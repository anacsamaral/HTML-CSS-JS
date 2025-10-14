function contaLetras(){
    let frase = prompt('Informe uma frase:')

    //frase = frase.substring(0,2)+'X'+frase.substring(4,frase.length)
    frase = frase.trim()
    
    document.write('<h2>A frase <strong style="color:blue">',frase,'</strong> possui ',frase.length,' caracteres</h2>')

    console.log('A frase',frase,'possui',frase.length,' caracteres')
}

function exibeLetras(txt){
    for (let i = 0; i < txt.length; i++) {
        if(txt[i] != ' ')
            document.write('<em style="text-decoration:normal">',txt[i],' - <em>')
    }
}

function apagaVogais(txt){
    let novoTxt = ''
    let vogais = 'aeiouáéíóúàèìòùãõâêîôû'
    for (let i = 0; i < txt.length; i++) {
        if(vogais.indexOf(txt[i].toLowerCase()) == -1){
            novoTxt += txt[i]
        }        
    }
}