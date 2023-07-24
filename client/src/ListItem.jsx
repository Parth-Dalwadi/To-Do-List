const ListItem = ({item, handleCheck}) => {
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
            onClick={() => console.log(2)}
        >X</button>
    </li>
  )
}

export default ListItem
