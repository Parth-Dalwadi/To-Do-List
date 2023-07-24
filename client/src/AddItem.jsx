const AddItem = ({newItem, setNewItem, handleAdd}) => {
  return (
    <form className="addForm" onSubmit={handleAdd}>
      <label htmlFor="addItem">Add Item</label>
      <input 
        id="addItem"
        type="text"
        placeholder="Add Item..."
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        required
      />
      <button
        type="submit"
        aria-label="Add Item"
      >Add</button>
    </form>
  )
}

export default AddItem