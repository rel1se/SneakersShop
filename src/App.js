import React from 'react'
import {Route, Routes} from 'react-router-dom'
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home"
import Favorites from "./pages/Favotites";

function App() {
    const [items, setItems] = React.useState([])
    const [cartItems, setCartItems] = React.useState([])
    const [favorites, setFavorites] = React.useState([])
    const [cartOpened, setCartOpened] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState('')
    React.useEffect(() => {
        axios.get("https://6505ec62ef808d3c66f0a230.mockapi.io/items")
            .then(res => {
                setItems(res.data)
            })
        axios.get("https://6505ec62ef808d3c66f0a230.mockapi.io/cart")
            .then(res => {
                setCartItems(res.data)
            })
        axios.get('https://6501dcae736d26322f5c672c.mockapi.io/favorites')
            .then(res => {
                setFavorites(res.data)
            })
    }, [])
    const onAddToCart = (obj) => {
        axios.post("https://6505ec62ef808d3c66f0a230.mockapi.io/cart", obj).then(res => {
            setCartItems(prev => [...prev, res.data])
        })
    }
    const onRemoveItem = (id) => {
        axios.delete(`https://6505ec62ef808d3c66f0a230.mockapi.io/cart/${id}`)
        setCartItems(prev => prev.filter(item => item.id !== id))
    }
    const onAddToFavorite = async (obj) => {
        try{
            if (favorites.find(favObj => favObj.id === obj.id)){
                axios.delete(`https://6501dcae736d26322f5c672c.mockapi.io/favorites/${obj.id}`)
                setFavorites((prev) => prev.filter((item) => item.id !== obj.id))
            } else{
                const {data} = await axios.post("https://6501dcae736d26322f5c672c.mockapi.io/favorites", obj)
                setFavorites(prev => [...prev, data])

            }
        }
        catch (error){
            alert("Не удалосб добавить в фавориты")
        }
    }
    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)
    }
    return (
        <div className="wrapper clear">
            {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>}
            <Header onClickCart={() => setCartOpened(true)}/>
            <Routes>
                <Route path="/" element={
                    <Home
                        items={items}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        onChangeSearchInput={onChangeSearchInput}
                        onAddToFavorite={onAddToFavorite}
                        onAddToCart={onAddToCart}
                    />
                }>
                </Route>
                <Route path="/favorites" element={
                    <Favorites items={favorites} onAddToFavorite={onAddToFavorite}/>
                }>
                </Route>
            </Routes>
        </div>
    )
}

export default App;