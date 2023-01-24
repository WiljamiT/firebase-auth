import React, { useEffect, useState } from 'react'
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import {db} from '../firebase'
import './list.css';
import Navbar from './Navbar';

const List = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        let list = [];

        try {
            const querySnapshot = await getDocs(collection(db, "users"));
                querySnapshot.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data()});
                    console.log(doc.id, " => ", doc.data());
                })
                setData(list);
        } catch(err) {
            console.log("fetchData error: ", err);
        }

        
      }
      fetchData();
    }, [])

    console.log("dataa", data)

    function Data(props) {
        return (<div className="liItems"><img src={props.data.img} alt={props.data.username}></img><li>Uname: {props.data.username}</li><li>Email: {props.data.email} </li> <button onClick={() => handleDelete(props.data.id)}>poista</button></div>)
    }

    const dataItems = data.map((data, index) => <Data key={index} data={data} />);

    const handleDelete = async (id) => {

        try {
            await deleteDoc(doc(db, "users", id));
            setData(data.filter((item) => item.id !== id));
        } catch (error) {
            console.log("POISTO ERRORI ", error)
        }    
    }


  return (
    <>
      <Navbar />
      <div className="dataList">
      <div> <p>Upload files: <a href="http://localhost:3000/users/new"> Here </a></p></div>
      <p>Lista käyttäjistä</p>
      <div className="dataItems"><ul>{dataItems}</ul></div>
      </div>
    </>
  )
}

export default List;