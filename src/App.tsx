import React, { FunctionComponent } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PokemonList from './pages/pokemon-list';
import PokemonDetail from './pages/pokemon-detail';
import PageNotFound from './pages/page-not-found'
import PokemonEdit from './pages/pokemon-edit'

const App: FunctionComponent = () => {


  return (
    <Router>
      <div>
        {/* la barre de navigation commun à toutes les pages */}
        <nav>
          <div className="nav-wrapper teal">
            <Link to="/" className="brand-logo center">Pokédex</Link>
          </div>
        </nav>
        {/* le system de gestion des routes ne l'app  */}
        <Switch>
          <Route exact path="/" component= {PokemonList} />
          <Route exact path="/pokemons" component= {PokemonList} />
          <Route exact path="/pokemons/edit/:id" component= {PokemonEdit} />
          <Route path="/pokemons/:id" component= {PokemonDetail} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;
