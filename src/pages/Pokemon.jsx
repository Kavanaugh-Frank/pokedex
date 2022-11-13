import { useParams, Link } from "react-router-dom";
import React from "react";
import Heading from "../components/header";
import Locations from "../components/locations";
import { useEffect, useState } from "react";
import styles from "../styles/Pokemon.module.css";

const Pokemon = () => {
  //gets the parameters from the routing
  const { pokemonName, index } = useParams();

  //since the index from the useParams is const we make a new var
  //that can be redefined equal to the index
  let newIndex = index;
  //the json data starts at 1 and not 0 like the array
  //used later to find the correct pokemon
  newIndex++;

  //takes the parameter from the route so we can use it

  //all the variables
  const [isLoading, setLoading] = useState(true);
  const [pokeTypes, setTypes] = useState([]);
  const [height, setHeight] = useState([]);
  const [weight, setWeight] = useState([]);
  const [stats, setStats] = useState([]);

  //the data from the JSON gets sent here where we choose what we want
  function getDataSet(data) {
    //the data of the pokemon
    setTypes(data.types);
    setHeight(data.height);
    setWeight(data.weight);
    setStats(data.stats);
    console.log(data)

    //this is the timer function that lets the info load
    setTimeout(() => {
      setLoading(false);
    }, 70);
  }
  useEffect(() => {
    const getPoke = async () => {
      await fetch(`https://pokeapi.co/api/v2/pokemon/${newIndex}/`)
        .then((res) => res.json())
        .then((data) => getDataSet(data))
        .catch((err) => console.log(err));
    };
    getPoke();
  }, []);

  //the code for the image changer
  //here is the code for the regular and shiny front sprite
  let imgSrc = [
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${newIndex}.png`,
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${newIndex}.png`,
  ];
  function img_change() {
    //grabs the image from the DOM
    let img = document.getElementById("pokeImage");
    let button = document.getElementById("imgButton");
    //if the src is equal to the regular (in terms of src)
    if (img.src === imgSrc[0]) {
      //switches to the shiny version
      img.src = imgSrc[1];
      button.innerHTML = "Regular";
    } else {
      //switches to the regular version
      img.src = imgSrc[0];
      button.innerHTML = "Shiny";
    }
  }

  //return a white screen until the setTimeOut timer is done
  if (isLoading) {
    return <div></div>;
  }

  return (
    <>
      <Heading name={`${pokemonName}`} subtext={`#${newIndex}`} />
      <Link className={`${styles.button}`} to="/">
        HOME
      </Link>
      <div className={`${styles.container}`}>
        {" "}
        {/* start of the container for the information */}
        <div className={`${styles.img_container}`}>
          <img
            id="pokeImage"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${newIndex}.png`}
            alt={pokemonName}
          ></img>
          <button className={`${styles.shiny_button}`}id="imgButton" onClick={img_change}>
            Shiny
          </button>
        </div>
        {/* the types container */}
        <div className={`${styles.types_container}`}>
          <p>TYPES</p>
          <div className={`${styles.types}`}>
            {/* map loop to name all the types the pokemon has */}
            {pokeTypes.map((pokeType, key) => (
              <p className={`${pokeType.type.name} type`} key={key}>{`${pokeType.type.name}`}</p>
            ))}
          </div>
        </div>
        {/* height and weight container */}
        <div className={`${styles.physicals}`}>
          {/* the height and weight are given without the decimal forms, here we change that */}
          <p>HEIGHT : {`${(height / 10).toFixed(1)}`} m</p>
          <p>WEIGHT : {`${(weight / 10).toFixed(1)}`} kgs</p>
        </div>
        {/* the stats container */}
        <div className={`${styles.stat_container}`}>
          {/* map loop to get the name and number value of each stat */}
          {stats.map((stat, key) => (
            <p key={`${key}`}>{`${stat.stat.name.toUpperCase()} : ${
              stat.base_stat
            }`}</p>
          ))}
        </div>
      </div>{" "}
      {/* end of the container for the information */}
      {/* component for the locations, the newIndex gives the component what pokemon we are looking for */}
      <Locations index={newIndex} />
    </>
  );
};

export default Pokemon;
