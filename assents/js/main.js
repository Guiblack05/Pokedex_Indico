const maxRecords = 151
let offset = 0
const limit = 5
const url=`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
const pokemonList = document.getElementById('pokemonList')
const pokemons = []
const loadMoreButton = document.getElementById('loadMoreButton')


function loadPokemonItens(offset, limit){
    function convertPokemonToLi(pokemon){
        return`
            <li class="pokemon ${pokemon.type}" > 
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                
                <div class="detail">
                    <ol class="types">
                      ${pokemon.types.map((type)=>`<li class="type ${type}">${type}</li>`).join('')}
                    </ol>              
                    <img src="${pokemon.photo}" alt="${pokemon.name}"/>
                </div>
            </li>
            ` 
    }
    pokeApi.getPokemons(offset, limit).then((pokemons)=>{
        pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')
       
       })
}     

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', ()=>{
    offset += limit 
    const  qtdRecordNextPage = offset +limit

    if(qtdRecordNextPage >= maxRecords){
        const  newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        
        loadMoreButton.parentElement.removeChild(loadMoreButton)

    }else{
    loadPokemonItens(offset, limit)
    }
})
     
