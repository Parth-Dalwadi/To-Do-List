import styles from './styles/EditForm.module.css'

const EditForm = ({editItem, setEditItem, handleEdit, navigate}) => {
  return (
    <form className={styles.editForm} onSubmit={(e) => handleEdit(e)}>
        <div className={styles.editFormContainer}>
            <label htmlFor="editItem" className="htmlForLabel">Edit Item</label>
            <h1>Edit Item</h1>
            <div className={styles.editFormControl}>
                <label>Task:</label>
                <input 
                    id="editItem"
                    type="text"
                    value={editItem.description}
                    required
                    onClick={(e) => e.target.select()}
                    onChange={(e) => setEditItem({...editItem, description: e.target.value})}
                />
            </div>

            <div className={styles.editFormControl}>
                <label>Complete:</label>
                <input
                    id="editCheck"
                    type="checkbox"
                    checked={editItem.is_checked}
                    onChange={() => setEditItem({...editItem, is_checked: !editItem.is_checked})}
                />
            </div>
            
            <div class={styles.editFormBtnControl}>
                <button type="submit" className={styles.editFormBtn}>Submit</button>
                <button type="button" className={styles.editFormBtn} id={styles.returnBtn} onClick={() => {navigate("/"); if (window.scrollY !== 0) window.scrollTo(0, 0)}}>Return to Tasks</button>
            </div>
        </div>      
    </form>
  )
}

export default EditForm