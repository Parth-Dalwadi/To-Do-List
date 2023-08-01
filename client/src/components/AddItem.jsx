import styles from '../styles/AddItem.module.css'

const AddItem = ({newItem, setNewItem, handleAdd}) => {
  return (
    <form className={styles.addForm} onSubmit={handleAdd}>
      <label htmlFor="addItem" className="htmlForLabel">Add Item</label>
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