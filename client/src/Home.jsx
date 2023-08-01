import { useEffect, useState } from 'react'
import Header from "./Header"
import Footer from "./Footer"
import Content from "./Content"
import AddItem from "./AddItem"
import SearchItem from "./SearchItem"
import FilterBar from './FilterBar'
import apiRequest from './apiRequest'
import { useNavigate } from 'react-router-dom'

const Home = ({setEditItem}) => {
  const API_URL = import.meta.env.VITE_API_URL
  const [items, setItems] = useState([])
  const [filterItems, setFilterItems] = useState([])
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')
  const [newItem, setNewItem] = useState('')
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  document.body.style.marginBottom = '10vh'

  const handleFilter = (listItems) => {
    if (filter === '') {
      setFilterItems(listItems)
    } else if (filter === 'complete') {
      setFilterItems(listItems.filter(item => item.is_checked === 1 || item.is_checked === true))
    } else if (filter === 'incomplete') {
      setFilterItems(listItems.filter(item =>  item.is_checked === 0 || item.is_checked === false))
    }
  }

  const handleCheck = async (id) => {
    const listItems = items.map(item => item.task_id === id ? {...item, is_checked: !item.is_checked} : item)
    setItems(listItems)
    handleFilter(listItems)

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
      handleFilter(listItems)
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
    handleFilter(listItems)

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
      {isLoading &&
        <main>
          <p className='response'>Loading Items...</p>
        </main>
      }
      {fetchError &&
        <main>
          <p className='response' id="error">{`Error: ${fetchError}`}</p>
        </main>
      }
      {!isLoading && !fetchError &&
        <>
          <AddItem 
            newItem={newItem}
            setNewItem={setNewItem}
            handleAdd={handleAdd}
          />
          <SearchItem
            search={search}
            setSearch={setSearch}
          />
          <FilterBar 
            items={items}
            setFilterItems={setFilterItems}
            filter={filter}
            setFilter={setFilter}
          />
          <Content 
            items={filterItems.filter((item) => item.description.toLowerCase().includes(search.toLowerCase()))} 
            handleCheck={handleCheck}
            handleDelete={handleDelete}
            navigate={navigate}
          />
          <Footer 
            length={filterItems.filter((item) => item.description.toLowerCase().includes(search.toLowerCase())).length}
          />
        </>
      }
    </>
  )
}

export default Home