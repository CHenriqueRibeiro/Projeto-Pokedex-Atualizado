function ligarDisplay(display, ledRed) {
    display.removeAttribute("class");
    display.setAttribute("class", "display powerOn")
    ledRed.removeAttribute("class");
    ledRed.setAttribute("class", "led red ledRedOn")
}
function desligarDisplay(display, ledRed, listaDePokemons) {
    display.removeAttribute("class");
    display.setAttribute("class", "display powerOff")
    ledRed.removeAttribute("class");
    ledRed.setAttribute("class", "led red")
    listaDePokemons.style.left = '0px'
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

function atualizarDisplayDir(infos, linhasDescricao) {
    linhasDescricao[0].innerHTML = `#${infos.id}`
    linhasDescricao[1].innerHTML = `Nome : ${infos.name}`
    linhasDescricao[2].innerHTML = `Tipo : ${(infos.types.map(item => item.type.name)).join(', ')}`
    linhasDescricao[3].innerHTML = `Ataques: <ul> ${(infos.moves.map(item => `<li>${item.move.name}</li>`)).join('')}</ul>`
}


window.onload = async function () {
    let listaPokemons = []
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
    let linhasDescricao = document.querySelectorAll('.descriptionPoke>div')

    for (let i = 0; i < 649; i++) {
        listaPokemons.push({
            id: i + 1,
            url: `/pokemons/poke_${i + 1}.gif`,
            position: i * 370
        });
    }

    let pokemons = listaPokemons.map(objPokemon => {
        return `<div class="pokeWrapper"><img src="${objPokemon.url}"></div>`
    });

    let positionDisplayDir = 0
    let speedDisplay = 25

    btnBai.onclick = function () {
        piscaVerde(ledGreen);

        let alturaComPx = (window.getComputedStyle(descriptionPoke)).getPropertyValue('height')
        let alturaSemPx = (parseFloat(alturaComPx.substring(0, alturaComPx.length - 2)) * - 1) + 120

        if (positionDisplayDir <= alturaSemPx) {
            positionDisplayDir = alturaSemPx
        } else {
            positionDisplayDir = positionDisplayDir - speedDisplay
        }
        descriptionPoke.style.top = positionDisplayDir + 'px'
    }


    btnCim.onclick = function () {
        piscaVerde(ledGreen);

        if (positionDisplayDir < 0 && (positionDisplayDir + speedDisplay) <= 0) {
            positionDisplayDir = positionDisplayDir + speedDisplay
            descriptionPoke.style.top = positionDisplayDir + 'px'
        }

    }

    btnPower.onclick = async function () {
        let displayClass = display.getAttribute("class")
        let displayState = displayClass.split(' ')[1]
        let descriptionPokeClass = descriptionPoke.getAttribute("class")
        let descriptionPokeState = descriptionPokeClass.split(' ')[1]
        let bulbassaur = await getPokemon(1)
        piscaVerde(ledGreen);

        linhasDescricao[0].innerHTML = `#${bulbassaur.id}`
        linhasDescricao[1].innerHTML = `Nome : ${bulbassaur.name}`
        linhasDescricao[2].innerHTML = `Tipo : ${bulbassaur.types.join(', ')}`
        linhasDescricao[3].innerHTML = `Ataques: <ul> ${(bulbassaur.attacks.map(attack => `<li>${attack}</li>`)).join('')}</ul>`


        if (displayState == "powerOff") {
            ligarDisplay(display, ledRed)
            ligarDescriptionPoke(descriptionPoke, ledRed)
        } else {
            desligarDisplay(display, ledRed, listaDePokemons)
            desligarDescriptionPoke(descriptionPoke, ledRed)
        }
    }

    let pokemonAtual = 1

    listaDePokemons.innerHTML = pokemons.join('')
    let positionValue = 0;


    btnEsq.onclick = async function () {
        piscaVerde(ledGreen);

        if (positionValue > 0) {
            positionValue--
        } else {
            positionValue = 648
        }

        let pokemonInfo = await getPokemonInfo(listaPokemons[positionValue].id)

        atualizarDisplayDir(pokemonInfo, linhasDescricao)

        listaDePokemons.style.left = (listaPokemons[positionValue].position * -1) + 'px'
    }

    btnDir.onclick = async function () {
        piscaVerde(ledGreen);

        if (positionValue === 648)
            positionValue = 0
        else
            positionValue++

        let pokemonInfo = await getPokemonInfo(listaPokemons[positionValue].id)

        atualizarDisplayDir(pokemonInfo, linhasDescricao)

        listaDePokemons.style.left = (listaPokemons[positionValue].position * -1) + 'px'
    }

    btnReset.onclick = async function () {
        piscaVerde(ledGreen);
        listaDePokemons.style.left = "0px"
        positionValue = 0
        let pokemonInfo = await getPokemonInfo(listaPokemons[positionValue].id)

        atualizarDisplayDir(pokemonInfo, linhasDescricao)
    }
}