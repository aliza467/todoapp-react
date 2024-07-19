import React from 'react'
import { useState } from 'react'
import styles from "./Todo.module.css"
import { FaPlusSquare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Todo = () => {
    const [input, setinput]= useState("")
    const [item, setitem]= useState([])
    const [togglebtn, settogglebtn]= useState(true)
    const [isedit, setisedit]= useState(null)

    const removeall=()=>{
        setitem([])
    }
    const deleteddata=(id)=>{
        const updateitem = item.filter((val ,index)=>{
            return val.id !==id
        })
        setitem(updateitem)
    }

    const editdata=(id)=>{
        let newdata=item.find((elem)=>{
            return elem.id === id
        })
        settogglebtn(false)
        setinput(newdata.name)
        setisedit(id)
    }

    const itemadded=()=>{
        if (!input){
            alert("Please fill input.")
        }

        else if(input && !togglebtn){
            setitem(item.map((elem)=>{
                if(elem.id ===isedit){
                    return {...elem,name:input}
                }
                return elem;
            }))
            settogglebtn(true)
            setinput('')
            setisedit(null)
        }

        else{
            const inputdata={ id:new Date().getTime().toString(),name:input}
            setitem([...item, inputdata])
            setinput("")
        }
    }

  return (
    
    <div className={styles.cont}>
        
        <div className={styles.inputs} >
            <input type="text" onChange={(e)=>setinput(e.target.value)} value={input} />
            {
                togglebtn ? <  FaPlusSquare className={styles.icon} onClick={itemadded}/>
                :<FaEdit onClick={itemadded} className={styles.edits} />
            }
        </div>

        <div>
            {
                item.map((val)=>(
                    <div className={styles.ans}>
                        <li >{val.name}</li>
                        <MdDelete className={styles.edit} onClick={()=>deleteddata(val.id)} />
                        <FaEdit  className={styles.edit} onClick={()=> editdata(val.id)} />    
                        
                        

                    </div>
                   

                ))
            }
        </div>
        <div>
            <br />
            <button onClick={removeall} className={styles.remove}>Remove All</button>
        </div>
    </div>
  )
}

export default Todo

