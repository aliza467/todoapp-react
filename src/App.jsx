import { useState } from 'react'
import { AiFillAlert } from "react-icons/ai";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Todo from './Todo/Todo';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Todo/>
      

    </>
  )
}

export default App
