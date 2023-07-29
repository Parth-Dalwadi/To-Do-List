const EditForm = ({editItem, setEditItem, handleEdit, navigate}) => {
  return (
    <form className="editForm" onSubmit={(e) => handleEdit(e)}>
        <div className="editFormContainer">
            <label htmlFor="editItem" className="htmlForLabel">Edit Item</label>
            <h1>Edit Item</h1>
            <div className="editFormControl">
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

            <div className="editFormControl">
                <label>Complete:</label>
                <input
                    id="editCheck"
                    type="checkbox"
                    checked={editItem.is_checked}
                    onChange={() => setEditItem({...editItem, is_checked: !editItem.is_checked})}
                />
            </div>
            
            <div class="editFormBtnControl">
                <button type="submit" className="editFormBtn">Submit</button>
                <button type="button" className="editFormBtn" id="returnBtn" onClick={() => {navigate("/"); if (window.scrollY !== 0) window.scrollTo(0, 0)}}>Return to Tasks</button>
            </div>
        </div>      
    </form>
  )
}

export default EditForm