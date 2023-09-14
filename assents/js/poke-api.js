const pokeApi=[]

function convertPokeApiDetailToPokemon(PokemonDetail){
    const pokemon = new Pokemon()
    
    pokemon.number = PokemonDetail.id
    pokemon.name = PokemonDetail.name
    const types= PokemonDetail.types.map((typeSlot)=>typeSlot.type.name)
    const [type]= types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = PokemonDetail.sprites.other.dream_world.front_default
    
    return pokemon
}

pokeApi.getPokemonDetail= async (pokemon) =>{
    const response = await fetch(pokemon.url)
    return response.json()
        .then(convertPokeApiDetailToPokemon)
}
pokeApi.getPokemons =async (offset = 0, limit = 151)=>{
    const url=`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    return fetch(url)
        .then((response)=> response.json())
        .then((jsonBody)=> jsonBody.results)
        .then((pokemons)=>pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests)=>Promise.all(detailRequests))
        .then((pokemonsDetails)=>pokemonsDetails)
}

