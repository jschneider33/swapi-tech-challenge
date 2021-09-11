import React from 'react';
import styles from '../styles/Characters.module.css';

/*
Creates a character card for each character in a character list

Name is displayed, other attributes can quickly be added/removed as necessary

When a card is selected, udpates setSelectedCharacter and displays CharacterDetails
*/

export default function CharacterCard({ character, setSelectedCharacter }){
    return(
        <div className={styles.card}>
            <h3 className={styles.name}>
                <button className={styles.charButton} onClick={() => setSelectedCharacter(character)}>{character.name}</button>
            </h3>
        </div>
    );
};