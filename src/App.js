import { Col } from 'antd'
import './App.css'
import Searcher from './components/Searcher'
import PokemonList from './components/PokemonList'
import logo from './statics/logo.svg'
import { useEffect, useState } from 'react'
import { getPokemon, getPokemonDetails } from './api'
import { setPokemons } from './actions'
import { useSelector, useDispatch } from 'react-redux'
import { pokemonsReducer } from './reducers/pokemons'

function App() {
  const pokemons = useSelector(state => state.pokemons)
  const dispatch = useDispatch() 
  //console.log(pokemons)
  //const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    const fetchPokemon = async () => {
      const pokemonRes = await getPokemon()
      const pokemonDetailed = await Promise.all(pokemonRes.map(pokemon => getPokemonDetails(pokemon)))
      dispatch(setPokemons(pokemonDetailed))

    }
    
    fetchPokemon()
  }, [])

  return (
    <div className='App'>
      <Col span={4} offset={10}>
        <img src={logo} alt='Pokedux' />
      </Col>
      <Col span={8} offset={8}>
        <Searcher />
      </Col>
      <PokemonList pokemons={pokemons} />
    </div>
  )
}

// const mapStateToProps = (state => ({
//   pokemons: state.pokemons
// }))
// const mapDispatchToProps = (distpach) => ({
//   setPokemons: (value) => distpach(setPokemonsActions(value))
// })

// export default connect(mapStateToProps, mapDispatchToProps)(App)
export default App