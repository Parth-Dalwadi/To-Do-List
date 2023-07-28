import ListItem from "./ListItem"

const ItemList = ({items, handleCheck, handleDelete, navigate}) => {
  return (
    <ul className="taskList">
      {items.map(item => 
        <ListItem 
            key={item.task_id}
            item={item}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
            navigate={navigate}
        />
      )}
    </ul>
  )
}

export default ItemList