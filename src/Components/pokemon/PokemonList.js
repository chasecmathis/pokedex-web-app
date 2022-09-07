import PokemonCard from './PokemonCard';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PokemonList() {
    const [url] = useState('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
    const [pokemon, setPokemon] = useState(null);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancel;
        axios.get(url, {
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setPokemon(res.data.results);
            setLoading(false);
        })

        return () => cancel();

    }, [url]);

    if (loading) return "Loading";

    return (
        <div>
            <div class="mx-auto" id="navbarSupportedContent">
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search by name..." aria-label="Search" onChange={e => setInput(e.target.value.toLowerCase())} />
                </form>
            </div>
            <div className='row'>
                {pokemon.filter(p => p.name.toLowerCase().includes(input))
                    .map((p) => (
                        <PokemonCard
                            name={p.name}
                            url={p.url}
                            key={p.name}
                        />
                    ))}
            </div>
        </div>
    )
}
