import React, { useState } from 'react';
import { getCharacterBySearch, getDetail, getDetails } from '../api/charactersAPI';
import CharacterList from './CharacterList';
import styles from '../styles/Species.module.css';

// SearchCharacter allows a user to search for a character based on their name. 
// Can be expanded to search based on other factors as well so long as SWAPI has endpoints.

export default function SearchCharacter({ setSelectedCharacter }){
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState({
        next: null,
        data: [],
        count: 0
    });
    // const [next, setNext] = useState(null);

    async function searchCharacter(e){
        e.preventDefault();
        const result = await getCharacterBySearch(searchTerm);
        setSearchResults({ ...searchResults, data: result.results, next: result.next, count: result.count });
    };

    async function loadMoreCharacters(url){
        const result = await getDetails(url);
        const updatedResults = searchResults.data.concat(result.results);
        let updatedNext = '';
        if(result.next === url){
            updatedNext = null;
        } else {
            updatedNext = result.next ;
        }
        setSearchResults({ ...searchResults, data: updatedResults, next: updatedNext });
    }

    // console.log(searchResults)

    return(
        <div className={styles.search}>
            <form className={styles.searchFrom} onSubmit={searchCharacter}>
                <input 
                    type="text"
                    value={searchTerm}
                    name="searchTerm"
                    className={styles.searchInput}
                    onChange={(e) => {
                            if(e.target.value === ''){setSearchResults({ ...searchResults, data: []})};
                            setSearchTerm(e.target.value);
                        }}
                    placeholder="e.g. Luke Skywalker"
                />
                <button className={styles.searchButton} type="submit">Search</button>
            </form>

            {/* If there is a search result, display the characters that are returned, otherwise don't render */}
            {(searchResults.data.length > 0 && searchTerm) && 
                <div>
                    <h2 className={styles.title}>Search Results:</h2>
                    <p className={styles.subTitle}>Found {searchResults.count} characters</p>
                    <CharacterList characters={searchResults.data} setSelectedCharacter={setSelectedCharacter}  />
                    {searchResults.next && <button className={styles.loadMoreButton} onClick={() => loadMoreCharacters(searchResults.next)}>Load more</button>}
                </div>
            }
        </div>
    );
};