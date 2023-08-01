import styles from './styles/InfoBar.module.css'

const InfoBar = ({items, setFilterItems, filter, setFilter}) => {
  return (
    <div className={styles.info}>
      <label className={styles.infoItem}>Filters: </label>
      <button 
        className={styles.infoItem}
        onClick={() => {if (filter !== '') {
          setFilter('')
          setFilterItems(items)
        }}}
      >All</button>

      <button 
        className={styles.infoItem}
        id={styles.checkmark}
        onClick={() => {if (filter !== 'complete') {
          setFilter('complete') 
          setFilterItems(items.filter(item => item.is_checked === 1 || item.is_checked === true))
        }}}
      ><>&#x2713;</></button>

      <button 
        className={styles.infoItem}
        onClick={() => {if (filter !== 'incomplete') {
          setFilter('incomplete')
          setFilterItems(items.filter(item => item.is_checked === 0 || item.is_checked === false))
        }}}
      >X</button>
    </div>
  )
}

export default InfoBar