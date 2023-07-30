class Pokemon {
    id;
    name;
    types;
    attacks;

    constructor(pokemonInfos) {
        this.id = pokemonInfos.id;
        this.name = pokemonInfos.name;
        this.types = pokemonInfos.types.map(item => item.type.name)
        this.attacks = pokemonInfos.moves.map(item => item.move.name)
    }
}

function getPokemonInfo(idPokemon) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
        .then((response) => response.json())
}

async function getPokemon(id) {
    return new Pokemon(await getPokemonInfo(id));
}