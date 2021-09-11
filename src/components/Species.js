import React, {useState, useEffect} from 'react';
import { listCharacterBySpecies } from '../api/charactersAPI';
import CharacterList from './CharacterList';
import styles from '../styles/Species.module.css';

export default function Species({ species, setSelectedCharacter }){
    const [charList, setCharList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData(){
            const data = await listCharacterBySpecies(species.people);
            setCharList(data)
            setIsLoading(false);
        }
        fetchData();
    }, [species]);

    if(isLoading){return null};

    return(
        <>
            <h2 className={styles.title}>{species.name}</h2>
            <div>
                <CharacterList
                    key={`${species.name}`}
                    characters={charList}
                    setSelectedCharacter={setSelectedCharacter}
                />
            </div>
        </>
    );
};