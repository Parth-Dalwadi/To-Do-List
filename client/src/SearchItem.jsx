const SearchItem = ({search, setSearch}) => {
  return (
    <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="searchItem">Search Item</label>
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
