import { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import AddItem from './AddItem'
import SearchItem from './SearchItem'
import Content from './Content'
import apiRequest from './apiRequest'

function App() {
  const API_URL = import.meta.env.VITE_API_URL
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')

  const handleCheck = async (id) => {
    const listItems = items.map(item => item.task_id === id ? {...item, is_checked: !item.is_checked} : item)
    setItems(listItems)

    const item = listItems.filter(item => item.task_id === id)

    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item[0])
    }

    const reqURL = `${API_URL}/${id}`
    const result = await apiRequest(reqURL, updateOptions);
  }

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw Error("Did not receive expected data.")
        const listItems = await response.json()
        setItems(listItems)
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
        <SearchItem search={search} setSearch={setSearch}/>
        <Content 
          items={items.filter((item) => item.description.toLowerCase().includes(search.toLowerCase()))} 
          handleCheck={handleCheck}
        />
        <Footer length={items.length}/>
      </div>
    </>
  )
}

export default App
