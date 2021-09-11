import React from 'react';
import { toKebabCase } from '../utils/text-utils';
import styles from '../styles/CharacterDetails.module.css';

// Films loops through an array of films and returns the title and poster of each.

export default function Films({ films } ){
    if(!films){return <div>Loading...</div>};
    return(
        <div className={styles.films}>
            {films.map(film => (
                <div key={`Film-${film.title}`} className={styles.filmItem}>
                    {/* Alt text ommited as images are purely decorative */}
                    <img className={styles.filmImage} src={`/images/${toKebabCase(film.title)}.jpg`} alt=""/>
                    <p className={styles.filmTitle}>{film.title}</p>
                </div>
            ))}
        </div>
    );
};