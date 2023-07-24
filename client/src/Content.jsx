import ItemList from "./ItemList"

const Content = ({items, handleCheck}) => {
  return (
    <main>
      {items.length ? (
        <ItemList items={items} handleCheck={handleCheck}/> ) : (
        <p>No items to display at the moment.</p>
      )}
    </main>
  )
}

export default Content
