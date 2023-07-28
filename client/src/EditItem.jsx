import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import EditForm from "./EditForm"
import apiRequest from "./apiRequest"

const EditItem = () => {
  document.body.style.marginBottom = '0';
  const API_URL = import.meta.env.VITE_API_URL
  const [editItem, setEditItem] = useState('')
  const {id} = useParams()
  const navigate = useNavigate()

  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_URL}/${id}`)
      if (!response.ok) throw Error("Did not receive expected data.")
      const item = await response.json()
      setEditItem(item[0])
    } catch (err) {
      console.log(err)
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
    navigate("/")
    if (window.scrollY !== 0) window.scrollTo(0, 0)
  }

  useEffect(() => {
    fetchItems()
  }, [])


  return (
    <main>
      {editItem ? (
        <EditForm editItem={editItem} setEditItem={setEditItem} handleEdit={handleEdit} navigate={navigate}/>) : (
        <p className="response"></p>
      )}
    </main>
  )
}

export default EditItem