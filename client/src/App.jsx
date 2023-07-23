import { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import AddItem from './AddItem'
import SearchItem from './SearchItem'

function App() {
  return (
    <>
      <div className='App'>
        <Header title={"My To-Do List"} />
        <AddItem />
        <SearchItem />
        <Footer />
      </div>
    </>
  )
}

export default App
