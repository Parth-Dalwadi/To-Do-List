import ItemList from "./ItemList"

const Content = ({items, handleCheck, handleDelete}) => {
  return (
    <>
      {items.length ? (
        <ItemList items={items} handleCheck={handleCheck} handleDelete={handleDelete}/> ) : (
        <p className="response">No items in the list.</p>
      )}
    </>
  )
}

export default Content