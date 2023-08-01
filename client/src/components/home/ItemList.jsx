import ListItem from './ListItem'
import styles from '../../assets/styles/home/ItemList.module.css'

const ItemList = ({items, handleCheck, handleDelete, navigate}) => {
  return (
    <ul className={styles.taskList}>
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