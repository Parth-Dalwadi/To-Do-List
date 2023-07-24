import { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import AddItem from './AddItem'
import SearchItem from './SearchItem'
import Content from './Content'

function App() {
  const API_URL = import.meta.env.VITE_API_URL
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw Error("Did not receive expected data.")
        const listItems = await response.json()
        setItems(listItems)
        console.log(listItems)
      } catch (err) {
        console.log(err)
      }
    }

    fetchItems()
  }, [])


  return (
    <>
      <div className='App'>
        <Header title={"My To-Do List"} />
        <AddItem />
        <SearchItem />
        <Content items={items} />
        <Footer />
      </div>
    </>
  )
}

export default App
