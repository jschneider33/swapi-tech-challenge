import axios from 'axios';

const baseUrl = 'https://swapi.dev/api';

// Returns data from any single URL (string)
export async function getDetail(url){
    const result = await axios(url);
    return result.data;
};

// Returns either an array of details, or a single object of details depending on the parameter
// Intended for dynamic fetching of an unknown number of params (>0)
export async function getDetails(urlList){
    if(Array.isArray(urlList)){
        return Promise.all(urlList.map(url => getDetail(url)));
    } else {
        return await getDetail(urlList);
        // return result;
    };
};

// Returns a list of species, default pagination of 10 results/call
export async function listSpecies(url = `${baseUrl}/species`){
    const result = await axios(url);
    return result.data;
}

// Returns details of an array of people
export async function listCharacterBySpecies(characterUrlList){
    return Promise.all(characterUrlList.map(charUrl => getDetail(charUrl)));
}

// Returns array of people from a search term
export async function getCharacterBySearch(searchTerm){
    const result = await axios(`${baseUrl}/people/?search=${searchTerm}`)
    return result.data;
}