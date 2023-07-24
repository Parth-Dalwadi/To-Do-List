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
  const [newItem, setNewItem] = useState('')

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

  const addItem = async (description) => {
    const item = {
      description: `${description}`,
      is_checked: 0
    }

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    }

    const reqURL = `${API_URL}`
    const result = await apiRequest(reqURL, postOptions)

    fetchItems()
  }

  const handleAdd = (e) => {
    e.preventDefault()
    if (newItem === '') return;
    addItem(newItem)
    setNewItem('')
  }

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.task_id !== id)
    setItems(listItems)

    const deleteOptions = {
      method: 'DELETE'
    }

    const reqURL = `${API_URL}/${id}`
    const result = await apiRequest(reqURL, deleteOptions)
  }

  useEffect(() => {
    fetchItems()
  }, [])


  return (
    <>
      <div className='App'>
        <Header title={"My To-Do List"} />
        <AddItem newItem={newItem} setNewItem={setNewItem} handleAdd={handleAdd}/>
        <SearchItem search={search} setSearch={setSearch}/>
        <Content 
          items={items.filter((item) => item.description.toLowerCase().includes(search.toLowerCase()))} 
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
        <Footer length={items.filter((item) => item.description.toLowerCase().includes(search.toLowerCase())).length}/>
      </div>
    </>
  )
}

export default App