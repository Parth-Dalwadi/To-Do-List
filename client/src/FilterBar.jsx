import styles from './styles/FilterBar.module.css'

const FilterBar = ({items, setFilterItems, filter, setFilter}) => {
  return (
    <div className={styles.bar}>
      <label className={styles.barItem}>Filters: </label>
      <button 
        className={styles.barItem}
        onClick={() => {if (filter !== '') {
          setFilter('')
          setFilterItems(items)
        }}}
      >All</button>

      <button 
        className={styles.barItem}
        id={styles.checkmark}
        onClick={() => {if (filter !== 'complete') {
          setFilter('complete') 
          setFilterItems(items.filter(item => item.is_checked === 1 || item.is_checked === true))
        }}}
      ><>&#x2713;</></button>

      <button 
        className={styles.barItem}
        onClick={() => {if (filter !== 'incomplete') {
          setFilter('incomplete')
          setFilterItems(items.filter(item => item.is_checked === 0 || item.is_checked === false))
        }}}
      >X</button>
    </div>
  )
}

export default FilterBar