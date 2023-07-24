import ItemList from "./ItemList"

const Content = ({items}) => {
  return (
    <main>
      {items.length ? (
        <ItemList items={items} /> ) : (
        <p>No items to display at the moment.</p>
      )}
    </main>
  )
}

export default Content
