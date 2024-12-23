const html = document.querySelector("html")
const focoBt = document.querySelector(".app__card-button--foco")
const curtoBt = document.querySelector(".app__card-button--curto")
const longoBt = document.querySelector(".app__card-button--longo")
const banner = document.querySelector(".app__image")
const texto = document.querySelector(".app__title")
const botoes = document.querySelectorAll(".app__card-button")
const startPauseBt = document.querySelector("#start-pause")
const musicaFocoInput = document.querySelector("#alternar-musica")
const iniciarOuPausarBt = document.querySelector("#start-pause span")
const iniciarOuPausarBtIcon = document.querySelector(".app__card-primary-butto-icon")
const tempoNaTela = document.querySelector("#timer")

const musica = new Audio("/Fokus-projeto-base/sons/luna-rise-part-one.mp3")
const tempoPausado = new Audio("/Fokus-projeto-base/sons/pause.mp3")
const tempoIniciado = new Audio("/Fokus-projeto-base/sons/play.wav")
const tempoFinalizado = new Audio("/Fokus-projeto-base/sons/beep.mp3")




let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musica.loop = true


musicaFocoInput.addEventListener("change", () => {
    if(musica.paused){
        musica.play()
    }else {
        musica.pause()
    }
})




focoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto("foco")
    focoBt.classList.add("active")
})

curtoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 300
   alterarContexto("descanso-curto")
   curtoBt.classList.add("active")
})

longoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto("descanso-longo")
    longoBt.classList.add("active")
})



const timer = document.querySelector("#timer")



function alterarContexto(contexto){
    mostrarTempo()
    html.setAttribute("data-contexto", contexto)
    banner.setAttribute("src", `/Fokus-projeto-base/imagens/${contexto}.png`)
    botoes.forEach(function(contexto){
        contexto.classList.remove("active")
    })
    switch (contexto) {
        case "foco": 
                texto.innerHTML = `
                    Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong> 
                `
            break;    
        case "descanso-curto":
                texto.innerHTML = ` 
                    Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
                `
            break;    
        case "descanso-longo": 
                texto.innerHTML = ` 
                    Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
                 `
        default:
            break;
    }
}


const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        tempoFinalizado.play()
        alert("Tempo finalizado!")
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}


startPauseBt.addEventListener("click", iniciarOuPausar)

function iniciarOuPausar(){
    if(intervaloId) {
        tempoPausado.play();
        zerar()
        return
    }
    tempoIniciado.play();
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    iniciarOuPausarBtIcon.setAttribute("src", `/Fokus-projeto-base/imagens/pause.png`)
    
}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"    
    iniciarOuPausarBtIcon.setAttribute("src", `/Fokus-projeto-base/imagens/play_arrow.png`)
    intervaloId = null
}

function mostrarTempo(){
    const tempo = new Date (tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {minute: "2-digit", second: "2-digit"})
    tempoNaTela.innerHTML = `${tempoFormatado} `
}

mostrarTempo()


