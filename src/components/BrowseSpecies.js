import React, { useState, useEffect } from 'react';
import SearchCharacter from './SearchCharacter';
import Species from './Species';
import CharacterDetails from './CharacterDetails';
import { listSpecies } from '../api/charactersAPI';
import styles from '../styles/Species.module.css';

/*
BrowseSpecies: This is intended for the user to be able to browse characters by species or search for a character by name

Features: 
    Search Bar: Allows users to search people by name
    Species List: Displays species (10/page) and their associated people
    Character Details: When a character is selected, displays the details of the character    

Future Enhancements: 
    Pagination upgrade: Build pagination component to eliminate repitition
    Pull selected character state from this component and use Context API or Redux to avoid prop drilling
*/

export default function BrowseSpecies(){
    const [speciesData, setSpeciesData] = useState([]);
    const [url, setUrl] = useState(undefined);
    const [selectedCharacter, setSelectedCharacter] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData(url){
            const data = await listSpecies(url);
            setSpeciesData(data);
            setIsLoading(false);
        };
        fetchData(url);
    }, [url]);

    // Returns a loading screen while useEffect runs and fetches data from API. 
    // In a larger application, this can be extracted to a custom useLoading hook to eliminate repitition
    if(isLoading){return <div className="loadingDiv">Loading...</div>};

    return(
        <div className={`${styles.main} ${selectedCharacter ? styles.grey : ""}`}>
            <div className={styles.search}>
                <SearchCharacter 
                    setSelectedCharacter={setSelectedCharacter}
                />
            </div>
            <div className={styles.list}>
                {speciesData.results.map((species, index) => (
                    <Species 
                        key={`${species.name}-${index}`}
                        species={species}
                        setSelectedCharacter={setSelectedCharacter}
                    />
                ))}
            </div>
            <div className={styles.pagination}>
                <button disabled={!speciesData.previous} className={styles.button} onClick={() => setUrl(speciesData.previous)}>Previous</button>
                <button disabled={!speciesData.next} className={styles.button} onClick={() => setUrl(speciesData.next)}>Next</button>
            </div>
            {/* Only display's a character's details if a character has been selected */}
            {selectedCharacter && <CharacterDetails charDetails={selectedCharacter} setSelectedCharacter={setSelectedCharacter}/>}      
        </div>
    );
};