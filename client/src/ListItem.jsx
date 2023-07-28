const ListItem = ({item, handleCheck, handleDelete, navigate}) => {
  return (
    <li className="task">
        <label
            onClick={() => navigate(`/edit/${item.task_id}`)}
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