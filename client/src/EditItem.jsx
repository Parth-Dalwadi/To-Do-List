import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import EditForm from "./EditForm"
import apiRequest from "./apiRequest"

const EditItem = () => {
  document.body.style.marginBottom = '0'
  const API_URL = import.meta.env.VITE_API_URL
  const [editItem, setEditItem] = useState('')
  const {id} = useParams()
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_URL}/${id}`)
      if (!response.ok) throw Error("Did not receive expected data.")
      const item = await response.json()
      setEditItem(item[0])
      setFetchError(null)
    } catch (err) {
      setFetchError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault()

    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editItem)
    }

    const reqURL = `${API_URL}/${id}`
    const result = await apiRequest(reqURL, updateOptions)

    if (result) {
      setFetchError(result)
    } else {
      navigate("/")
      if (window.scrollY !== 0) window.scrollTo(0, 0)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])


  return (
    <main>
      {isLoading && <p className="response">Loading Item...</p>}
      {fetchError && <p className="response" id="error">{`Error: ${fetchError}`}</p>}
      {!isLoading && !fetchError && 
        <EditForm editItem={editItem} setEditItem={setEditItem} handleEdit={handleEdit} navigate={navigate}/>
      }
    </main>
  )
}

export default EditItem