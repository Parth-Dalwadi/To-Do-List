import { useEffect, useState } from 'react'
import Header from "./Header"
import Footer from "./Footer"
import Content from "./Content"
import AddItem from "./AddItem"
import SearchItem from "./SearchItem"
import apiRequest from './apiRequest'
import { useNavigate } from 'react-router-dom'

const Home = ({setEditItem}) => {
  const API_URL = import.meta.env.VITE_API_URL
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')
  const [newItem, setNewItem] = useState('')
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  document.body.style.marginBottom = '10vh'

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
    
    if (result) setFetchError(result)
  }

  const fetchItems = async () => {
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw Error("Did not receive expected data.")
      const listItems = await response.json()
      setItems(listItems)
      setFetchError(null)
    } catch (err) {
      setFetchError(err.message)
    } finally {
      if (isLoading === true) {
        setIsLoading(false)
      }
    }
  }

  const addItem = async (description) => {
    const item = {
      description: `${description}`,
      is_checked: 0,
      date_created: new Date().toISOString().split('T')[0]
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

    if (result) {
      setFetchError(result)
    } else {
      fetchItems()
    }
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

    if (result) setFetchError(result)
  }

  useEffect(() => {
    document.title = 'My To-Do List'
    fetchItems()
  }, [])


  return (
    <>
      <Header title={"My To-Do List"} />
      <AddItem newItem={newItem} setNewItem={setNewItem} handleAdd={handleAdd}/>
      <SearchItem search={search} setSearch={setSearch}/>
      <main>
        {isLoading && <p className="response">Loading Items...</p>}
        {fetchError && <p className="response" id="error">{`Error: ${fetchError}`}</p>}
        {!isLoading && !fetchError &&
        <Content 
            items={items.filter((item) => item.description.toLowerCase().includes(search.toLowerCase()))} 
            handleCheck={handleCheck}
            handleDelete={handleDelete}
            setEditItem={setEditItem}
            navigate={navigate}
        />
        }
      </main>
      <Footer length={items.filter((item) => item.description.toLowerCase().includes(search.toLowerCase())).length}/>
    </>
  )
}

export default Home