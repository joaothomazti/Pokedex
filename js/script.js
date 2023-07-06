const namePokemon = document.querySelector('.name-pokemon');
const idPokemon = document.querySelector('.id-pokemon');
const imgPokemon = document.querySelector('.image-pokemon')

const form = document.querySelector('.form')
const searchPokemon = document.querySelector('.procurar-pokemon')
const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')

let initialize = 1;
const informationError = document.querySelector('.error-message');

const fechPokemon = async (pokemon) => {
    try {
        const APIPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        if (APIPokemon.status === 200) {
            const data = await APIPokemon.json();
            return data;
        } else {
            throw new Error('O Pokémon não foi encontrado.');
        }
    } catch (err) {
        informationError.textContent = "O Pokémon não foi encontrado"
        console.log("Erro: " + err);
    }


}

const renderPokemon = async (pokemon) => {

    try {
        const data = await fechPokemon(pokemon)

        if (data) {
            imgPokemon.style.display = 'block'
            namePokemon.innerHTML = data.name
            idPokemon.innerHTML = data.id
            imgPokemon.src = data.sprites.versions['generation-v']['black-white'].animated['front_default']

            searchPokemon.value = ''
            initialize = data.id

            //limpa a mensagem de error
            informationError.textContent = ''
        } else {
            namePokemon.innerHTML = 'not found';
            idPokemon.innerHTML = ''
            imgPokemon.style.display = 'none'
            searchPokemon.value = ''
        }
    } catch (error) {
        console.log("Erro: " + error)
    }

}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const validSearch = searchPokemon.value.toLowerCase().trim();

    if (validSearch !== '') {
        renderPokemon(validSearch);
    }

})

btnPrev.addEventListener('click', () => {

    if (initialize > 1) {
        initialize -= 1
        renderPokemon(initialize)
    }
})

btnNext.addEventListener('click', () => {

    if (initialize < 1010) {
        initialize += 1
        renderPokemon(initialize)
    }

})


renderPokemon(initialize)
