import { Col, Spin } from 'antd'
import './App.css'
import Searcher from './components/Searcher'
import PokemonList from './components/PokemonList'
import logo from './statics/logo.svg'
import { useEffect } from 'react'
import { getPokemon } from './api'
import { getPokemonsWithDetails, setLoading } from './actions'
import { useSelector, useDispatch } from 'react-redux'

function App() {
  const pokemons = useSelector(state => state.getIn(['data', 'pokemons'])).toJS()
  const loading = useSelector(state => state.getIn(['ui', 'loading']))

  const dispatch = useDispatch() 
  //console.log(pokemons)
  //const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    const fetchPokemon = async () => {
      dispatch(setLoading(true))
      const pokemonRes = await getPokemon()
      dispatch(getPokemonsWithDetails(pokemonRes))
      dispatch(setLoading(false))
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
      {loading ? (<Col span={24} offset={12}>
        <Spin spinning size='large' />
      </Col>) : <PokemonList pokemons={pokemons} />}
      
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