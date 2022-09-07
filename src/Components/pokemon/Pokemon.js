import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'

const TYPE_COLORS = {
    bug: 'B1C12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B1F4',
    fighting: '823551D',
    fire: 'E73B0C',
    flying: 'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground: 'D3B357',
    ice: 'A3E7FD',
    normal: 'A3E7FD',
    poison: '934594',
    psychic: 'ED4882',
    rock: 'B9A156',
    steel: 'B5B5C3',
    water: '3295F6'
}

export default function Pokemon() {

    const params = useParams();

    const [name, setName] = useState("");
    const [pokemonIndex, setPokemonIndex] = useState();
    const [pokemonImage, setPokemonImage] = useState("");
    const [types, setTypes] = useState([]);
    const [abilities, setAbilities] = useState([])
    const [description, setDescription] = useState("");
    const [stats, setStats] = useState({});
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();


    const getPokemon = async () => {
        setPokemonIndex(params.pokemonIndex);

        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`;
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}`;

        let { hp, attack, defense, specialAttack, specialDefense, speed } = "";

        await axios.get(pokemonUrl).then((res) => {
            setName(res.data.name);
            setPokemonImage(res.data.sprites.front_default);
            // convert to ft
            setHeight(Math.round(((res.data.height * 0.328084) + Number.EPSILON) * 100) / 100);
            // conver to lbs
            setWeight(Math.round(((res.data.weight * 0.220462) + Number.EPSILON) * 100) / 100);
            setTypes(res.data.types.map(type => type.type.name));
            setAbilities(res.data.abilities.map(ability => ability.ability.name));

            res.data.stats.map(stat => {
                switch (stat.stat.name) {
                    case "hp":
                        hp = stat['base_stat']
                        break;
                    case "attack":
                        attack = stat['base_stat']
                        break;
                    case "defense":
                        defense = stat['base_stat']
                        break;
                    case "special-attack":
                        specialAttack = stat['base_stat']
                        break;
                    case "special-defense":
                        specialDefense = stat['base_stat']
                        break;
                    case "speed":
                        speed = stat['base_stat']
                        break;
                }
                return;
            })


            setStats({ hp, attack, defense, specialAttack, specialDefense, speed });
        })

        await axios.get(pokemonSpeciesUrl).then(res => {
            res.data.flavor_text_entries.some(flavor => {
                if (flavor.language.name === "en") {
                    setDescription(flavor.flavor_text);
                    return;
                }
            })
        })
    }

    useEffect(() => {
        getPokemon();
    }, [name, pokemonIndex, pokemonImage])

    const selectColor = (num) => {
        if (num < 50) return "#E55451";
        else if (num < 100) return "#DEE10E";
        else if (num < 150) return "#98FF98";
        else return "#7BCCB5";
    }

    return (
        <div className='col mt-3'>
            <div className='card'>
                <div className='card-header'>
                    <div className='row text-capitalize'>
                        <div className='col-5'>
                            <h2>{pokemonIndex}</h2>
                        </div>
                        <div className='col-7'>
                            <div className='float-end'>
                                {types.map(type => (
                                    <span key={type}
                                        className="badge badge-pill mx-1 mt-2 text-light fs-5"
                                        style={{ backgroundColor: `#${TYPE_COLORS[type]}`}}>{type}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card-body'>
                    <div className='row align-items-center'>
                        <div className='col-md-2'>
                            <img src={pokemonImage} alt="Pokemon" className="card-img-top rounded mx-auto mt-2" />
                        </div>
                        <div className="col-md-9" >
                            <h2 className='mx-auto text-capitalize'>{name}</h2>
                            <div className='row align-items-center'>
                                <div className='col-12 col-md-5'>HP</div>
                                <div className="col-12 col-md-9">
                                    <div className='progress'>
                                        <div className='progress-bar'
                                            role="progressbar"
                                            style={{
                                                width: `${stats.hp}%`,
                                                backgroundColor: `${selectColor(stats.hp)}`
                                            }}
                                            area-valuenow="25"
                                            area-valuemin="0"
                                            area-valuemax="100">
                                            <small>{stats.hp}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row align-items-center'>
                                <div className='col-12 col-md-5'>Attack</div>
                                <div className="col-12 col-md-9">
                                    <div className='progress'>
                                        <div className='progress-bar'
                                            role="progressbar"
                                            style={{
                                                width: `${stats.attack}%`,
                                                backgroundColor: `${selectColor(stats.attack)}`
                                            }}
                                            area-valuenow="25"
                                            area-valuemin="0"
                                            area-valuemax="100">
                                            <small>{stats.attack}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row align-items-center'>
                                <div className='col-12 col-md-5'>Defense</div>
                                <div className="col-12 col-md-9">
                                    <div className='progress'>
                                        <div className='progress-bar'
                                            role="progressbar"
                                            style={{
                                                width: `${stats.defense}%`,
                                                backgroundColor: `${selectColor(stats.defense)}`
                                            }}
                                            area-valuenow="25"
                                            area-valuemin="0"
                                            area-valuemax="100">
                                            <small>{stats.defense}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row align-items-center'>
                                <div className='col-12 col-md-5'>Special Attack</div>
                                <div className="col-12 col-md-9">
                                    <div className='progress'>
                                        <div className='progress-bar'
                                            role="progressbar"
                                            style={{
                                                width: `${stats.specialAttack}%`,
                                                backgroundColor: `${selectColor(stats.specialAttack)}`
                                            }}
                                            area-valuenow="25"
                                            area-valuemin="0"
                                            area-valuemax="100">
                                            <small>{stats.specialAttack}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row align-items-center'>
                                <div className='col-12 col-md-5'>Special Defense</div>
                                <div className="col-12 col-md-9">
                                    <div className='progress'>
                                        <div className='progress-bar'
                                            role="progressbar"
                                            style={{
                                                width: `${stats.specialDefense}%`,
                                                backgroundColor: `${selectColor(stats.specialDefense)}`
                                            }}
                                            area-valuenow="25"
                                            area-valuemin="0"
                                            area-valuemax="100">
                                            <small>{stats.specialDefense}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row align-items-center'>
                                <div className='col-12 col-md-5'>Speed</div>
                                <div className="col-12 col-md-9">
                                    <div className='progress'>
                                        <div className='progress-bar'
                                            role="progressbar"
                                            style={{
                                                width: `${stats.speed}%`,
                                                backgroundColor: `${selectColor(stats.speed)}`
                                            }}
                                            area-valuenow="25"
                                            area-valuemin="0"
                                            area-valuemax="100">
                                            <small>{stats.speed}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-5'>
                            <div className="col text-center">
                                <p className="p-2">{description}</p>
                            </div>
                        </div> 
                    </div>
                    <hr />
                    <div className="card-title text-center">
                        <h3>Profile</h3>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5 className="float-end">Height: </h5>
                                    </div>
                                    <div className="col-md-6">
                                        <h5 className="float-start">{height} ft.</h5>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5 className="float-end">Weight: </h5>
                                    </div>
                                    <div className="col-md-6">
                                        <h5 className="float-start">{weight} lbs.</h5>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5 className="float-end">Abilities: </h5>
                                    </div>
                                    <div className="col-md-6 text-capitalize">
                                        <h5 className="float-start">{abilities.map(ability => (
                                            `${ability} `
                                        ))}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
                <div className='card-footer text-muted text-center'>
                    Data from <a href="https://pokeapi.co" target="_blank" rel="noreferrer" className="card-link link-secondary">PokeAPI</a>
                </div>
            </div>
        </div>
    )
}
