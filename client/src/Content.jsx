import ItemList from "./ItemList"

const Content = ({items}) => {
  return (
    <main>
      {items.length ? (
        <ItemList items={items} /> ) : (
        <p>Error</p>
      )}
    </main>
  )
}

export default Content
