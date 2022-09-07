import PokemonList from '../pokemon/PokemonList'
import React from 'react'

export default function Dashboard() {
  return (
      <div className="row">
        <div className="col">
          <PokemonList />
        </div>
      </div>
  )
}
