const ListItem = ({item}) => {
  return (
    <li className="task">
        <input 
            type="checkbox"
            onChange={() => console.log(1)}
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
