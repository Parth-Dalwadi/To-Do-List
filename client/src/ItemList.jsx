import ListItem from "./ListItem"

const ItemList = ({items, handleCheck, handleDelete}) => {
  return (
    <ul className="taskList">
      {items.map(item => 
        <ListItem 
            key={item.task_id}
            item={item}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
        />
      )}
    </ul>
  )
}

export default ItemList
