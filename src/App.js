import { useContext } from 'react';
import Login from './pages/Login';
import Frontpage from './pages/Frontpage';
import New from './pages/New';
import Home from './pages/Home';
import List from './pages/List';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from './context/AuthContext';
import './App.css';
import React from 'react';

function App() {

  const {currentUser} = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? (children) : <Navigate to="/login" />
  }

  console.log("Nykyinen käyttäjä ", currentUser)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              path="frontpage"
              element={
                <RequireAuth>
                  <Frontpage />
                </RequireAuth>
              }
            />
            <Route index path="homepage" element={<RequireAuth><Home /></RequireAuth>} />
            <Route path="users">  
              <Route
                index
                element={
                  <RequireAuth>
                    <List />
                  </RequireAuth>
                }
              />
              <Route
                path=":userId"
                element={
                  <RequireAuth>
                    {/* <Single /> */}
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New />
                  </RequireAuth>
                }
              />
            </Route>
            
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
