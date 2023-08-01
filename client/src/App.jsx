import ToDoList from './components/home/ToDoList'
import EditItem from './components/edit/EditItem'
import NotFound from './components/missing/NotFound'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


function App() {

  return (
    <>
      <div className='App'>
        <Router>
          <Routes>
            <Route exact path="/" element={<ToDoList />}></Route>
            <Route exact path="/edit/:id" element={<EditItem />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App