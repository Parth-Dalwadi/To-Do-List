import ItemList from './ItemList'

const Content = ({items, handleCheck, handleDelete, navigate}) => {
  return (
    <>
      {items.length ? (
        <ItemList 
          items={items} 
          handleCheck={handleCheck} 
          handleDelete={handleDelete} 
          navigate={navigate}
        /> ) : (
        <p className="response">No items in the list.</p>
      )}
    </>
  )
}

export default Content