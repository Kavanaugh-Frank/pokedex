import React from "react";
import { useEffect, useState } from "react";
import styles from "../styles/Pokemon.module.css";
export default function Locations(props) {
  const [locations, setLocations] = useState([]);

  function getDataSet(data) {
    setLocations(data);
  }

  useEffect(() => {
    const getLocations = async () => {
      await fetch(
        `https://pokeapi.co/api/v2/pokemon/${props.index}/encounters/`
      )
        .then((res) => res.json())
        .then((data) => getDataSet(data))
        .catch((err) => console.log(err));
    };
    getLocations();
  }, []);

  //checks to see if there are any locations in the wild the pokemon is found
  if (locations.length > 0) {
    return (
      <div className={styles.container}>
        <div className={`${styles.location_container}`}>
          <div className={`${styles.location_header}`}>LOCATIONS FOUND</div>
          <div>
            {locations.map((part, key) => (
              <div
                className={`${styles.location}`}
                key={key}
              >{`${part.location_area.name.replaceAll("-", " ")}`}</div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <div className={`${styles.location_container}`}>
          <div className={`${styles.location_header}`}>LOCATIONS FOUND</div>
          <div className={`${styles.location}`}>Not found in the wild</div>
        </div>
      </div>
    );
  }
}
