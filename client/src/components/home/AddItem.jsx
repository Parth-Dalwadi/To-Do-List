import styles from '../../assets/styles/home/AddItem.module.css'

const AddItem = ({newItem, setNewItem, handleAdd}) => {
  return (
    <form className={styles.addForm} onSubmit={handleAdd}>
      <label htmlFor="addItem" className="htmlForLabel">Add Item</label>
      <input 
        id="addItem"
        type="text"
        placeholder="Add Item..."
        value={newItem}
        required
        autoComplete="off"
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button
        type="submit"
        aria-label="Add Item"
      >Add</button>
    </form>
  )
}

export default AddItem