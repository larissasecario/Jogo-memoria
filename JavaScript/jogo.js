const telaJogo = document.querySelector('.tela-jogo');
const nomeJogador = document.querySelector('#nome-jogador');
const cartasPersonagens = ['carta1','carta2','carta3','carta4',
                            'carta5','carta6','carta7','carta8',
                            'carta9','carta10','carta11','carta12'];
let tempoJogo = document.querySelector('#tempo');
let primeiraCarta = '';
let segundaCarta = '';


window.onload = function (){
    nomeJogador.innerHTML = localStorage.getItem('jogador');
    cronometro();
    adicionarCartas();
    
}




function cronometro(){
    let seg = 0; 
    let min = 0;
    let hora = 0;
 
    let segStr;
    let hotStr = '00';
    let minStr = '00';
 
     this.tempo = setInterval(()=>{
 
         if(seg < 60){
             seg+=1;
             if(seg <= 9){
                 segStr = '0' + String(seg)
             }else{
                 segStr = String(seg);
             }
         }else{
             if(min < 60){ 
                 seg=0;
                 min+=1;
                 if(min <= 9){
                     minStr = '0'+ String(min);
                 }else{
                     minStr = String(min);}
             }else{
                 min = 0;
                 hora+=1;
                 if(hora <=9){
                     hotStr = '0'+ String(hora);
                 }else{
                     hotStr = String(hora);
                 }
 
             }
         }
     tempoJogo.innerHTML = `${hotStr}:${minStr}:${segStr}`; 
     },1000);
 
 
 }

 function adicionarCartas(){
    const duplicaArray = [...cartasPersonagens, ...cartasPersonagens];
    const desordenarArray = duplicaArray.sort(()=>{
        return Math.random()-0.5;
    });
    desordenarArray.forEach((nomeCarta)=>{
       const carta = criarCard(nomeCarta);
       telaJogo.appendChild(carta);
    });
}

function criarHtml(elemento, classe){
    const elementoHtml = document.createElement(elemento)
    elementoHtml.className = classe;
    return elementoHtml;

}

function criarCard(nomeCarta){
   const cartaDiv = criarHtml('div', 'card');
   const cartaFrenteDiv = criarHtml('div', 'face frente');
   const cartaCostaDiv = criarHtml('div','face costa')

    cartaFrenteDiv.style.backgroundImage = `url('/img/${nomeCarta}.jpg')`;
    cartaDiv.appendChild(cartaFrenteDiv);
    cartaDiv.appendChild(cartaCostaDiv);


    cartaDiv.setAttribute('data-nomeCarta', nomeCarta);
    cartaDiv.addEventListener('click', revelarCarta);
    return cartaDiv; 

}

function revelarCarta(event){
    const divPai = event.target.parentNode;
    if(divPai.className != 'virar-Carta'){
        if(primeiraCarta == ''){
            divPai.classList.add('virar-Carta');
            primeiraCarta = divPai;
        
        }else{
            divPai.classList.add('virar-Carta');
            segundaCarta = divPai;
        }
    }

    verificarIgualdade();     

}


function verificarIgualdade(){
   
    const primeiraVerificacao = primeiraCarta.getAttribute('data-nomeCarta');
    const segundaVerificacao = segundaCarta.getAttribute('data-nomeCarta'); 
    
    if(primeiraVerificacao == segundaVerificacao){
        primeiraCarta.firstChild.classList.add('acerto-carta');
        segundaCarta.firstChild.classList.add('acerto-carta');
        primeiraCarta = '';
        segundaCarta = '';
        verificarFimGame();

    }else{
        setTimeout(()=>{
            primeiraCarta.classList.remove('virar-Carta');
            segundaCarta.classList.remove('virar-Carta');
            primeiraCarta = '';
            segundaCarta = '';
        }, 500)   
    }
}

function verificarFimGame(){
    const cartasAcertadas = document.querySelectorAll('.acerto-carta');
    if(cartasAcertadas.length == 24){
        clearInterval(this.tempo);

    }
}





