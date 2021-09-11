import React from 'react';
import CharacterCard from './CharacterCard';
import styles from '../styles/Characters.module.css';

// CharacterList takes a list of characters and creates an individual character card for each.
// Passes setSelectedCharacter down to character card

export default function CharacterList({ characters, setSelectedCharacter }){
    return(
        <div className={styles.list}>
            {characters.map((char, i) => (
                <CharacterCard 
                    key={`${char.name}-${i}`}
                    character={char}
                    setSelectedCharacter={setSelectedCharacter}
                />
            ))}
        </div>
    );
};