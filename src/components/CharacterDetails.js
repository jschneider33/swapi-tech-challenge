import React, { useState, useEffect } from 'react';
import { getDetails } from '../api/charactersAPI';
import Films from './Films';
import ListDetails from './ListDetails';
import styles from '../styles/CharacterDetails.module.css';

/*
When a character is selected, calls SWAPI for details on homeworld, films, vehicles, and starships

Then displays all character details in fixed sidebar

Enhancements: 
    - Add animation for sliding right and left when clicked
*/

export default function CharacterDetails({ charDetails, setSelectedCharacter }){
    const [homeworld, setHomeworld] = useState('');
    const [films, setFilms] = useState('');
    const [vehicles, setVehicles] = useState('');
    const [starships, setStarships] = useState('');
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData(charDetails){
            const homeworldData = await getDetails(charDetails.homeworld);
            setHomeworld(homeworldData);

            const filmsData = await getDetails(charDetails.films);
            setFilms(filmsData);
            
            if(charDetails.vehicles.length > 0){
                const vehiclesData = await getDetails(charDetails.vehicles);
                setVehicles(vehiclesData);
            } else {setVehicles(null)};
            if(charDetails.starships.length > 0){
                const starshipsData = await getDetails(charDetails.starships);
                setStarships(starshipsData);
            } else {setStarships(null)};
        };
        fetchData(charDetails);
        setLoading(false);
    }, [charDetails]);


    // This is a little ugly, but was a quick fix to modifying the different detials for each trait
    function modifyDetails(trait, detail){
        const modifiedTrait = trait.replace("_", " ").toUpperCase();
        let modifiedDetail = '';
        switch(trait){
            case "homeworld":
                modifiedDetail = homeworld.name;
                break;
            case "height":
                modifiedDetail = detail+"cm";
                break;
            case "mass":
                if(detail === "unknown"){
                    modifiedDetail = detail;
                } else {
                    modifiedDetail = detail+"kg";
                };
                break;
            case "vehicles":
                modifiedDetail = vehicles ? <ListDetails items={vehicles} /> : "None";
                break;
            case "starships":
                modifiedDetail = starships ? <ListDetails items={starships} /> : "None";
                break;
            case "films":
                modifiedDetail = <Films films={films}/>;
                break;
            case "created":
                return null;
            case "edited": 
                return null;
            case "url":
                return null;
            case "species":
                return null;
            default: 
                modifiedDetail = detail;
        };
        return (
            <div><span className={styles.trait}>{modifiedTrait}: </span><span className={styles.description}>{modifiedDetail}</span></div>
        );
    };

    if(isLoading){return <div>Loading...</div>};

    return(
        <div className={styles.details}>
            <button className={styles.button} onClick={() => setSelectedCharacter('')}>{`<-- Back to all characters`}</button>
            <h3 className={styles.title}>{charDetails.name}</h3>
            {Object.entries(charDetails).map(([trait, detail]) => (
                <div key={`CharTrait-${trait}`} className={styles.info}>
                    {modifyDetails(trait, detail)}
                </div>
            ))}
        </div>
    );
};