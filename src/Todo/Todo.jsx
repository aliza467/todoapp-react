import React, { useState, useEffect } from 'react';
import styles from "./Todo.module.css";
import { FaPlusSquare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import {db} from '../config/firebase'

const Todo = () => {
    const [input, setInput] = useState("");
    const [item, setItem] = useState([]);
    const [toggleBtn, setToggleBtn] = useState(true);
    const [isEdit, setIsEdit] = useState(null);

    // Fetch items from Firebase when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "todos"));
            setItem(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };

        fetchData();
    }, []);

    const removeAll = async () => {
        const querySnapshot = await getDocs(collection(db, "todos"));
        querySnapshot.forEach((doc) => {
            deleteDoc(doc(db, "todos", doc.id));
        });
        setItem([]);
    };

    const deleteData = async (id) => {
        await deleteDoc(doc(db, "todos", id));
        setItem(item.filter(val => val.id !== id));
    };

    const editData = (id) => {
        let newData = item.find((elem) => elem.id === id);
        setToggleBtn(false);
        setInput(newData.name);
        setIsEdit(id);
    };

    const itemAdded = async () => {
        if (!input) {
            alert("Please fill input.");
            return;
        }

        if (input && !toggleBtn) {
            const docRef = doc(db, "todos", isEdit);
            await updateDoc(docRef, { name: input });

            setItem(item.map((elem) => {
                if (elem.id === isEdit) {
                    return { ...elem, name: input };
                }
                return elem;
            }));

            setToggleBtn(true);
            setInput('');
            setIsEdit(null);
        } else {
            const docRef = await addDoc(collection(db, "todos"), { name: input });
            const newItem = { id: docRef.id, name: input };
            setItem([...item, newItem]);
            setInput("");
        }
    };

    return (
        <div style={{ margin: "30px", padding: "30px" }} className={styles.cont}>
            <h1 style={{ margin: "auto" }}>Todo app</h1>
            <div style={{ margin: "auto" }} className={styles.inputs}>
                <input type="text" onChange={(e) => setInput(e.target.value)} value={input} />
                {
                    toggleBtn ? <FaPlusSquare className={styles.icon} onClick={itemAdded} />
                        : <FaEdit onClick={itemAdded} className={styles.edits} />
                }
            </div>
            <div>
                {item.map((val) => (
                    <div className={styles.ans} key={val.id}>
                        <li>{val.name}</li>
                        <MdDelete className={styles.edit} onClick={() => deleteData(val.id)} />
                        <FaEdit className={styles.edit} onClick={() => editData(val.id)} />
                    </div>
                ))}
            </div>
            <div style={{ margin: "auto" }}>
                <br />
                <button onClick={removeAll} className={styles.remove}>Remove All</button>
            </div>
        </div>
    );
};

export default Todo;
