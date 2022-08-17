import React, { FunctionComponent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Pokemon from '../models/pokemon';
import './pokemon-card.css'
import formatDate from '../helpers/format-date'
import formatType from '../helpers/format-type'

type Props = {
    pokemon: Pokemon
    borderColor?: string
};

const PokemonCard: FunctionComponent<Props> = ({ pokemon, borderColor = '#009688' }) => {

    const [color, setColor] = useState<string>();
    const history = useHistory();

    const showborder = () => {
        setColor(borderColor);
    }

    //permet de remettre la bordure en grise
    const hideborder = () => {
        setColor('#f5f5f5');
    }

    // Affichage du pokemon cliqué
    const goToPokemon = (id: number) => {
        history.push(`/pokemons/${id}`);
    }


    return (
        <div className="col s6 m4"
            onClick={() => goToPokemon(pokemon.id)} // Affichage du pokemon cliqué
            onMouseEnter={showborder}
            onMouseLeave={hideborder}>
            <div className="card horizontal" style={{ borderColor: color }}>
                <div className="card-image">
                    <img src={pokemon.picture} alt={pokemon.name} />
                </div>
                <div className="card-stacked">
                    <div className="card-content">
                        <p>{pokemon.name}</p>
                        {/* format de la date  */}
                        <p><small>{formatDate(pokemon.created)}</small></p>
                        {pokemon.types.map(type => (
                            <span key={type} className={formatType(type)}>{type}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PokemonCard;