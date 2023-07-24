const ListItem = ({item, handleCheck, handleDelete}) => {
  return (
    <li className="task">
        <input 
            type="checkbox"
            onChange={() => handleCheck(item.task_id)}
            checked={item.is_checked}
        />
        
        <label
            style={(item.is_checked) ? {textDecoration: 'line-through'} : null}
        >{item.description}</label>

        <button
            onClick={() => handleDelete(item.task_id)}
        >X</button>
    </li>
  )
}

export default ListItem
