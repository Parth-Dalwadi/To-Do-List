import Home from './Home'
import Missing from './Missing'
import EditItem from './EditItem'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


function App() {

  return (
    <>
      <div className='App'>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/edit/:id" element={<EditItem />}></Route>
            <Route path="*" element={<Missing />}></Route>
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App