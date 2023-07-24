import ListItem from "./ListItem"

const ItemList = ({items, handleCheck}) => {
  return (
    <ul className="taskList">
      {items.map(item => 
        <ListItem 
            key={item.task_id}
            item={item}
            handleCheck={handleCheck}
        />
      )}
    </ul>
  )
}

export default ItemList
