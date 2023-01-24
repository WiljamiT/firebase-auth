
import { useEffect, useState } from "react";
import {
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db ,storage } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";


import Navbar from './Navbar';

import './new.css';

const New = ({ title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log("Image upload ", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at ", downloadURL);
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  console.log(data);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await setDoc(doc(db, "users", res.user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      navigate(-1)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <Navbar />
    
    <div className="new">
      
      <div className="newContainer">
       
        <div className="top">
          <h1>OKOK</h1>
        </div>
        <div className="bottom">
          <div className="left">
            
          </div>
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
                <div className="formInput" key={1}>
                <label htmlFor="file">
                  <p>KUVA??</p>
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                  <label>Username</label>
                  <input
                    id="username"
                    type="text"
                    placeholder="john_doe"
                    onChange={handleInput}
                  />

<label>Name and surname</label>
                  <input
                    id="displayName"
                    type="text"
                    placeholder="John Doe"
                    onChange={handleInput}
                  />

<label>Email</label>
                  <input
                    id="email"
                    type="mail"
                    placeholder="john_doe@gmail.com"
                    onChange={handleInput}
                  />

<label>Phone</label>
                  <input
                    id="phone"
                    type="text"
                    placeholder="+1 234 567 89"
                    onChange={handleInput}
                  />

<label>Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="********"
                    onChange={handleInput}
                  />

<label>Address</label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Elton St. 216 NewYork"
                    onChange={handleInput}
                  />

<label>Country</label>
                  <input
                    id="country"
                    type="text"
                    placeholder="FIN"
                    onChange={handleInput}
                  />




                </div>
              
              <button disabled={per !== null && per < 100} type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default New;
