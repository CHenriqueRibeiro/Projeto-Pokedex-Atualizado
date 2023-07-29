function ligarDisplay(display, ledRed) {
    display.removeAttribute("class");
    display.setAttribute("class", "display powerOn")
    ledRed.removeAttribute("class");
    ledRed.setAttribute("class", "led red ledRedOn")
}
function desligarDisplay(display, ledRed) {
    display.removeAttribute("class");
    display.setAttribute("class", "display powerOff")
    ledRed.removeAttribute("class");
    ledRed.setAttribute("class", "led red")
}

function ligarDescriptionPoke(descriptionPoke, ledRed) {
    descriptionPoke.removeAttribute("class");
    descriptionPoke.setAttribute("class", "descriptionPoke ligado")
    ledRed.removeAttribute("class");
    ledRed.setAttribute("class", "led red ledRedOn")
}

function desligarDescriptionPoke(descriptionPoke, ledRed) {
    descriptionPoke.removeAttribute("class");
    descriptionPoke.setAttribute("class", "descriptionPoke desligado")
    ledRed.removeAttribute("class");
    ledRed.setAttribute("class", "led red")
}

function piscaVerde(ledGreen) {


    ledGreen.removeAttribute("class");
    ledGreen.setAttribute("class", "led green ledGreenOn")
    setTimeout(() => {
        ledGreen.removeAttribute("class");
        ledGreen.setAttribute("class", "led green")
    }, 100);
}

window.onload = function () {
    let listaPokemon = []
    let btnPower = document.querySelector('.btnPower')
    let display = document.querySelector('.display')
    let btnDir = document.querySelector('.dir')
    let btnEsq = document.querySelector('.esq')
    let btnCim = document.querySelector('.cim')
    let btnBai = document.querySelector('.bai')
    let btnReset = document.querySelector('.btnReset')
    let listaDePokemons = document.querySelector('.listPokemons')
    let ledRed = document.querySelector('.red')
    let ledGreen = document.querySelector('.green')
    let descriptionPoke = document.querySelector('.descriptionPoke')




    btnPower.onclick = function () {
        let displayClass = display.getAttribute("class")
        let displayState = displayClass.split(' ')[1]
        let descriptionPokeClass = descriptionPoke.getAttribute("class")
        let descriptionPokeState = descriptionPokeClass.split(' ')[1]
        piscaVerde(ledGreen);

        if (descriptionPokeState == "desligado") {
            ligarDescriptionPoke(descriptionPoke, ledRed)
        } else {
            desligarDescriptionPoke(descriptionPoke, ledRed)
        }

        if (displayState == "powerOff") {
            ligarDisplay(display, ledRed)
        } else {
            desligarDisplay(display, ledRed)
        }
    }

    for (let i = 1; i <= 706; i++) {
        listaPokemon.push(`pokemons/poke_${i}.gif`)
    }

    let pokemons = listaPokemon.map(link => {
        return `<div class="pokeWrapper"><img src="${link}"></div>`

    });

    listaDePokemons.innerHTML = pokemons.join('')
    let positionValue = 0;


    btnEsq.onclick = function () {
        piscaVerde(ledGreen);
        if (positionValue == 0) {
            positionValue = -261220
        }

        if (positionValue < 0) {
            positionValue = positionValue + 370
            listaDePokemons.style.left = (positionValue) + 'px'
        }

    }

    btnDir.onclick = function () {
        piscaVerde(ledGreen);

        if (positionValue == -260850) {
            positionValue = 370
        }

        if (positionValue > -261220) {
            positionValue = positionValue - 370
            listaDePokemons.style.left = (positionValue) + 'px'
        }
    }

    btnReset.onclick = function () {
        piscaVerde(ledGreen);
        listaDePokemons.style.left = "0px"
    }
}