import React from 'react';
import styles from '../styles/CharacterDetails.module.css';

// ListDetails loops through an array of items and returns the name of each.
// Items must have a name attribute (e.g. "Vehicles")

export default function ListDetails({ items }){
    if(!items){return <div>Loading...</div>};
    return(
        <div className={styles.listDetails}>
            {items.map(item => (
                <div key={`Listitem-${item.name}`}>{item.name}</div>
            ))}
        </div>
    );
};