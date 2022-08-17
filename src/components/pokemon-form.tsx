import React, { FunctionComponent, useState } from 'react';
import Pokemon from '../models/pokemon';
import formatType from '../helpers/format-type';

type Props = {
    pokemon: Pokemon
};

type Field = {
    value: any,
    error?: string,
    isValid?: boolean
}

type Form = {
    name: Field,
    hp: Field,
    cp: Field,
    types: Field,
}

const PokemonForm: FunctionComponent<Props> = ({ pokemon }) => {

    const [form, setForm] = useState<Form>({
        name: { value: pokemon.name, isValid: true },
        hp: { value: pokemon.hp, isValid: true },
        cp: { value: pokemon.cp, isValid: true },
        types: { value: pokemon.types, isValid: true },
    });

    const types: string[] = [
        'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
        'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
    ];

    // fonction pour recuperer et cocher le type du pokemon
    const hasType = (type: string): boolean => {
        return form.types.value.includes(type);
    }

    // fonction de récuperation des changements de données d'un pokemon
    const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName: string = evt.target.name;
        const fieldValue: string = evt.target.value;
        const newField: Field = {
            [fieldName]: { value: fieldValue },
            value: undefined
        };

        setForm({ ...form, ...newField });
    }

    // fonction de modification du type du pokemon
    const selectType = (type:string, evt: React.ChangeEvent<HTMLInputElement>): void => {
        const cheked = evt.target.checked;
        let newField: Field;

        if(cheked) {
            // si l'utilisateur coche un type, et l'ajoute à la liste du pokemon
            const newTypes: string[] = form.types.value.concat([type]);
            newField = { value: newTypes };
        }
        else {
            // si l'utilisateur décoche un type, on le retire de la liste du pokemon
            const newTypes: string[] = form.types.value.filter((currentType: string) => currentType !== type);
            newField = { value: newTypes };
        }

        setForm({...form, ...{ types: newField }})
    }

    return (
        <form>
            <div className="row">
                <div className="col s12 m8 offset-m2">
                    <div className="card hoverable">
                        <div className="card-image">
                            <img src={pokemon.picture} alt={pokemon.name} style={{ width: '250px', margin: '0 auto' }} />
                        </div>
                        <div className="card-stacked">
                            <div className="card-content">

                                {/* Pokemon name */}
                                <div className="form-group">
                                    <label htmlFor="name">Nom</label>
                                    <input 
                                        id="name"
                                        name='name'
                                        type="text"
                                        className="form-control"
                                        value={form.name.value}
                                        onChange={evt => handleInputChange(evt)}>
                                    </input>
                                </div>

                                {/* Pokemon hp */}
                                <div className="form-group">
                                    <label htmlFor="hp">Point de vie</label>
                                    <input 
                                        id="hp"
                                        name='hp'
                                        type="number"
                                        className="form-control"
                                        value={form.hp.value}
                                        onChange={evt => handleInputChange(evt)}>
                                    </input>
                                </div>

                                {/* Pokemon cp */}
                                <div className="form-group">
                                    <label htmlFor="cp">Dégâts</label>
                                    <input
                                        id="cp"
                                        name='cp'
                                        type="number"
                                        className="form-control"
                                        value={form.cp.value}
                                        onChange={evt => handleInputChange(evt)}>
                                    </input>
                                </div>
                                {/* Pokemon types */}
                                <div className="form-group">
                                    <label>Types</label>
                                    {types.map(type => (
                                        <div key={type} style={{ marginBottom: '10px' }}>
                                            <label>
                                                <input id={type}
                                                    type="checkbox"
                                                    className="filled-in"
                                                    value={type}
                                                    //fonction pour recuperer et cocher le type du pokemon
                                                    checked={hasType(type)}
                                                    onChange={evt => selectType(type, evt)}>
                                                    </input>
                                                <span>
                                                    <p className={formatType(type)}>{type}</p>
                                                </span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="card-action center">
                                {/* Submit button */}
                                <button type="submit" className="btn">Valider</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PokemonForm;