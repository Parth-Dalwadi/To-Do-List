import ListItem from "./ListItem"

const ItemList = ({items}) => {
  return (
    <ul className="taskList">
      {items.map(item => 
        <ListItem 
            key={item.task_id}
            item={item}
        />
      )}
    </ul>
  )
}

export default ItemList
