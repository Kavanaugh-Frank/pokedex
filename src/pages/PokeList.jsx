import React, { useEffect, useState } from "react";
import styles from "../styles/Pokelist.module.css";
import { Link } from "react-router-dom";
import Heading from "../components/header";


export default function pokeList() {
  const [isLoading, setLoading] = useState(true);
  const [pokeList, setPokelist] = useState([]);

  useEffect(() => {
    const getPokeList = async () => {
      await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
        .then((res) => res.json())
        .then((data) => setPokelist(data.results) ,setTimeout(() =>{setLoading(false)},75))
        .catch((err) => console.log(err));
    };
    getPokeList();
  }, []);
  if (isLoading) {
    return (
      <div></div>
    )
  }
  return (
    <>
      <Heading name="Pokedex" subtext="Kavanaugh" />
      <div className={`${styles.container}`}>
        {pokeList.map((pokemon, idx) => (
          <div key={idx} className={`${styles.item}`} id={idx}>
            <div className={`${styles.outer}`}>
              <p className={`${styles.nameStyle}`}>{`${pokemon.name} #${idx + 1}`}</p>
              <p>
                <Link to={`/${pokemon.name.toUpperCase()}/${idx}`}>
                  <img className={`${styles.pokeImage}`} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idx + 1}.png`} alt={pokemon.name}
                  ></img>
                </Link>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
