const ListItem = ({item, handleCheck, handleDelete}) => {
  return (
    <li className="task">
        <label
            style={(item.is_checked) ? {textDecoration: 'line-through'} : null}
        >{item.description}</label>

        <input 
            type="checkbox"
            onChange={() => handleCheck(item.task_id)}
            checked={item.is_checked}
        />

        <button
            onClick={() => handleDelete(item.task_id)}
        >X</button>
    </li>
  )
}

export default ListItem