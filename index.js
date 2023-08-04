document.addEventListener("DOMContentLoaded", () => {

    const locationBaseUrl = "https://rickandmortyapi.com/api/location";

    const fetchRandomLocation = async () => {
        const RandomNumber = Math.ceil(Math.random() * 126);
        const response = await fetch(`${locationBaseUrl}/${RandomNumber}`);
        const location = await response.json();
        return location;
    }
    const fetchCharactersUrl = async (url) => {
        const response = await fetch(url);
        const characters = await response.json();
        return characters;
    }
    const createCharacters = (characters) => {
        let charactersContainer = document.getElementById('characters');
        
        characters.forEach(character => {
            
            const characterCard = document.createElement('div');
            characterCard.classList.add('card', 'col-12', 'col-md-4','col-lg-3', 'm-3', 'p-3');
            const characterCardBody = document.createElement('div');
            characterCardBody.classList.add('card-body');
            characterCard.innerHTML=` <img src="${character.image}" class="character-img"/>`;
            characterCardBody.innerHTML=`                        
                <p class="info-paragraph"><strong>Name:</strong> ${character.name}</p>
                <p class="info-paragraph"><strong>Status:</strong> ${character.status}</p>
                <p class="info-paragraph"><strong>Specie:</strong> ${character.species}</p>
                <p class="info-paragraph"><strong>Origin:</strong> ${character.origin.name}</p>
                <h6>Episodes</h2>
                `
                
            charactersContainer.appendChild(characterCard);
            characterCard.appendChild(characterCardBody);    
            if(character.episode.length > 0) {
                character.episode.forEach(episode => {
                    let episodeParagraph = document.createElement('p');
                    episodeParagraph.innerHTML= `${episode}`;
                    characterCardBody.appendChild(episodeParagraph);
                })
            }
        })
    }
    const main = async () => {
        let location = await fetchRandomLocation();
        let residents = [];
        const mainContent = document.getElementById('main');
        if (location.id < 50 ) {
            mainContent.classList.add('background-green');
        }
        if(location.id > 50 && location.id <80 ) {
            mainContent.classList.add('background-blue');
        }
        if(location.id > 80) {
            mainContent.classList.add('background-red');
        }
        if (location.residents.length === 0) {
            let message = document.createElement('p');
            message.classList.add('alert', 'alert-warning');
            let messageDiv = document.getElementById('message');
            message.innerHTML = 'This location has no residents';
            messageDiv.appendChild(message);
            return;
        }
        if (location.residents.length > 5) {
            residents = location.residents.slice(0, 5);
        } else {
            residents = location.residents;
        }
        const promises = residents.map(resident => fetchCharactersUrl(resident));
        const characters = await Promise.all(promises);
        createCharacters(characters);
    }
    main();

});