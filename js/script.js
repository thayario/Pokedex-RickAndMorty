const personagemName = document.querySelector('.personagem_name')
const personagemId = document.querySelector('.personagem_id')
const personagemImage = document.querySelector('.personagem_image')
const notFound = document.querySelector('.notFound')

const form = document.querySelector('.form')
const input = document.querySelector('.input_search')

const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')



const fetchRickAndMorty = async (personagem) => {
    const APIResponse = await fetch(`https://rickandmortyapi.com/api/character/${personagem}`)
    
    if(APIResponse.status === 200) {
        const data = await APIResponse.json()
        return data
    }   
}

const renderPersonagem = async (personagem) => {

    personagemName.innerHTML = 'Loading...'
    personagemId.innerHTML = ''

    const data = await fetchRickAndMorty(personagem)
    
    if (data) {
        personagemImage.style.display = 'block'
        personagemName.innerHTML = data.name
        personagemId.innerHTML = data.id
        personagemImage.src = data.image
        input.value = ''
        searchPersonagem = data.id
    } else {
        personagemId.innerHTML = ''
        personagemName.innerHTML = 'Not found :c'

    }

}

form.addEventListener('submit', (event) => {

    event.preventDefault()

    renderPersonagem(input.value)

})

buttonPrev.addEventListener('click', () => {
    if (searchPersonagem > 1){
        searchPersonagem -= 1
        renderPersonagem(searchPersonagem)
    }
})

buttonNext.addEventListener('click', () => {
    searchPersonagem += 1
    renderPersonagem(searchPersonagem)
})

renderPersonagem(searchPersonagem)