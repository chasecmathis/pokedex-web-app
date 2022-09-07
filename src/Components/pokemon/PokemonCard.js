import React from 'react'
import { Link } from 'react-router-dom'

export default function PokemonCard(props) {

  const pokemonIndex = props.url.split('/')[6];
  const imageURL = `https://img.pokemondb.net/sprites/home/normal/${props.name}.png`

  return (
    <div className="col-md-2 col-sm-6 mt-2 mb-2">
      <Link to={`pokemon/${pokemonIndex}`} id="pokemon-link" >
        <div className="card">
          <h5 className="card-header">{pokemonIndex}</h5>
          <div className="card-body mx-auto">
            <img id="pokemon-image"
              alt="pokemon"
              className="card-img-top rounded mx-auto"
              src={imageURL}></img>
            <h5 className="card-title text-capitalize mt-3">{props.name}</h5>
          </div>
        </div>
      </Link>
    </div>
  )
}
