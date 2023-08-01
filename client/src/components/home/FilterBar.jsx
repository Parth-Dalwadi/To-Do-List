import styles from '../../styles/home/FilterBar.module.css'

const FilterBar = ({filter, setFilter}) => {
  return (
    <div className={styles.bar}>
      <label className={styles.barItem}>Filters: </label>
      <button 
        className={styles.barItem}
        onClick={() => {if (filter !== '') {
          setFilter('')
        }}}
      >All</button>

      <button 
        className={styles.barItem}
        id={styles.checkmark}
        onClick={() => {if (filter !== 'complete') {
          setFilter('complete') 
        }}}
      ><>&#x2713;</></button>

      <button 
        className={styles.barItem}
        onClick={() => {if (filter !== 'incomplete') {
          setFilter('incomplete')
        }}}
      >X</button>
    </div>
  )
}

export default FilterBar