const SearchItem = () => {
  return (
    <form className="searchForm">
      <label htmlFor="searchItem">Search Item</label>
      <input 
        id="searchItem"
        type="text"
        role="searchbox"
        placeholder="Search Item..."
      />
    </form>
  )
}

export default SearchItem