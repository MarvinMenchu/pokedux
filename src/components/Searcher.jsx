import { Input } from 'antd'
import { useDispatch } from 'react-redux'
import { setFilter } from '../slices/dataSlice'

const Searcher = () => {
    const dispatch = useDispatch()
    const handleSearch = (value) => {
        dispatch(setFilter(value.target.value))
    }
    return <Input.Search 
            placeholder="Buscar..."
            style={{marginBottom: 10}}
            onChange={handleSearch}
            />
}

export default Searcher