import styles from '../../styles/home/SearchItem.module.css'

const SearchItem = ({search, setSearch}) => {
  return (
    <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="searchItem" className="htmlForLabel">Search Item</label>
      <input 
        id="searchItem"
        type="text"
        role="searchbox"
        placeholder="Search Item..."
        value={search}
        onChange={(e) => {setSearch(e.target.value); if (window.scrollY !== 0) window.scrollTo(0,0)}}
      />
    </form>
  )
}

export default SearchItem