
interface IapiResponse {
    results: Icharacter[];
}

interface Icharacter {
    name: string;
    phrases: string[];
    portrait_path: string;
}

// Constantes y elementos del DOM 
const baseUrl = "https://thesimpsonsapi.com/api/characters";
const baseImageUrl = "https://cdn.thesimpsonsapi.com/500";

const loadBtn = document.getElementById("load-btn") as HTMLButtonElement;
const loadingContainer = document.getElementById("loading") as HTMLDivElement;
const errorContainer = document.getElementById("error") as HTMLDivElement;
const charactersContainer = document.getElementById("characters-container") as HTMLDivElement;


const showLoading = (): void => {
    // Mostrar el contenedor de loading
    loadingContainer.classList.remove("hidden");

}

const hideLoading = (): void => {
    // Ocultar el contenedor de loading
    loadingContainer.classList.add("hidden");
    console.log("Loading oculto");
}

const showError = (message: string): void => {
    // Mostrar el contenedor de error
    errorContainer.classList.remove("hidden");

    // Mostrar el mensaje de error
    errorContainer.textContent = message;

    // Ocultar el contenedor de error despues de 5 segundos
    setTimeout(() => {
        errorContainer.classList.add("hidden");
        }, 5000);
}

const createCharacterCard = (character: Icharacter): HTMLDivElement => {
    // Crear el contenedor de personaje
    const characterCard = document.createElement("div");
    characterCard.classList.add("character-card");

    // Crear el contenedor de imagen
    const characterImage = document.createElement("img");
    characterImage.src = `${baseImageUrl}${character.portrait_path}`;    

    //crear el h3 de nombre
    const characterName = document.createElement("h3");
    characterName.textContent = character.name;

    //crear el p de frase
    const characterPhrase = document.createElement("p");

    //Busca la primera frase que tenga menos de 100 caracteres
    const shortPhrase = character.phrases.find(phrase => phrase.length < 100);
    
    //si no hay ninguna frase que cumpla la condicion, muestra "Sin frase disponible"
    characterPhrase.textContent = shortPhrase ? shortPhrase : "Sin frase disponible";

    characterCard.appendChild(characterImage);
    characterCard.appendChild(characterName);
    characterCard.appendChild(characterPhrase);


    return characterCard;
}

const renderCharacters = (characters: Icharacter[]): void => {
    // remover caracteres existentes
    charactersContainer.innerHTML = "";
    // crear los personajes
    characters.forEach(character => {
        const characterCard = createCharacterCard(character);
        charactersContainer.appendChild(characterCard);
    });

    
}

const fetchCharacters = async (): Promise<void> => {
    try{
        console.log("Iniciando fetch de personajes");
        showLoading();
        console.log("Accediendo Api de Los Simpsons");
        const response = await fetch(baseUrl);
        if(!response.ok){
            console.error("Error en la respuesta de la API");
            throw new Error("Error al obtener los personajes");
        }
        const data:IapiResponse = await response.json();
        renderCharacters(data.results);
        console.log("Personajes obtenidos");
    }catch(error){
        //verficar si el error es una instancia de Error
        const errorMessage = error instanceof Error ? error.message : "Error desconocido";
        console.error("ERROR al obtener los personajes", error);
        showError(`Error al obtener los personajes: ${errorMessage}`);
    }finally{
        hideLoading();
        console.log("Fetch de personajes finalizado");
    }
}; 

loadBtn.addEventListener("click", fetchCharacters);

const main = async (): Promise<void> => {
    console.info("Arrancando la aplicación");
};


main();